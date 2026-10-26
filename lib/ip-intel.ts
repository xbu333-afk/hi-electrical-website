/**
 * Network intelligence for a paid click via proxycheck.io (v3 API).
 *
 * Tells us WHO provides the connection (Partner, Cellcom, Bezeq, a hosting
 * company…) and whether it is a VPN / proxy / Tor / data-centre address —
 * the kind of hard technical evidence Google's invalid-click team accepts.
 *
 * Needs PROXYCHECK_API_KEY in Vercel env (free plan: 1,000 lookups/day).
 * Without a key, or on any error/timeout, returns null — never blocks a visit.
 */

const TIMEOUT_MS = 1500;

export interface IpIntel {
  provider: string | null;
  asn: string | null;
  /** proxycheck's connection type, e.g. "Business", "Residential", "Wireless", "Hosting" */
  type: string | null;
  /** Any of: vpn, proxy, tor, hosting, anonymous, compromised, scraper */
  flags: string[];
  risk: number | null;
}

const FLAG_KEYS = [
  "vpn",
  "proxy",
  "tor",
  "hosting",
  "anonymous",
  "compromised",
  "scraper",
] as const;

const FLAG_LABEL_HE: Record<string, string> = {
  vpn: "VPN",
  proxy: "פרוקסי",
  tor: "Tor",
  hosting: "שרת/דאטה-סנטר",
  anonymous: "חיבור אנונימי",
  compromised: "כתובת שנפרצה",
  scraper: "סורק/בוט",
};

export function describeIntelHe(intel: IpIntel): string {
  const who = [intel.provider, intel.type].filter(Boolean).join(" · ");
  return who || "לא ידוע";
}

export function flagsLabelHe(flags: string[]): string {
  return flags.map((f) => FLAG_LABEL_HE[f] ?? f).join(", ");
}

const VALID_IP = /^[0-9a-fA-F:.]{3,45}$/;

export async function lookupIpIntel(ip: string): Promise<IpIntel | null> {
  const key = process.env.PROXYCHECK_API_KEY?.trim();
  if (!key || !ip || ip === "unknown" || !VALID_IP.test(ip)) return null;

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://proxycheck.io/v3/${encodeURIComponent(ip)}?key=${encodeURIComponent(key)}`,
      { signal: ac.signal, cache: "no-store" }
    );
    if (!res.ok) return null;
    const body = (await res.json()) as Record<string, unknown>;
    const entry = body[ip] as
      | {
          network?: { asn?: string; provider?: string; type?: string };
          detections?: Record<string, unknown>;
        }
      | undefined;
    if (!entry) return null;

    const det = entry.detections ?? {};
    const flags = FLAG_KEYS.filter((k) => det[k] === true);
    const risk = typeof det.risk === "number" ? det.risk : null;

    return {
      provider: entry.network?.provider ?? null,
      asn: entry.network?.asn ?? null,
      type: entry.network?.type ?? null,
      flags,
      risk,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
