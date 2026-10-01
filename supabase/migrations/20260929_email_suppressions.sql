-- Keeps email opt-outs even when an unsubscribed subscriber row is removed from
-- the visible mailing-list table. This prevents a later CSV import from silently
-- resubscribing someone who already opted out.
create table if not exists public.email_suppressions (
  email text primary key,
  reason text not null default 'unsubscribe',
  unsubscribed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.email_suppressions enable row level security;

-- No browser policies are intentionally created. Only trusted Edge Functions
-- using the service-role key should read or modify suppression records.
create index if not exists email_suppressions_unsubscribed_at_idx
  on public.email_suppressions (unsubscribed_at desc);
