import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_EMAIL = "xbu333@gmail.com";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const errorDesc = searchParams.get("error_description");

  if (errorDesc) {
    return NextResponse.redirect(
      `${origin}/admin/login?error=${encodeURIComponent(errorDesc)}`
    );
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/admin/login`);
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => list.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[callback] exchangeCodeForSession error:", error.message);
    return NextResponse.redirect(
      `${origin}/admin/login?error=${encodeURIComponent(error.message)}`
    );
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (user?.email !== ALLOWED_EMAIL) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/admin/unauthorized`);
  }

  return NextResponse.redirect(`${origin}/admin/analytics`);
}
