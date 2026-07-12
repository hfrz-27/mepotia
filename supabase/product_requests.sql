-- Ürün istekleri (bir kez Supabase SQL Editor'da çalıştır)

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

create table if not exists public.product_requests (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  title text not null,
  price_min numeric(12, 2),
  price_max numeric(12, 2),
  description text not null default '',
  status text not null default 'new'
    check (status in ('new', 'done', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.product_requests enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.product_requests to anon, authenticated;
grant select, update, delete on table public.product_requests to authenticated;

drop policy if exists "product_requests_public_insert" on public.product_requests;
create policy "product_requests_public_insert" on public.product_requests
  for insert to anon, authenticated
  with check (true);

drop policy if exists "product_requests_admin_select" on public.product_requests;
create policy "product_requests_admin_select" on public.product_requests
  for select to authenticated
  using (public.is_admin());

drop policy if exists "product_requests_admin_update" on public.product_requests;
create policy "product_requests_admin_update" on public.product_requests
  for update to authenticated
  using (public.is_admin());

drop policy if exists "product_requests_admin_delete" on public.product_requests;
create policy "product_requests_admin_delete" on public.product_requests
  for delete to authenticated
  using (public.is_admin());

-- Hız: görüntülenme sayacı tek sorguda
create or replace function public.increment_product_views(product_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.products
  set views = coalesce(views, 0) + 1
  where id = product_id;
$$;

grant execute on function public.increment_product_views(uuid) to anon, authenticated;
