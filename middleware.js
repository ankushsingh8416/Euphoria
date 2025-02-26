import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || "ankush@jwtnextauthsecret", // Fallback value for secret
    raw: true,
  });

  if (session) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/cart/:path*", "/edit/:path*", "/wishlist/:path*"],
};