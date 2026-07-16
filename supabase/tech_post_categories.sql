-- Mevcut Mepotia kurulumları için haber kategorisi güncellemesi.
-- Supabase SQL Editor'da bir kez çalıştırın.

alter table public.tech_posts
  add column if not exists category text not null default 'Yapay Zekâ';

update public.tech_posts
set category = 'Yapay Zekâ'
where category is null or btrim(category) = '';

create index if not exists tech_posts_category_created_at_idx
  on public.tech_posts (category, created_at desc);
