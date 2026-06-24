/** Lookback window for reference (hours) — callers pass pre-filtered rows. */
export const FRAUD_LOOKBACK_HOURS = 48;

export interface FraudClickRow {
  ip_address: string;
  created_at: string;
  gclid: string;
  user_agent: string | null;
  visitor_id?: string;
  keyword?: string | null;
  campaign_id?: string | null;
  adgroup_id?: string | null;
  network?: string | null;
  vt_device?: string | null;
  browser_language?: string | null;
}

export interface SuspiciousIpGroup {
  ip_address: string;
  gclid_visit_count: number;
  latest_gclid: string;
  latest_at: string;
  latest_user_agent: string | null;
  gclid_rows: FraudClickRow[];
}

export interface IpSwitcherRow {
  visitor_id: string;
  ip_address: string;
  created_at: string;
  gclid: string | null;
  user_agent: string | null;
  keyword?: string | null;
  campaign_id?: string | null;
  adgroup_id?: string | null;
  network?: string | null;
  vt_device?: string | null;
  browser_language?: string | null;
}

export interface IpSwitcherGroup {
  visitor_id: string;
  unique_ip_count: number;
  unique_ips: string[];
  latest_at: string;
  latest_user_agent: string | null;
  rows: IpSwitcherRow[];
}

type LogLike = {
  ip_address: string;
  gclid: string | null;
  created_at: string;
  user_agent: string | null;
  visitor_id?: string;
  keyword?: string | null;
  campaign_id?: string | null;
  adgroup_id?: string | null;
  network?: string | null;
  vt_device?: string | null;
  browser_language?: string | null;
};

/**
 * IPs with more than one GCLID click in the provided rows.
 * Callers must pass pre-filtered rows (e.g. by date range) — no internal time cap.
 */
export function detectSuspiciousGclidIps(logs: LogLike[]): SuspiciousIpGroup[] {
  const byIp = new Map<string, LogLike[]>();
  for (const row of logs) {
    if (!row.gclid || !row.ip_address) continue;
    const list = byIp.get(row.ip_address) ?? [];
    list.push(row);
    byIp.set(row.ip_address, list);
  }

  const groups: SuspiciousIpGroup[] = [];
  for (const [ip, rows] of byIp) {
    if (rows.length <= 1) continue;

    const sorted = [...rows].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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
        visitor_id: r.visitor_id,
        keyword: r.keyword,
        campaign_id: r.campaign_id,
        adgroup_id: r.adgroup_id,
        network: r.network,
        vt_device: r.vt_device,
        browser_language: r.browser_language,
      })),
    });
  }

  return groups.sort((a, b) => b.gclid_visit_count - a.gclid_visit_count);
}

/**
 * Visitor IDs that appear with more than one unique IP address in the provided rows.
 * Used to detect IP rotation / VPN fraudsters who rotate cellular IPs between clicks.
 * Callers must pass pre-filtered rows (e.g. by date range).
 */
export function detectIpSwitcherByVisitorId(logs: LogLike[]): IpSwitcherGroup[] {
  const byVisitorId = new Map<string, LogLike[]>();
  for (const row of logs) {
    if (!row.visitor_id || !row.ip_address) continue;
    const list = byVisitorId.get(row.visitor_id) ?? [];
    list.push(row);
    byVisitorId.set(row.visitor_id, list);
  }

  const groups: IpSwitcherGroup[] = [];
  for (const [visitorId, rows] of byVisitorId) {
    const uniqueIps = [...new Set(rows.map((r) => r.ip_address))];
    if (uniqueIps.length <= 1) continue;

    const sorted = [...rows].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    const latest = sorted[0];

    groups.push({
      visitor_id: visitorId,
      unique_ip_count: uniqueIps.length,
      unique_ips: uniqueIps,
      latest_at: latest.created_at,
      latest_user_agent: latest.user_agent,
      rows: sorted.map((r) => ({
        visitor_id: r.visitor_id!,
        ip_address: r.ip_address,
        created_at: r.created_at,
        gclid: r.gclid,
        user_agent: r.user_agent,
        keyword: r.keyword,
        campaign_id: r.campaign_id,
        adgroup_id: r.adgroup_id,
        network: r.network,
        vt_device: r.vt_device,
        browser_language: r.browser_language,
      })),
    });
  }

  return groups.sort((a, b) => b.unique_ip_count - a.unique_ip_count);
}

