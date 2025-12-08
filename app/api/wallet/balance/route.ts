// app/api/wallet/balance/route.ts
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  try {
    const session = req.auth;
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id },
    });

    if (!wallet) {
      return NextResponse.json({ balance: 0 });
    }

    return NextResponse.json({
      balance: Number(wallet.balance) || 0,
    });
  } catch (err) {
    console.error("Balance API error:", err);
    return NextResponse.json({ balance: 0 });
  }
});
