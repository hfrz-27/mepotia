alter table public.site_settings
  add column if not exists content jsonb not null default '{}'::jsonb;
