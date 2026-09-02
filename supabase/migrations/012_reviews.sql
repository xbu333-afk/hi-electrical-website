-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
--
-- Public customer reviews shown on /reviews.
-- Low ratings (1–3) are NEVER written here — they go to Pushover only.

create table if not exists reviews (
  id            uuid        primary key default gen_random_uuid(),
  name          text        not null,
  text          text        not null,
  rating        smallint    not null check (rating between 1 and 5),
  service_tags  text[]      not null default '{}',
  -- published = visible on site; hidden = soft-removed without deleting
  status        text        not null default 'published'
                check (status in ('published', 'hidden')),
  -- server-only, for rate limiting (never shown on the site)
  ip_address    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_reviews_published_created
  on reviews (created_at desc)
  where status = 'published';

create index if not exists idx_reviews_service_tags
  on reviews using gin (service_tags);

create index if not exists idx_reviews_ip_created
  on reviews (ip_address, created_at desc);

create or replace function update_updated_at_column()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_reviews_updated_at on reviews;
create trigger trg_reviews_updated_at
  before update on reviews
  for each row execute procedure update_updated_at_column();

-- RLS with no permissive policy: service_role bypasses RLS for API writes;
-- the public site reads via the server (service role) so anon cannot scrape
-- or inject rows with the public key.
alter table reviews enable row level security;
