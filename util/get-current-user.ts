"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user.id) redirect("/auth/sign-in");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return user;
}
