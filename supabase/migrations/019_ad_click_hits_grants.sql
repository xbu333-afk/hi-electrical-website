-- Run in Supabase SQL Editor (once). Already applied in production on 26.10.2026.
-- Tables created by SQL migrations don't automatically grant access to the
-- service_role on this project — without this the server capture fails with
-- "permission denied for table ad_click_hits".
grant select, insert, update, delete on table public.ad_click_hits to service_role;
grant usage, select on sequence public.ad_click_hits_id_seq to service_role;
