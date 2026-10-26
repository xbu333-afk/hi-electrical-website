-- Run in Supabase SQL Editor (once) — BEFORE deploying the matching code.

-- 1) Network intelligence per paid click (proxycheck.io)
alter table visitor_logs
  add column if not exists ip_provider text,
  add column if not exists ip_asn      text,
  add column if not exists ip_type     text,
  add column if not exists ip_flags    text[],
  add column if not exists ip_risk     integer;

comment on column visitor_logs.ip_flags is 'proxycheck.io detections that were true: vpn, proxy, tor, hosting, anonymous, compromised, scraper';

-- 2) Server-side record of every landing request with a GCLID (before any JS runs)
create table if not exists ad_click_hits (
  id              bigserial primary key,
  gclid           text not null unique,
  ip_address      text,
  user_agent      text,
  path            text,
  country         text,
  city            text,
  accept_language text,
  keyword         text,
  created_at      timestamptz not null default now()
);

comment on table ad_click_hits is 'Written by proxy.ts on every landing with ?gclid= — compared with visitor_logs to find clicks whose browser never ran the page (bots / scripted clicks)';

create index if not exists idx_ad_click_hits_created on ad_click_hits (created_at desc);

-- Only the server (service role) touches this table.
alter table ad_click_hits enable row level security;
