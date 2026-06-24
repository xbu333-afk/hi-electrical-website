/** True for RFC1918, loopback, and link-local addresses we should skip in X-Forwarded-For chains. */
function isPrivateOrLoopback(ip: string): boolean {
  if (!ip) return true;
  if (ip === "::1" || ip.startsWith("fe80:") || ip.startsWith("fc00:")) return true;
  if (/^127\./.test(ip)) return true;
  if (/^10\./.test(ip)) return true;
  if (/^192\.168\./.test(ip)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return true;
  return false;
}

function firstPublicIp(csv: string | null): string | null {
  if (!csv) return null;
  for (const raw of csv.split(",")) {
    const ip = raw.trim();
    if (ip && !isPrivateOrLoopback(ip)) return ip;
  }
  return null;
}

/**
 * Extract the real client IP on Vercel / reverse proxies.
 * Priority: x-vercel-forwarded-for → x-real-ip → first public IP in x-forwarded-for.
 */
export function extractClientIp(headers: Headers): string {
  const vercel = firstPublicIp(headers.get("x-vercel-forwarded-for"));
  if (vercel) return vercel;

  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp && !isPrivateOrLoopback(realIp)) return realIp;

  const forwarded = firstPublicIp(headers.get("x-forwarded-for"));
  if (forwarded) return forwarded;

  // Last resort — first token even if private (better than "unknown" for local dev)
  const fallback = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (fallback) return fallback;

  return "unknown";
}
