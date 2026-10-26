-- Run in Supabase SQL Editor (once) — BEFORE deploying the matching code.
alter table visitor_logs
  add column if not exists fraud_reasons_en text[];

comment on column visitor_logs.fraud_reasons_en is 'English version of fraud_reasons (same order) — for the report submitted to Google';
