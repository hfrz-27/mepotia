-- Haber sayfasındaki büyük kartı yönetmek için, Supabase SQL Editor'da bir kez çalıştırın.

alter table public.tech_posts
  add column if not exists is_featured boolean not null default false;

create index if not exists tech_posts_featured_idx
  on public.tech_posts (is_featured desc, created_at desc);
