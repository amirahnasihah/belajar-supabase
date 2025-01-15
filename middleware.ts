import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes - add any new protected paths here
  const protectedPaths = ["/lessons", "/komuniti", "/kuiz"];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // Redirect if accessing protected route without auth
  if (isProtectedPath && !session) {
    const redirectUrl = new URL("/login", req.url);
    // Add the attempted URL as a search param to redirect back after login
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is signed in and tries to access auth pages, redirect to home
  if (
    session &&
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/auth"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// Update matcher to include all protected routes
export const config = {
  matcher: [
    "/lessons/:path*",
    "/komuniti/:path*",
    "/kuiz/:path*",
    "/login",
    "/auth",
  ],
};
