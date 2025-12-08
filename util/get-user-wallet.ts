"use server";

import { prisma } from "@/lib/prisma";

export async function getUserWallet(userId: string) {
  return prisma.wallet.findUnique({
    where: { userId },
  });
}
