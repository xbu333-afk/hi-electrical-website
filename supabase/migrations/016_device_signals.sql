-- Run in Supabase SQL Editor (once) — BEFORE deploying the matching code.
alter table visitor_logs
  add column if not exists device_fingerprint_v2 text,
  add column if not exists device_hint           text;

comment on column visitor_logs.device_fingerprint_v2 is 'Richer device hash (adds audio, fonts, memory, touch points, colour gamut) — fewer collisions; not trusted alone on iPhones';
comment on column visitor_logs.device_hint is 'Lite hash of signals browsers keep stable in incognito (screen, DPR, tz, language, platform, cores, touch, GPU). Same hint + same IP within 60 min ≈ same device';

create index if not exists idx_visitor_logs_fp_v2
  on visitor_logs (device_fingerprint_v2) where device_fingerprint_v2 is not null;
create index if not exists idx_visitor_logs_hint_ip
  on visitor_logs (device_hint, ip_address, created_at desc) where device_hint is not null;
