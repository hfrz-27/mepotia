-- Müşteri satış teklifleri (bir kez Supabase SQL Editor'da çalıştır)

create table if not exists public.sell_offers (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null,
  phone text not null,
  title text not null,
  brand text,
  model text,
  condition text not null default 'used' check (condition in ('new', 'used')),
  price numeric(12, 2),
  city text,
  description text not null default '',
  image_urls text[] not null default '{}',
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'accepted', 'rejected', 'done')),
  admin_note text,
  created_at timestamptz not null default now()
);

alter table public.sell_offers enable row level security;

drop policy if exists "sell_offers_public_insert" on public.sell_offers;
create policy "sell_offers_public_insert" on public.sell_offers
  for insert with check (true);

drop policy if exists "sell_offers_admin_select" on public.sell_offers;
create policy "sell_offers_admin_select" on public.sell_offers
  for select using (public.is_admin());

drop policy if exists "sell_offers_admin_update" on public.sell_offers;
create policy "sell_offers_admin_update" on public.sell_offers
  for update using (public.is_admin());

drop policy if exists "sell_offers_admin_delete" on public.sell_offers;
create policy "sell_offers_admin_delete" on public.sell_offers
  for delete using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('sell-offers', 'sell-offers', true)
on conflict (id) do nothing;

drop policy if exists "sell_offers_public_read" on storage.objects;
create policy "sell_offers_public_read" on storage.objects
  for select using (bucket_id = 'sell-offers');

drop policy if exists "sell_offers_public_upload" on storage.objects;
create policy "sell_offers_public_upload" on storage.objects
  for insert with check (bucket_id = 'sell-offers');
