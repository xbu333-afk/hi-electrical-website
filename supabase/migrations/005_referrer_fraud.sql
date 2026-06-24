-- Run in Supabase SQL Editor (once)
-- user_agent may already exist from migration 004; referrer is new.
alter table visitor_logs
  add column if not exists user_agent text,
  add column if not exists referrer  text;

comment on column visitor_logs.user_agent is 'Raw User-Agent header from the enter request';
comment on column visitor_logs.referrer  is 'HTTP Referer header on landing (Google Ads click source)';

-- Speed up fraud queries: gclid rows by time + IP grouping
create index if not exists idx_visitor_logs_gclid_created
  on visitor_logs (created_at desc)
  where gclid is not null;

create index if not exists idx_visitor_logs_ip_gclid
  on visitor_logs (ip_address, created_at desc)
  where gclid is not null;
