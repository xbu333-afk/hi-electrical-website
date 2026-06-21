import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_EMAIL = "xbu333@gmail.com";

// Routes under /admin that don't require an active session
const PUBLIC_ADMIN_PATHS = [
  "/admin/login",
  "/admin/auth/callback",
  "/admin/unauthorized",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip auth for public admin pages and non-admin routes
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session (required for SSR token rotation)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not authenticated — redirect to login
  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  // Wrong email — redirect to unauthorized
  if (user.email !== ALLOWED_EMAIL) {
    await supabase.auth.signOut();
    const unauthorizedUrl = request.nextUrl.clone();
    unauthorizedUrl.pathname = "/admin/unauthorized";
    return NextResponse.redirect(unauthorizedUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
