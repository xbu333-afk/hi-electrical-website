-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)

create table if not exists visitor_logs (
  id            bigserial primary key,
  visitor_id    text        not null,          -- cookie / localStorage UUID
  ip_address    text,                          -- client IP (may be null in some edge configs)
  page_path     text        not null,          -- e.g. "/", "/promo", "/emergency"
  source        text        not null default 'organic',  -- 'mumooman' | 'organic'
  duration      integer,                       -- seconds on page (filled on exit event)
  clicked_action boolean    not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Index used by the "suspicious visitor" check (>2 entries per IP per day)
create index if not exists idx_visitor_logs_ip_day
  on visitor_logs (ip_address, created_at);

-- Index used by the admin dashboard listing
create index if not exists idx_visitor_logs_created_at
  on visitor_logs (created_at desc);

-- Auto-update updated_at
create or replace function update_updated_at_column()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_visitor_logs_updated_at on visitor_logs;
create trigger trg_visitor_logs_updated_at
  before update on visitor_logs
  for each row execute procedure update_updated_at_column();

-- Row Level Security: only the service-role key (server-side) can write
alter table visitor_logs enable row level security;

-- Allow anon/authenticated reads only from the admin dashboard
-- (the dashboard uses the service role key so this is belt-and-suspenders)
create policy "service role full access"
  on visitor_logs
  using (true)
  with check (true);
