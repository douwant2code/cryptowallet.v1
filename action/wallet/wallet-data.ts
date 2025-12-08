"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { fetchWalletBalanceOnChain } from "@/lib/blockchain/eth";

export async function getLatestWalletBalance() {
  const session = await auth();
  if (!session?.user?.id) return "0";

  const wallet = await prisma.wallet.findUnique({
    where: { userId: session.user.id },
  });

  if (!wallet) return "0";

  try {
    const liveBalance = await fetchWalletBalanceOnChain(wallet.address);

    await prisma.wallet.update({
      where: { id: wallet.id },
      data: { balance: liveBalance },
    });

    return liveBalance;
  } catch (err) {
    console.error("RPC error:", err);
    return wallet.balance?.toString() ?? "0";
  }
}
