-- Run in Supabase SQL Editor (once)
-- Device Fingerprint Hash: hardware-derived identifier that persists across
-- incognito sessions and cookie/localStorage clearing (canvas + WebGL + screen signals)
alter table visitor_logs
  add column if not exists device_fingerprint text;

comment on column visitor_logs.device_fingerprint is 'SHA-256 (first 32 hex chars) of canvas+WebGL+screen+timezone signals — stable across incognito and cookie clearing, used to identify the same physical device regardless of IP rotation';

create index if not exists idx_visitor_logs_device_fingerprint
  on visitor_logs (device_fingerprint)
  where device_fingerprint is not null;
