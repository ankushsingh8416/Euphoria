import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });

  // ✅ Fix: If session exists, allow access
  if (session) {
    return NextResponse.next();
  }

  // ❌ Redirect if session is missing
  return NextResponse.redirect(new URL("/login", req.url));
}

// ✅ Fix: Ensure `/cart` and all subpaths are protected
export const config = {
  matcher: ["/cart/:path*", "/edit/:path*" , "/wishlist/:path*"],
};
