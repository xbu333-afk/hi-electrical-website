-- Run in Supabase SQL Editor (once)
-- Google Ads ValueTrack parameters (Final URL suffix / tracking template)
alter table visitor_logs
  add column if not exists keyword          text,
  add column if not exists campaign_id      text,
  add column if not exists adgroup_id       text,
  add column if not exists creative         text,
  add column if not exists vt_device        text,
  add column if not exists loc_physical_ms  text,
  add column if not exists network          text,
  add column if not exists match_type       text;

comment on column visitor_logs.keyword         is 'ValueTrack {keyword} — search term';
comment on column visitor_logs.campaign_id     is 'ValueTrack {campaignid}';
comment on column visitor_logs.adgroup_id      is 'ValueTrack {adgroupid}';
comment on column visitor_logs.creative        is 'ValueTrack {creative}';
comment on column visitor_logs.vt_device       is 'ValueTrack {device} — Google Ads device label';
comment on column visitor_logs.loc_physical_ms is 'ValueTrack {loc_physical_ms} — geo target ID';
comment on column visitor_logs.network         is 'ValueTrack {network} — g/search/d/display';
comment on column visitor_logs.match_type      is 'ValueTrack {matchtype} — e/p/b';

create index if not exists idx_visitor_logs_keyword
  on visitor_logs (keyword)
  where keyword is not null;
