-- Run in Supabase SQL Editor (once)
alter table visitor_logs
  add column if not exists pages_visited jsonb not null default '[]'::jsonb;
