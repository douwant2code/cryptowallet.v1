// src/workers/depositWorker.ts
import { Worker } from "bullmq";
import IORedis from "ioredis";
import { ethers } from "ethers";
import { prisma } from "@/lib/prisma";

const connection = new IORedis(
  process.env.REDIS_URL || "redis://127.0.0.1:6379"
);

// provider (ethers v5)
const RPC = process.env.ETH_RPC_URL!;
const provider = new ethers.providers.JsonRpcProvider(RPC);

export const depositWorker = new Worker(
  "depositQueue",
  async (job) => {
    const { txHash } = job.data;

    console.log("[Deposit Worker] Checking tx:", txHash);

    // FETCH tx
    const tx = await provider.getTransaction(txHash);
    if (!tx) throw new Error("TX not found on-chain yet");
    if (!tx.to) throw new Error("Transaction has no 'to' address");

    const to = tx.to.toLowerCase();

    // Match a wallet
    const wallet = await prisma.wallet.findFirst({
      where: { address: { equals: to } },
    });

    if (!wallet) {
      console.log("No wallet matches address:", to);
      return;
    }

    // FETCH receipt
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt) throw new Error("Receipt not ready");

    const status = receipt.status === 1 ? "confirmed" : "failed";
    const confirmations =
      (await provider.getBlockNumber()) - receipt.blockNumber + 1;

    // Check if already recorded
    const existing = await prisma.transaction.findUnique({
      where: { txHash },
    });

    if (existing) {
      console.log("Transaction already recorded:", txHash);
      return existing;
    }

    // Save deposit record
    const record = await prisma.transaction.create({
      data: {
        walletId: wallet.id,
        userId: wallet.userId,
        type: "deposit",
        amount: tx.value.toString(),
        txHash,
        from: tx.from,
        to,
        status,
        confirmations,
      },
    });

    // Update wallet balance only if *first confirmation*
    if (status === "confirmed") {
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { increment: tx.value.toString() },
        },
      });
    }

    return record;
  },
  { connection, concurrency: 5 }
);
