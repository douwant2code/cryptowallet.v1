"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { sendWithdrawalOTP } from "@/lib/email/send-otp";
import { Decimal } from "@prisma/client/runtime/library";

const withdrawSchema = z.object({
  amount: z.number().positive(),
  address: z.string().min(10, "Invalid withdrawal address"),

  step: z.enum(["REQUEST_OTP", "VERIFY"]),
  otp: z.string().optional(),
});

export async function withdrawAction(input: z.infer<typeof withdrawSchema>) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const parsed = withdrawSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { amount, address, step, otp } = parsed.data;

  // Fetch wallet
  const wallet = await prisma.wallet.findFirst({
    where: { userId: session.user.id },
  });

  if (!wallet) return { error: "Wallet not found" };

  const blockchainFee = 0.000005; // Replace later with mempool API fee

  // ─────────────────────────────────────────────
  // STEP 1 — REQUEST OTP
  // ─────────────────────────────────────────────

  const formattedAmount = new Decimal(amount).plus(blockchainFee);
  if (step === "REQUEST_OTP") {
    if (wallet.balance.lt(formattedAmount)) {
      return { error: "Insufficient balance" };
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save new OTP record
    await prisma.withdrawalOTP.create({
      data: {
        userId: session.user.id,
        code: generatedOtp,
        type: "withdrawal",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      },
    });

    // Send OTP email
    await sendWithdrawalOTP(session.user.id, session.user.email!);

    return { otpSent: true };
  }

  // ─────────────────────────────────────────────
  // STEP 2 — VERIFY OTP + WITHDRAW
  // ─────────────────────────────────────────────
  if (step === "VERIFY") {
    if (!otp) return { error: "OTP required" };

    // Find latest OTP for user
    const latestOtp = await prisma.withdrawalOTP.findFirst({
      where: { userId: session.user.id, type: "withdrawal" },
      orderBy: { createdAt: "desc" },
    });

    if (!latestOtp) return { error: "OTP not found" };

    if (latestOtp.code !== otp) {
      return { error: "Invalid OTP" };
    }

    if (latestOtp.expiresAt < new Date()) {
      return { error: "OTP expired" };
    }

    // Complete the transaction
    await prisma.$transaction(async (tx) => {
      const total = new Decimal(amount).plus(new Decimal(blockchainFee));

      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: total },
        },
      });

      await tx.transaction.create({
        data: {
          userId: session.user.id,
          walletId: wallet.id,
          type: "WITHDRAWAL",
          amount,
          fee: blockchainFee,
          address,
          status: "PENDING",
        },
      });

      // Delete used OTP
      await tx.withdrawalOTP.delete({
        where: { id: latestOtp.id },
      });
    });

    revalidatePath("/dashboard");

    return { success: true };
  }

  return { error: "Invalid operation" };
}
