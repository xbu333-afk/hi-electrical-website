-- Run in Supabase SQL Editor (once) — BEFORE deploying the matching code.
-- Engagement signals + per-click fraud score (device-based, not IP-based).
alter table visitor_logs
  add column if not exists touch_count          integer,
  add column if not exists scroll_pct           integer,
  add column if not exists first_interaction_ms integer,
  add column if not exists low_engagement       boolean,
  add column if not exists is_automation        boolean,
  add column if not exists fraud_score          integer,
  add column if not exists fraud_reasons        text[];

comment on column visitor_logs.touch_count is 'Pointer/touch events during the visit (capped at 999)';
comment on column visitor_logs.scroll_pct is 'Max scroll depth reached, 0-100';
comment on column visitor_logs.first_interaction_ms is 'ms from page load to first touch/scroll/key; null = no interaction';
comment on column visitor_logs.low_engagement is 'true when the visit lasted <10s with zero touches and no contact';
comment on column visitor_logs.is_automation is 'navigator.webdriver was true (automated browser)';
comment on column visitor_logs.fraud_score is 'Risk score 0-100 computed at entry from the same device''s paid-click history (cookie + fingerprint), never from shared IP alone';
comment on column visitor_logs.fraud_reasons is 'Human-readable (Hebrew) reasons behind fraud_score';

create index if not exists idx_visitor_logs_visitor_id_created
  on visitor_logs (visitor_id, created_at desc);

create index if not exists idx_visitor_logs_fraud_score
  on visitor_logs (created_at desc)
  where fraud_score is not null;
