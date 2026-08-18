export interface VisitorRow {
  id: number;
  visitor_id: string;
  ip_address: string;
  page_path: string;
  pages_visited: string[] | null;
  source: string;
  device: string | null;
  city: string | null;
  gclid: string | null;
  user_agent: string | null;
  referrer: string | null;
  keyword: string | null;
  campaign_id: string | null;
  adgroup_id: string | null;
  creative: string | null;
  vt_device: string | null;
  loc_physical_ms: string | null;
  network: string | null;
  match_type: string | null;
  browser_language: string | null;
  device_fingerprint: string | null;
  country: string | null;
  duration: number | null;
  clicked_action: boolean;
  created_at: string;
}
