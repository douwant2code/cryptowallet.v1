// src/actions/transaction.ts
"use server";

import { prisma } from "@/lib/prisma";
import { getDecryptedPrivateKeyByWalletId } from "@/lib/wallet";
import { TransactionType } from "@prisma/client";
import { ethers } from "ethers";

const RPC = process.env.ETH_RPC_URL!;
const provider = new ethers.providers.JsonRpcProvider(RPC);

// Helper: convert ETH amount to wei string (ethers v5)
function toWeiString(amountEth: string) {
  return ethers.utils.parseEther(amountEth).toString();
}

// Record a deposit by txHash
export async function recordDepositAction(txHash: string) {
  const tx = await provider.getTransaction(txHash);
  if (!tx) throw new Error("Transaction not found on chain");

  const to = tx.to?.toLowerCase();
  if (!to) throw new Error("Tx has no 'to' field");

  const wallet = await prisma.wallet.findFirst({
    where: { address: { equals: to } },
  });
  if (!wallet) throw new Error("No app wallet with this receiving address");

  const receipt = await provider.getTransactionReceipt(txHash);
  const status = receipt?.status === 1 ? "confirmed" : "failed";
  const confirmations = receipt
    ? (await provider.getBlockNumber()) - receipt.blockNumber + 1
    : 0;

  const exists = await prisma.transaction.findFirst({ where: { txHash } });
  if (exists) return exists;

  const t = await prisma.transaction.create({
    data: {
      walletId: wallet.id,
      userId: wallet.userId,
      type: TransactionType.DEPOSIT,
      amount: Number(tx.value.toString()),
      txHash,
      from: tx.from,
      to,
      status: status === "confirmed" ? "confirmed" : "pending",
      confirmations,
    },
  });

  if (status === "confirmed") {
    await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: { increment: Number(tx.value.toString()) },
      },
    });
  }

  return t;
}

// Withdraw
export async function withdrawAction(
  userId: string,
  walletId: string,
  to: string,
  amountEth: string
) {
  const wallet = await prisma.wallet.findUnique({ where: { id: walletId } });
  if (!wallet || wallet.userId !== userId)
    throw new Error("Wallet not found or not yours");

  const privateKey = await getDecryptedPrivateKeyByWalletId(walletId);
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const signer = new ethers.Wallet(privateKey, provider);

  const amountWei = toWeiString(amountEth);

  const tx = await signer.sendTransaction({
    to,
    value: ethers.BigNumber.from(amountWei),
  });

  const t = await prisma.transaction.create({
    data: {
      walletId,
      userId,
      type: TransactionType.WITHDRAWAL,
      amount: Number(amountWei),
      txHash: tx.hash,
      from: signer.address,
      to,
      status: "pending",
      confirmations: 0,
    },
  });

  return { txHash: tx.hash, transaction: t };
}
