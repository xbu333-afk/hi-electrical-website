-- Already applied in production on 26.10.2026 — kept here for the record.
-- Monthly invalid-click refund packages prepared for Google: prevents claiming
-- the same GCLID twice and lets the next package start where the last ended.
create table if not exists public.refund_claim_packages (
  id            bigserial primary key,
  created_at    timestamptz not null default now(),
  period_start  timestamptz not null,
  period_end    timestamptz not null,
  gclids        text[] not null default '{}',
  high_count    integer not null default 0,
  lower_count   integer not null default 0,
  est_cost_ils  numeric,
  submitted     boolean,
  submitted_at  timestamptz,
  notes         text
);

alter table public.refund_claim_packages enable row level security;
grant select, insert, update on table public.refund_claim_packages to service_role;
grant usage, select on sequence public.refund_claim_packages_id_seq to service_role;
