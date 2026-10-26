import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { recordAdClickHit } from "@/lib/ad-click-hits";

const ALLOWED_EMAIL = "xbu333@gmail.com";

const PUBLIC_PATHS = [
  "/admin/login",
  "/admin/auth/callback",
  "/admin/unauthorized",
];

// Google Tag Gateway (first-party GTM proxy) — container GTM-NCBBQJT
const GTG_PATH_PREFIX = "/metrics";
const GTG_ORIGIN = "https://gtm-ncbbqjt.fps.goog";

function handleTagGateway(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const destination = new URL(
    pathname.slice(GTG_PATH_PREFIX.length) + search,
    GTG_ORIGIN
  );

  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("host", destination.host);

  // Optional but recommended by Google: forward visitor geolocation
  const country = request.headers.get("x-vercel-ip-country");
  const region = request.headers.get("x-vercel-ip-country-region");
  if (country && region) {
    reqHeaders.set("X-Forwarded-CountryRegion", `${country}-${region}`);
  }
  const lat = request.headers.get("x-vercel-ip-latitude");
  const lon = request.headers.get("x-vercel-ip-longitude");
  const city = request.headers.get("x-vercel-ip-city");
  if (lat && lon) {
    reqHeaders.set(
      "X-Forwarded-Geolocation",
      `latlong=${lat},${lon}${city ? `;city=${decodeURIComponent(city)}` : ""}`
    );
  }

  return NextResponse.rewrite(destination, { request: { headers: reqHeaders } });
}

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  // Never let this proxy touch fraud-detection/API routes, even if the
  // matcher below is broadened later.
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Public ad landing (?gclid=…): record the click server-side, before any
  // JavaScript runs, then let the page render untouched. Logging happens in
  // the background (waitUntil) so the visitor never waits for it.
  if (
    !pathname.startsWith("/admin") &&
    !pathname.startsWith(GTG_PATH_PREFIX)
  ) {
    if (request.nextUrl.searchParams.has("gclid")) {
      event.waitUntil(recordAdClickHit(request));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith(GTG_PATH_PREFIX)) {
    return handleTagGateway(request);
  }

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
  matcher: [
    "/admin/:path*",
    "/metrics/:path*",
    // Ad landings only: any page request that carries ?gclid=
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|admin|metrics).*)",
      has: [{ type: "query", key: "gclid" }],
    },
  ],
};
