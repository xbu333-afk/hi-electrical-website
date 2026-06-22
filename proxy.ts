import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_EMAIL = "xbu333@gmail.com";

const PUBLIC_PATHS = [
  "/admin/login",
  "/admin/auth/callback",
  "/admin/unauthorized",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Inject header → root layout renders bare body (no navbar/footer)
  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("x-is-admin", "1");

  // Public admin pages — no session check
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next({ request: { headers: reqHeaders } });
  }

  // Protected pages — verify Supabase session
  let response = NextResponse.next({ request: { headers: reqHeaders } });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request: { headers: reqHeaders } });
          list.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (user.email !== ALLOWED_EMAIL) {
    return NextResponse.redirect(new URL("/admin/unauthorized", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
