-- Mepotia satış teklifleri
-- Supabase → SQL Editor → New query → Tümünü yapıştır → Run

-- Admin kontrolü (yoksa oluştur)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

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

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table public.sell_offers to authenticated;
grant insert on table public.sell_offers to anon;

drop policy if exists "sell_offers_public_insert" on public.sell_offers;
create policy "sell_offers_public_insert" on public.sell_offers
  for insert to anon, authenticated
  with check (true);

drop policy if exists "sell_offers_admin_select" on public.sell_offers;
create policy "sell_offers_admin_select" on public.sell_offers
  for select to authenticated
  using (public.is_admin());

drop policy if exists "sell_offers_admin_update" on public.sell_offers;
create policy "sell_offers_admin_update" on public.sell_offers
  for update to authenticated
  using (public.is_admin());

drop policy if exists "sell_offers_admin_delete" on public.sell_offers;
create policy "sell_offers_admin_delete" on public.sell_offers
  for delete to authenticated
  using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('sell-offers', 'sell-offers', true)
on conflict (id) do update set public = true;

drop policy if exists "sell_offers_public_read" on storage.objects;
create policy "sell_offers_public_read" on storage.objects
  for select
  to public
  using (bucket_id = 'sell-offers');

drop policy if exists "sell_offers_public_upload" on storage.objects;
create policy "sell_offers_public_upload" on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'sell-offers');

drop policy if exists "sell_offers_public_update" on storage.objects;
create policy "sell_offers_public_update" on storage.objects
  for update
  to anon, authenticated
  using (bucket_id = 'sell-offers');
