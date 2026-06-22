-- Run in Supabase SQL Editor (once)
alter table visitor_logs
  add column if not exists gclid      text,
  add column if not exists user_agent text;

-- Index for fast visitor_id lookups (getVisitorHistory)
create index if not exists idx_visitor_logs_visitor_id
  on visitor_logs (visitor_id, created_at desc);

comment on column visitor_logs.gclid      is 'Google Click ID extracted from ?gclid= URL param on landing';
comment on column visitor_logs.user_agent is 'Raw User-Agent header from the enter request';
