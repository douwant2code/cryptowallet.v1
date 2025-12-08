"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendWithdrawalOTP } from "@/lib/email/send-otp";
import { sendWithdrawal as broadcastTx } from "@/lib/wallet";
import { ethers } from "ethers";
import { revalidatePath } from "next/cache";

/**
 * Helpers for ethers v5
 */
function parseEtherSafe(val: string) {
  // ethers v5: ethers.utils.parseEther
  return (ethers as any).utils?.parseEther
    ? (ethers as any).utils.parseEther(val)
    : (ethers as any).parseEther(val);
}
function formatEtherSafe(bn: any) {
  return (ethers as any).utils?.formatEther
    ? (ethers as any).utils.formatEther(bn)
    : (ethers as any).formatEther(bn);
}

/** Provider (read-only) */
const RPC = process.env.ETH_RPC_URL ?? process.env.ETHEREUM_RPC_URL;
if (!RPC) throw new Error("ETH_RPC_URL missing");
const provider = new ethers.providers.JsonRpcProvider(RPC);

/** Get wallet data + transactions (server action) */

/** User submits txHash for deposit verification (server action) */
const txHashSchema = z.object({ txHash: z.string().min(5) });
export async function recordDepositByHashAction(
  body: z.infer<typeof txHashSchema>
) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };
  const parse = txHashSchema.safeParse(body);
  if (!parse.success) return { error: "Invalid tx hash" };

  const txHash = parse.data.txHash;

  const tx = await provider.getTransaction(txHash);
  if (!tx) return { error: "Transaction not found on chain" };

  const to = tx.to?.toLowerCase();
  if (!to) return { error: "Transaction has no recipient" };

  const wallet = await prisma.wallet.findFirst({ where: { address: to } });
  if (!wallet) return { error: "No app wallet for recipient" };

  // unique check by txHash (txHash isn't a unique PK in your schema, so use findFirst)
  const existing = await prisma.transaction.findFirst({ where: { txHash } });
  if (existing)
    return { message: "Transaction already recorded", transaction: existing };

  const receipt = await provider.getTransactionReceipt(txHash);
  const confirmed = !!receipt && receipt.status === 1;
  const confirmations = receipt
    ? (await provider.getBlockNumber()) - receipt.blockNumber + 1
    : 0;
  const amountWei = tx.value.toString();

  const created = await prisma.transaction.create({
    data: {
      walletId: wallet.id,
      userId: wallet.userId,
      type: "DEPOSIT",
      amount: amountWei,
      txHash,
      from: tx.from ?? undefined,
      to,
      status: confirmed ? "CONFIRMED" : "PENDING",
      confirmations,
      chain: "ETH",
    },
  });

  if (confirmed) {
    // increment balance (Prisma Decimal expects string)
    await prisma.wallet.update({
      where: { id: wallet.id },
      data: { balance: { increment: amountWei as any } },
    });
  }

  revalidatePath("/dashboard");
  return { success: true, transaction: created };
}

/** Estimate fee for withdraw (server action) */
const feeSchema = z.object({ to: z.string().min(10), amount: z.string() });
export async function estimateWithdrawalFeeAction(
  body: z.infer<typeof feeSchema>
) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };
  const parsed = feeSchema.safeParse(body);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const value = parseEtherSafe(parsed.data.amount);
  const txRequest = { to: parsed.data.to, value };
  const gasLimitBn = await provider.estimateGas(txRequest);
  const feeData = await provider.getFeeData();

  const gasPriceBn =
    feeData.gasPrice ??
    feeData.maxFeePerGas ??
    feeData.lastBaseFeePerGas ??
    ethers.BigNumber.from("0");
  const feeWei = gasLimitBn.mul(gasPriceBn);
  const feeEth = formatEtherSafe(feeWei);

  return {
    gasLimit: gasLimitBn.toString(),
    gasPrice: gasPriceBn.toString(),
    feeEth,
  };
}