/** Flatten all gclid rows from suspicious IP groups for Google CSV export. */
export function flattenFraudClicksForExport(groups: SuspiciousIpGroup[]): FraudClickRow[] {
  return groups.flatMap((g) => g.gclid_rows);
}

// ── Geographic Targeting Violations ──────────────────────────────────────────

export interface GeoFraudRow {
  id: number;
  ip_address: string;
  created_at: string;
  gclid: string;
  country: string;
  user_agent: string | null;
  visitor_id?: string;
  keyword?: string | null;
  campaign_id?: string | null;
  adgroup_id?: string | null;
  network?: string | null;
  vt_device?: string | null;
  browser_language?: string | null;
}

type GeoFraudLogLike = {
  id: number;
  ip_address: string;
  created_at: string;
  gclid: string | null;
  country: string | null;
  source: string;
  user_agent: string | null;
  visitor_id?: string;
  keyword?: string | null;
  campaign_id?: string | null;
  adgroup_id?: string | null;
  network?: string | null;
  vt_device?: string | null;
  browser_language?: string | null;
};

/**
 * Paid clicks (with GCLID) that originated outside Israel.
 * The campaign is set to target Israel only — these are geographic targeting violations
 * eligible for invalid click credit from Google Ads.
 */
export function detectGeoFraud(rows: GeoFraudLogLike[]): GeoFraudRow[] {
  return rows
    .filter(
      (r): r is GeoFraudLogLike & { gclid: string; country: string } =>
        r.source === "mumooman" &&
        !!r.gclid &&
        !!r.country &&
        r.country !== "IL"
    )
    .map((r) => ({
      id: r.id,
      ip_address: r.ip_address,
      created_at: r.created_at,
      gclid: r.gclid,
      country: r.country,
      user_agent: r.user_agent,
      visitor_id: r.visitor_id,
      keyword: r.keyword,
      campaign_id: r.campaign_id,
      adgroup_id: r.adgroup_id,
      network: r.network,
      vt_device: r.vt_device,
      browser_language: r.browser_language,
    }));
}

// ── Device Targeting Violations (mobile-only campaign) ─────────────────────────

const MOBILE_UA =
  /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i;

export interface DesktopFraudRow {
  id: number;
  ip_address: string;
  created_at: string;
  gclid: string;
  user_agent: string | null;
  visitor_id?: string;
  keyword?: string | null;
  campaign_id?: string | null;
  adgroup_id?: string | null;
  network?: string | null;
  vt_device: string | null;
  browser_language?: string | null;
  device: string | null;
}

type DesktopFraudLogLike = {
  id: number;
  ip_address: string;
  created_at: string;
  gclid: string | null;
  source: string;
  user_agent: string | null;
  visitor_id?: string;
  keyword?: string | null;
  campaign_id?: string | null;
  adgroup_id?: string | null;
  network?: string | null;
  vt_device?: string | null;
  browser_language?: string | null;
  device?: string | null;
};

/** True when click evidence indicates desktop/computer on a mobile-only campaign. */
export function isDesktopPaidClick(row: {
  vt_device?: string | null;
  device?: string | null;
  user_agent?: string | null;
}): boolean {
  const vt = row.vt_device?.toLowerCase();
  if (vt === "c") return true;
  if (row.device === "desktop") return true;
  if (row.user_agent && !MOBILE_UA.test(row.user_agent)) return true;
  return false;
}

/**
 * Paid clicks (with GCLID) from desktop/computer devices.
 * Campaign targets mobile only — these are device targeting violations.
 */
export function detectDesktopFraud(rows: DesktopFraudLogLike[]): DesktopFraudRow[] {
  return rows
    .filter(
      (r): r is DesktopFraudLogLike & { gclid: string } =>
        r.source === "mumooman" && !!r.gclid && isDesktopPaidClick(r)
    )
    .map((r) => ({
      id: r.id,
      ip_address: r.ip_address,
      created_at: r.created_at,
      gclid: r.gclid,
      user_agent: r.user_agent,
      visitor_id: r.visitor_id,
      keyword: r.keyword,
      campaign_id: r.campaign_id,
      adgroup_id: r.adgroup_id,
      network: r.network,
      vt_device: r.vt_device ?? null,
      browser_language: r.browser_language,
      device: r.device ?? null,
    }));
}
