-- Haber sayfasında en fazla 5 öne çıkan haber için, Supabase SQL Editor'da bir kez çalıştırın.

alter table public.tech_posts
  add column if not exists featured_order smallint check (featured_order between 1 and 5);

alter table public.tech_posts
  add column if not exists trending_order smallint check (trending_order between 1 and 5);

update public.tech_posts
set featured_order = 1
where is_featured = true and featured_order is null;

create index if not exists tech_posts_featured_order_idx
  on public.tech_posts (featured_order asc nulls last, created_at desc);

create index if not exists tech_posts_trending_order_idx
  on public.tech_posts (trending_order asc nulls last, created_at desc);
