"use server";

import { signIn } from "@/lib/auth";
import { getUserByEmail } from "@/util/data";
import { SignInSchema } from "@/util/schema/sign-in";
import bcrypt from "bcryptjs";
import * as z from "zod";

export async function signin(data: z.infer<typeof SignInSchema>) {
  const isValidField = SignInSchema.safeParse(data);

  if (!isValidField.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = isValidField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password) {
    return {
      error:
        "OOPS!!! Invalid credentials provided. Please try again or contact support.",
    };
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    return { error: "Invalid email or password." };
  }

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    return { error: result.error };
  }

  return { success: true };
}
