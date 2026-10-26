-- Run in Supabase SQL Editor (once) — BEFORE deploying the matching code.
-- Second, server-set (HttpOnly) first-party device cookie. Unlike the JS cookie,
-- iOS Safari does not cap it at 7 days, so repeat clicks are still recognised.
alter table visitor_logs
  add column if not exists device_cookie text;

comment on column visitor_logs.device_cookie is 'Server-set HttpOnly first-party cookie (hi_dev) — second device identifier, survives iOS 7-day JS-cookie cap';

create index if not exists idx_visitor_logs_device_cookie
  on visitor_logs (device_cookie)
  where device_cookie is not null;
