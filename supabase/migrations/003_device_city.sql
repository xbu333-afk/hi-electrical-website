-- Run in Supabase SQL Editor (once)
alter table visitor_logs
  add column if not exists device text,
  add column if not exists city text;

comment on column visitor_logs.device is 'mobile | desktop — derived from User-Agent on enter';
comment on column visitor_logs.city is 'Estimated city from Vercel x-vercel-ip-city header';
