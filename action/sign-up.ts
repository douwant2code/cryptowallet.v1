"use server";

import { getUserByEmail } from "@/util/data";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { SignUpSchema } from "@/util/schema/sign-up";
import { prisma } from "@/lib/prisma";
import { generateEncryptedWalletForUser } from "@/lib/wallet";

export async function signup(data: z.infer<typeof SignUpSchema>) {
  const parsed = SignUpSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid details found" };
  }

  const { name, email, password } = parsed.data;
  const lowercaseEmail = email.toLowerCase();

  const existingUser = await getUserByEmail(lowercaseEmail);
  if (existingUser) {
    return { error: "Duplicate account found." };
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: lowercaseEmail,
      password: hashed,
      name,
    },
  });

  // ETH-only wallet creation
  try {
    await generateEncryptedWalletForUser(user.id);
  } catch (err) {
    console.error("Wallet creation failed:", err);
    return {
      error: "Account created but wallet setup failed. Contact support.",
    };
  }

  return { success: true };
}
