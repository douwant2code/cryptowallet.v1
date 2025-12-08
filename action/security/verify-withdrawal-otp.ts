"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function verifyWithdrawalOTP(code: string) {
  const session = await auth();
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const record = await prisma.withdrawalOTP.findFirst({
    where: {
      userId: session.user.id,
      code,
      expiresAt: { gt: new Date() },
    },
  });

  if (!record) return { success: false, error: "Invalid or expired OTP" };

  // destroy OTP after use
  await prisma.withdrawalOTP.delete({
    where: { id: record.id },
  });

  return { success: true };
}
