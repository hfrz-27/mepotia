-- Supabase SQL Editor'da bir kez çalıştır.
-- Herkes yorum yazabilsin (isim + yıldız + metin)

create table if not exists public.customer_reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null check (char_length(trim(author_name)) >= 2),
  stars int not null check (stars between 1 and 5),
  body text not null check (char_length(trim(body)) >= 10),
  created_at timestamptz not null default now()
);

create index if not exists customer_reviews_created_at_idx
  on public.customer_reviews (created_at desc);

alter table public.customer_reviews enable row level security;

drop policy if exists "customer_reviews_select" on public.customer_reviews;
create policy "customer_reviews_select" on public.customer_reviews
  for select using (true);

drop policy if exists "customer_reviews_insert" on public.customer_reviews;
create policy "customer_reviews_insert" on public.customer_reviews
  for insert with check (
    char_length(trim(author_name)) >= 2
    and char_length(trim(body)) >= 10
    and stars between 1 and 5
  );

drop policy if exists "customer_reviews_admin" on public.customer_reviews;
create policy "customer_reviews_admin" on public.customer_reviews
  for all using (public.is_admin());
