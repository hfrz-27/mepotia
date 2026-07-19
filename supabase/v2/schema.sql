-- Mepotia 2.0 — fresh Supabase schema
-- Yeni/boş bir Supabase projesinin SQL Editor ekranında çalıştırılmak üzere tasarlanmıştır.
-- Canlı veritabanında doğrudan çalıştırmayın; önce yedek ve staging doğrulaması yapın.

begin;

create extension if not exists pgcrypto;

create type public.user_role as enum ('customer', 'editor', 'admin');
create type public.product_status as enum ('draft', 'review', 'published', 'reserved', 'sold', 'archived');
create type public.product_condition as enum ('new', 'like_new', 'excellent', 'good', 'fair');
create type public.request_status as enum ('new', 'contacted', 'accepted', 'rejected', 'closed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  whatsapp text,
  city text,
  role public.user_role not null default 'customer',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  image_url text,
  icon text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 3 and 140),
  slug text unique,
  description text not null default '',
  price numeric(12,2) not null check (price >= 0),
  original_price numeric(12,2) check (original_price is null or original_price >= price),
  status public.product_status not null default 'draft',
  condition public.product_condition not null default 'good',
  brand text,
  model text,
  specs jsonb not null default '{}'::jsonb,
  city text,
  district text,
  stock integer not null default 1 check (stock >= 0),
  views integer not null default 0 check (views >= 0),
  is_featured boolean not null default false,
  is_premium boolean not null default false,
  is_discount boolean not null default false,
  negotiable boolean not null default true,
  category_id uuid references public.categories(id) on delete set null,
  subcategory_id uuid references public.subcategories(id) on delete set null,
  seller_id uuid references public.profiles(id) on delete set null,
  source text not null default 'admin' check (source in ('admin', 'trade_in')),
  phone text,
  whatsapp text,
  admin_note text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique(product_id, sort_order)
);

create table public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table public.sell_offers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  offer_type text not null default 'sell' check (offer_type in ('sell', 'trade')),
  full_name text not null,
  phone text not null,
  email text,
  city text,
  category text,
  brand text,
  model text,
  condition text,
  expected_price numeric(12,2) check (expected_price is null or expected_price >= 0),
  message text,
  image_urls text[] not null default '{}',
  status public.request_status not null default 'new',
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  phone text not null,
  email text,
  category text,
  brand text,
  model text not null,
  budget_min numeric(12,2) check (budget_min is null or budget_min >= 0),
  budget_max numeric(12,2) check (budget_max is null or budget_max >= budget_min),
  message text,
  status public.request_status not null default 'new',
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.customer_reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null check (char_length(trim(author_name)) between 2 and 80),
  stars integer not null check (stars between 1 and 5),
  body text not null check (char_length(trim(body)) between 10 and 600),
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.site_feedback (
  id uuid primary key default gen_random_uuid(),
  rating integer check (rating between 1 and 5),
  message text,
  page_path text,
  status public.request_status not null default 'new',
  created_at timestamptz not null default now()
);

create table public.tech_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '',
  cover_url text,
  source_name text,
  source_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_featured boolean not null default false,
  featured_order integer,
  is_trending boolean not null default false,
  trending_order integer,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id integer primary key default 1 check (id = 1),
  site_name text not null default 'Mepotia',
  phone text,
  whatsapp text,
  email text,
  address text,
  instagram_url text,
  seo_title text,
  seo_description text,
  appearance jsonb not null default '{}'::jsonb,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index products_public_feed_idx on public.products(status, published_at desc);
create index products_category_idx on public.products(category_id, status, created_at desc);
create index products_search_idx on public.products using gin (to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(brand,'') || ' ' || coalesce(model,'')));
create index product_images_product_idx on public.product_images(product_id, sort_order);
create index sell_offers_status_idx on public.sell_offers(status, created_at desc);
create index product_requests_status_idx on public.product_requests(status, created_at desc);
create index tech_posts_public_idx on public.tech_posts(status, published_at desc);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();
create trigger categories_touch before update on public.categories for each row execute function public.touch_updated_at();
create trigger products_touch before update on public.products for each row execute function public.touch_updated_at();
create trigger sell_offers_touch before update on public.sell_offers for each row execute function public.touch_updated_at();
create trigger product_requests_touch before update on public.product_requests for each row execute function public.touch_updated_at();
create trigger tech_posts_touch before update on public.tech_posts for each row execute function public.touch_updated_at();
create trigger settings_touch before update on public.site_settings for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role in ('editor', 'admin'));
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.favorites enable row level security;
alter table public.sell_offers enable row level security;
alter table public.product_requests enable row level security;
alter table public.customer_reviews enable row level security;
alter table public.site_feedback enable row level security;
alter table public.tech_posts enable row level security;
alter table public.site_settings enable row level security;

