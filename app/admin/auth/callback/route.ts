import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_EMAIL = "xbu333@gmail.com";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[admin/auth/callback] session error:", error.message);
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", encodeURIComponent(error.message));
    return NextResponse.redirect(loginUrl);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email !== ALLOWED_EMAIL) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/admin/unauthorized", request.url));
  }

  return NextResponse.redirect(new URL("/admin/analytics", request.url));
}
