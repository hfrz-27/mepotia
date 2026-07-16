-- Kategoriye özel teknik özellikleri (RAM, depolama, işlemci vb.) saklar.
alter table public.products add column if not exists specs jsonb not null default '{}'::jsonb;
create index if not exists products_specs_gin_idx on public.products using gin (specs);
