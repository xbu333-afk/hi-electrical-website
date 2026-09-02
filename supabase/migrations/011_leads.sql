-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
--
-- Leads submitted through the /get-quote form.
--
-- Deliberately separate from visitor_logs: that table holds one row per browsing
-- *session*, this one holds one row per person who asked to be called back. The
-- attribution columns are duplicated rather than joined so a lead stays readable
-- even if its session row is later pruned.

create table if not exists leads (
  id               bigserial primary key,

  -- What the visitor typed
  name             text        not null,
  phone            text        not null,       -- normalized E.164, e.g. +972501234567
  phone_raw        text,                       -- exactly as typed, for manual dialling
  city             text,
  issue            text,

  -- Which session / campaign produced this lead
  visitor_id       text,
  -- uuid, not bigint: visitor_logs.id is a uuid in the live database even though
  -- 001_visitor_logs.sql declares bigserial. The live schema is the source of truth.
  visitor_log_id   uuid        references visitor_logs (id) on delete set null,
  gclid            text,                       -- no unique index: one ad click may legitimately produce a lead
  source           text        not null default 'organic',   -- 'mumooman' | 'organic'
  page_path        text,

  -- Request context, captured server-side only (never trusted from the client)
  ip_address       text,
  user_agent       text,
  referrer         text,
  device           text,                       -- 'mobile' | 'desktop'
  geo_city         text,                       -- x-vercel-ip-city; not the city the visitor typed
  country          text,

  -- Google Ads ValueTrack
  keyword          text,
  campaign_id      text,
  adgroup_id       text,
  creative         text,
  vt_device        text,
  loc_physical_ms  text,
  network          text,
  match_type       text,

  -- Exact text handed to WhatsApp, so the DB matches what was actually sent
  whatsapp_message text,

  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Admin listing, newest first
create index if not exists idx_leads_created_at
  on leads (created_at desc);

-- Per-IP rate limiting on submit
create index if not exists idx_leads_ip_created_at
  on leads (ip_address, created_at desc);

-- Joining a lead back to the ad click that paid for it
create index if not exists idx_leads_gclid
  on leads (gclid)
  where gclid is not null;

create index if not exists idx_leads_visitor_id
  on leads (visitor_id);

-- Already defined by 001_visitor_logs.sql; repeated so this file can run standalone.
create or replace function update_updated_at_column()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_leads_updated_at on leads;
create trigger trg_leads_updated_at
  before update on leads
  for each row execute procedure update_updated_at_column();

-- Row Level Security with NO permissive policy.
--
-- This is intentionally stricter than visitor_logs: the service_role key bypasses
-- RLS entirely, so the API route still writes normally, while anon/authenticated
-- callers are denied outright. A `using (true)` policy like the one on
-- visitor_logs would expose customer names and phone numbers to anyone holding
-- the public anon key.
alter table leads enable row level security;
