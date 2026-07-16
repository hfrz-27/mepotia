-- Supabase SQL Editor'da bir kez çalıştır.
-- Teknoloji haberleri / bilgi paylaşımı

create table if not exists public.tech_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) >= 3),
  excerpt text not null default '',
  body text not null default '',
  cover_url text,
  source_url text,
  is_featured boolean not null default false,
  featured_order smallint check (featured_order between 1 and 5),
  trending_order smallint check (trending_order between 1 and 5),
  published boolean not null default true,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tech_posts_created_at_idx
  on public.tech_posts (created_at desc);

create index if not exists tech_posts_featured_idx
  on public.tech_posts (is_featured desc, created_at desc);

create index if not exists tech_posts_featured_order_idx
  on public.tech_posts (featured_order asc nulls last, created_at desc);

create index if not exists tech_posts_trending_order_idx
  on public.tech_posts (trending_order asc nulls last, created_at desc);

alter table public.tech_posts enable row level security;

drop policy if exists "tech_posts_select" on public.tech_posts;
create policy "tech_posts_select" on public.tech_posts for select using (
  published = true or public.is_admin()
);

drop policy if exists "tech_posts_admin" on public.tech_posts;
create policy "tech_posts_admin" on public.tech_posts for all using (public.is_admin());