create policy profiles_read_own on public.profiles for select using (id = auth.uid() or public.is_staff());
create policy profiles_update_own on public.profiles for update using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());

create policy categories_public_read on public.categories for select using (is_active or public.is_staff());
create policy categories_staff_write on public.categories for all using (public.is_staff()) with check (public.is_staff());
create policy subcategories_public_read on public.subcategories for select using (is_active or public.is_staff());
create policy subcategories_staff_write on public.subcategories for all using (public.is_staff()) with check (public.is_staff());

create policy products_public_read on public.products for select using (status in ('published','reserved','sold') or seller_id = auth.uid() or public.is_staff());
create policy products_staff_insert on public.products for insert with check (public.is_staff());
create policy products_staff_update on public.products for update using (public.is_staff()) with check (public.is_staff());
create policy products_admin_delete on public.products for delete using (public.is_admin());

create policy product_images_public_read on public.product_images for select using (
  exists(select 1 from public.products p where p.id = product_id and (p.status in ('published','reserved','sold') or public.is_staff()))
);
create policy product_images_staff_write on public.product_images for all using (public.is_staff()) with check (public.is_staff());

create policy favorites_own_read on public.favorites for select using (user_id = auth.uid());
create policy favorites_own_insert on public.favorites for insert with check (user_id = auth.uid());
create policy favorites_own_delete on public.favorites for delete using (user_id = auth.uid());

create policy sell_offers_public_insert on public.sell_offers for insert with check (user_id is null or user_id = auth.uid());
create policy sell_offers_own_read on public.sell_offers for select using (user_id = auth.uid() or public.is_staff());
create policy sell_offers_staff_update on public.sell_offers for update using (public.is_staff()) with check (public.is_staff());
create policy sell_offers_admin_delete on public.sell_offers for delete using (public.is_admin());

create policy product_requests_public_insert on public.product_requests for insert with check (user_id is null or user_id = auth.uid());
create policy product_requests_own_read on public.product_requests for select using (user_id = auth.uid() or public.is_staff());
create policy product_requests_staff_update on public.product_requests for update using (public.is_staff()) with check (public.is_staff());
create policy product_requests_admin_delete on public.product_requests for delete using (public.is_admin());

create policy reviews_public_read on public.customer_reviews for select using (is_approved or public.is_staff());
create policy reviews_public_insert on public.customer_reviews for insert with check (not is_approved);
create policy reviews_staff_manage on public.customer_reviews for all using (public.is_staff()) with check (public.is_staff());

create policy feedback_public_insert on public.site_feedback for insert with check (true);
create policy feedback_staff_manage on public.site_feedback for all using (public.is_staff()) with check (public.is_staff());

create policy posts_public_read on public.tech_posts for select using (status = 'published' or public.is_staff());
create policy posts_staff_write on public.tech_posts for all using (public.is_staff()) with check (public.is_staff());

create policy settings_public_read on public.site_settings for select using (true);
create policy settings_admin_write on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('product-images', 'product-images', true, 10485760, array['image/jpeg','image/png','image/webp']),
  ('sell-offers', 'sell-offers', false, 10485760, array['image/jpeg','image/png','image/webp']),
  ('site-media', 'site-media', true, 15728640, array['image/jpeg','image/png','image/webp','video/mp4'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy storage_public_media_read on storage.objects for select using (bucket_id in ('product-images','site-media'));
create policy storage_staff_media_insert on storage.objects for insert with check (bucket_id in ('product-images','site-media') and public.is_staff());
create policy storage_staff_media_update on storage.objects for update using (bucket_id in ('product-images','site-media') and public.is_staff());
create policy storage_staff_media_delete on storage.objects for delete using (bucket_id in ('product-images','site-media') and public.is_staff());
create policy storage_offer_owner_read on storage.objects for select using (bucket_id = 'sell-offers' and (owner_id = auth.uid()::text or public.is_staff()));
create policy storage_offer_public_insert on storage.objects for insert with check (bucket_id = 'sell-offers');
create policy storage_offer_admin_delete on storage.objects for delete using (bucket_id = 'sell-offers' and public.is_admin());

insert into public.site_settings (id, site_name, phone, whatsapp, email, address)
values (1, 'Mepotia', '05059574122', '905059574122', 'info@mepotia.com', 'İstanbul, Türkiye');

commit;
