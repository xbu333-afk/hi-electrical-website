-- Run in Supabase SQL Editor (once)
-- Enforces one row per GCLID; required for race-safe dedup with insertVisitorLog retry.

-- 1) Remove historical duplicates — keep the earliest row per GCLID
DELETE FROM visitor_logs a
USING visitor_logs b
WHERE a.gclid IS NOT NULL
  AND a.gclid = b.gclid
  AND a.id > b.id;

-- 2) Partial unique index (multiple NULL gclids allowed)
CREATE UNIQUE INDEX IF NOT EXISTS idx_visitor_logs_gclid_unique
  ON visitor_logs (gclid)
  WHERE gclid IS NOT NULL;
