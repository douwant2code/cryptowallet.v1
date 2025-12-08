// app/api/wallet/transactions/route.ts
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  try {
    const session = req.auth;
    if (!session?.user?.id) {
      return NextResponse.json([], { status: 401 });
    }

    const tx = await prisma.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json(tx);
  } catch (err) {
    console.error("Transactions API error:", err);
    return NextResponse.json([]);
  }
});
