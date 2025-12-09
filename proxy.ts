// middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;

  const publicRoutes = ["/", "/sign-in", "/signin", "/login"];
  const isPublic = publicRoutes.includes(nextUrl.pathname);

  if (isPublic) {
    return NextResponse.next();
  }

  const protectedRoutes = [
    "/dashboard",
    "/wallet",
    "/account",
    "/deposit",
    "/transactions",
    "/withdraw",
  ];

  const isProtected = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  const isLoggedIn = !!req.auth?.user;

  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