/** Withdraw request (step1: request OTP). Creates a WithdrawalRequest with PENDING and stores OTP. */
const withdrawRequestSchema = z.object({
  walletId: z.string().optional(),
  amount: z.string(), // ETH string
  address: z.string(),
});
export async function requestWithdrawalOtpAction(
  body: z.infer<typeof withdrawRequestSchema>
) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };
  const parsed = withdrawRequestSchema.safeParse(body);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { amount, address } = parsed.data;
  // find wallet by userId
  const wallet = await prisma.wallet.findUnique({
    where: { userId: session.user.id },
  });
  if (!wallet) return { error: "Wallet not found" };

  // validate eth address
  if (
    !(ethers.utils as any).isAddress
      ? !(ethers as any).utils.isAddress(address)
      : !ethers.utils.isAddress(address)
  ) {
    return { error: "Invalid destination address" };
  }

  // balance check
  const balance = parseFloat(wallet.balance.toString());
  const amountNum = parseFloat(amount);
  if (balance < amountNum) return { error: "Insufficient balance" };

  // create withdrawal request (OTP not yet verified)
  const created = await prisma.withdrawalRequest.create({
    data: {
      userId: session.user.id,
      walletId: wallet.id,
      address,
      amount: amount,
      chain: "ETH",
      status: "PENDING",
    },
  });

  // generate OTP & save into separate table (WithdrawalOTP)
  // const code = Math.floor(100000 + Math.random() * 900000).toString();
  // await prisma.withdrawalOTP.create({
  //   data: {
  //     userId: session.user.id,
  //     code,
  //     expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  //   },
  // });

  // send OTP via email (sendWithdrawalOTP should accept user email & code)
  await sendWithdrawalOTP(session.user.id, session.user.email!);

  return { success: true, requestId: created.id };
}

/** Verify OTP & mark request OTP_VERIFIED */
const verifyOtpSchema = z.object({
  requestId: z.string(),
  otp: z.string().length(6),
});
export async function verifyWithdrawalOtpAction(
  body: z.infer<typeof verifyOtpSchema>
) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };
  const parsed = verifyOtpSchema.safeParse(body);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { requestId, otp } = parsed.data;
  const req = await prisma.withdrawalRequest.findUnique({
    where: { id: requestId },
  });
  if (!req || req.userId !== session.user.id)
    return { error: "Request not found" };

  const otpRow = await prisma.withdrawalOTP.findFirst({
    where: { userId: session.user.id, code: otp },
    orderBy: { createdAt: "desc" },
  });
  if (!otpRow) return { error: "Invalid OTP" };
  if (otpRow.expiresAt.getTime() < Date.now()) return { error: "OTP expired" };

  // mark request as OTP_VERIFIED
  await prisma.withdrawalRequest.update({
    where: { id: requestId },
    data: { status: "OTP_VERIFIED" },
  });

  // Optionally delete OTP or mark consumed
  await prisma.withdrawalOTP.deleteMany({ where: { id: otpRow.id } });

  return { success: true };
}

/** Admin broadcast/approve (admin only) */
const adminApproveSchema = z.object({ requestId: z.string() });
export async function adminApproveWithdrawalAction(
  body: z.infer<typeof adminApproveSchema>
) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };
  // In real app, check session.user.role === "ADMIN"
  if ((session.user as any).role !== "ADMIN")
    return { error: "Unauthorized - admin only" };

  const parsed = adminApproveSchema.safeParse(body);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const req = await prisma.withdrawalRequest.findUnique({
    where: { id: parsed.data.requestId },
  });
  if (!req) return { error: "Request not found" };
  if (req.status !== "OTP_VERIFIED" && req.status !== "APPROVED")
    return { error: "Request not verified" };

  // broadcast using wallet helper
  // amount in ETH string -> convert to wei string
  const amountWei = parseEtherSafe(String(req.amount)).toString();
  const txHash = await broadcastTx(req.walletId, req.address, amountWei, RPC);

  // update request + transaction record
  await prisma.$transaction(async (tx) => {
    await tx.withdrawalRequest.update({
      where: { id: req.id },
      data: {
        txHash,
        status: "BROADCASTED",
        approvedAt: new Date(),
        approvedBy: session.user.id,
      },
    });

    const t = await tx.transaction.create({
      data: {
        userId: req.userId,
        walletId: req.walletId,
        chain: "ETH",
        type: "WITHDRAWAL",
        amount: req.amount,
        fee: undefined,
        address: req.address,
        txHash,
        status: "PENDING",
      },
    });

    // decrement wallet balance conservatively
    await tx.wallet.update({
      where: { id: req.walletId },
      data: { balance: { decrement: req.amount as any } },
    });
  });

  revalidatePath("/dashboard");
  return { success: true, txHash };
}

/**
 *
 */

export async function getWalletDataAction(
  page: number = 1,
  pageSize: number = 6
) {
  const session = await auth();

  if (!session?.user?.id) return null;

  const userId = session.user.id;

  const wallet = await prisma.wallet.findUnique({
    where: { userId },
  });

  if (!wallet) return null;

  const total = await prisma.transaction.count({
    where: { userId },
  });

  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    wallet,
    transactions,
    pagination: {
      total,
      totalPages: Math.ceil(total / pageSize),
      page,
    },
  };
}
