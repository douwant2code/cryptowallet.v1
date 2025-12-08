"use server";

import { signOut } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // 1. Delete next-auth session cookies (important for all tabs)
  const cookieStore = await cookies();
  cookieStore.delete("next-auth.session-token");
  cookieStore.delete("__Secure-next-auth.session-token");
  cookieStore.delete("next-auth.callback-url");
  cookieStore.delete("next-auth.csrf-token");

  // 2. Call NextAuth's signOut (invalidates JWT/session)
  await signOut({ redirect: false });

  // 3. Redirect user to login page
  redirect("/auth/sign-in");
}
