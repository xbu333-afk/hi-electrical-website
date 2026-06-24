/** Google Ads ValueTrack fields captured from landing URL query params. */
export interface ValueTrackParams {
  keyword: string | null;
  campaign_id: string | null;
  adgroup_id: string | null;
  creative: string | null;
  vt_device: string | null;
  loc_physical_ms: string | null;
  network: string | null;
  match_type: string | null;
}

const EMPTY: ValueTrackParams = {
  keyword: null,
  campaign_id: null,
  adgroup_id: null,
  creative: null,
  vt_device: null,
  loc_physical_ms: null,
  network: null,
  match_type: null,
};

function pickParam(
  searchParams: URLSearchParams,
  ...keys: string[]
): string | null {
  for (const key of keys) {
    const raw = searchParams.get(key)?.trim();
    if (!raw) continue;
    try {
      return decodeURIComponent(raw.replace(/\+/g, " "));
    } catch {
      return raw;
    }
  }
  return null;
}

/** Read ValueTrack params from the landing page URL (client-side searchParams). */
export function extractValueTrackParams(
  searchParams: URLSearchParams
): ValueTrackParams {
  return {
    keyword: pickParam(searchParams, "keyword"),
    campaign_id: pickParam(searchParams, "campaign_id", "campaignid"),
    adgroup_id: pickParam(searchParams, "adgroup_id", "adgroupid"),
    creative: pickParam(searchParams, "creative"),
    vt_device: pickParam(searchParams, "vt_device", "device"),
    loc_physical_ms: pickParam(searchParams, "loc_physical_ms"),
    network: pickParam(searchParams, "network"),
    match_type: pickParam(searchParams, "match_type", "matchtype"),
  };
}

/** Normalize a partial payload from the notify API enter event. */
export function normalizeValueTrackPayload(
  body: Partial<ValueTrackParams> | undefined | null
): ValueTrackParams {
  if (!body) return { ...EMPTY };
  return {
    keyword: body.keyword?.trim() || null,
    campaign_id: body.campaign_id?.trim() || null,
    adgroup_id: body.adgroup_id?.trim() || null,
    creative: body.creative?.trim() || null,
    vt_device: body.vt_device?.trim() || null,
    loc_physical_ms: body.loc_physical_ms?.trim() || null,
    network: body.network?.trim() || null,
    match_type: body.match_type?.trim() || null,
  };
}

/** Human-readable network label for Pushover / dashboard. */
export function formatAdsNetwork(network: string | null): string {
  if (!network) return "—";
  const map: Record<string, string> = {
    g: "חיפוש Google",
    s: "שותפי חיפוש",
    d: "Display",
    x: "Performance Max",
    y: "YouTube",
  };
  return map[network.toLowerCase()] ?? network;
}

/** Human-readable match type for Pushover / dashboard. */
export function formatMatchType(matchType: string | null): string {
  if (!matchType) return "—";
  const map: Record<string, string> = {
    e: "התאמה מדויקת",
    p: "התאמה ביטוי",
    b: "התאמה רחבה",
  };
  return map[matchType.toLowerCase()] ?? matchType;
}
