-- Run in Supabase SQL Editor (once)
-- Browser language for IP rotation / session fingerprinting
alter table visitor_logs
  add column if not exists browser_language text;

comment on column visitor_logs.browser_language is 'navigator.language from client browser — correlates sessions across IP changes (VPN/cellular rotation)';
