"use server";

import { prisma } from "@/lib/prisma";

export async function getWalletBalance(userId: string) {
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
    select: { balance: true },
  });

  return wallet?.balance ?? 0;
}
