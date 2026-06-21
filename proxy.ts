import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Inject header so root layout renders bare body for admin pages
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-is-admin", "1");

  // Public admin pages — no auth needed
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Check password cookie
  const cookie = request.cookies.get("admin-auth")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || cookie !== adminPassword) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin/:path*"],
};
