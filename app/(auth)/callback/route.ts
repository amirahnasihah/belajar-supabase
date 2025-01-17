import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { session }, error } = await supabase.auth
      .exchangeCodeForSession(code);

    if (!error && session) {
      // Get the original redirectTo URL from the session
      const redirectTo = session.user.user_metadata?.redirectTo || "/";
      return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
    }
  }

  // If there's no code or an error occurs, redirect to home
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}
