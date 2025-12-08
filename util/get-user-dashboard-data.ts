"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getUserDashboardData() {
  const session = await auth();

  if (!session?.user?.id) return redirect("/auth/sign-in");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      wallet: true,
    },
  });

  if (!user) return redirect("/auth/sign-in");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    wallet: {
      address: user.wallet?.address ?? null,
      balance: user.wallet?.balance ?? 0,
    },
  };
}
