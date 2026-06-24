-- Run in Supabase SQL Editor (once)
-- Country code for geographic targeting violation detection
alter table visitor_logs
  add column if not exists country text;

comment on column visitor_logs.country is 'ISO 3166-1 alpha-2 country code from x-vercel-ip-country header — detects paid clicks outside the Israel-only campaign targeting';

create index if not exists idx_visitor_logs_country
  on visitor_logs (country)
  where country is not null;
