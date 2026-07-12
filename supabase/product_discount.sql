-- Supabase SQL Editor'da bir kez çalıştır.
-- Ürün indirim alanları

alter table public.products
  add column if not exists is_discount boolean not null default false;

alter table public.products
  add column if not exists original_price numeric(12, 2) check (original_price >= 0);
