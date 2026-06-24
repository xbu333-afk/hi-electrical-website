/** Lookback window for Google Ads click-fraud detection (hours). */
export const FRAUD_LOOKBACK_HOURS = 48;

export interface FraudClickRow {
  ip_address: string;
  created_at: string;
  gclid: string;
  user_agent: string | null;
}

export interface SuspiciousIpGroup {
  ip_address: string;
  gclid_visit_count: number;
  latest_gclid: string;
  latest_at: string;
  latest_user_agent: string | null;
  gclid_rows: FraudClickRow[];
}

type LogLike = {
  ip_address: string;
  gclid: string | null;
  created_at: string;
  user_agent: string | null;
};

/**
 * IPs with more than one gclid visit in the lookback window.
 * Used for Google Ads Click Quality Investigation reporting.
 */
export function detectSuspiciousGclidIps(
  logs: LogLike[],
  lookbackHours = FRAUD_LOOKBACK_HOURS
): SuspiciousIpGroup[] {
  const since = Date.now() - lookbackHours * 60 * 60 * 1000;

  const byIp = new Map<string, LogLike[]>();
  for (const row of logs) {
    if (!row.gclid || !row.ip_address) continue;
    if (new Date(row.created_at).getTime() < since) continue;
    const list = byIp.get(row.ip_address) ?? [];
    list.push(row);
    byIp.set(row.ip_address, list);
  }

  const groups: SuspiciousIpGroup[] = [];
  for (const [ip, rows] of byIp) {
    if (rows.length <= 1) continue;

    const sorted = [...rows].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    const latest = sorted[0];

    groups.push({
      ip_address: ip,
      gclid_visit_count: rows.length,
      latest_gclid: latest.gclid!,
      latest_at: latest.created_at,
      latest_user_agent: latest.user_agent,
      gclid_rows: sorted.map((r) => ({
        ip_address: r.ip_address,
        created_at: r.created_at,
        gclid: r.gclid!,
        user_agent: r.user_agent,
      })),
    });
  }

  return groups.sort((a, b) => b.gclid_visit_count - a.gclid_visit_count);
}

/** Flatten all gclid rows from suspicious IP groups for Google CSV export. */
export function flattenFraudClicksForExport(
  groups: SuspiciousIpGroup[]
): FraudClickRow[] {
  return groups.flatMap((g) => g.gclid_rows);
}
