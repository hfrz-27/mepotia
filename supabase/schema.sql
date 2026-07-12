-- NOTE: Mepotia kişisel vitrin.
-- Ürün paylaşımı yalnızca profiles.role = 'admin' kullanıcısı tarafından yapılır.
-- Public kayıt kapalıdır (/kayit -> /giris).
-- İlk kullanıcıyı oluşturduktan sonra:
--   update public.profiles set role = 'admin' where id = 'USER_UUID';


create extension if not exists "pgcrypto";

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  whatsapp text,
  city text,
  role text not null default 'user' check (role in ('user', 'admin')),
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  icon text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  price numeric(12, 2) not null check (price >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'published', 'rejected', 'sold', 'removed')),
  condition text not null default 'used' check (condition in ('new', 'used')),
  brand text,
  model text,
  city text,
  district text,
  views int not null default 0,
  is_premium boolean not null default false,
  is_featured boolean not null default false,
  is_discount boolean not null default false,
  original_price numeric(12, 2) check (original_price >= 0),
  negotiable boolean not null default true,
  seller_id uuid references public.profiles(id) on delete set null,
  source text not null default 'seller' check (source in ('admin', 'seller')),
  category_id uuid references public.categories(id) on delete set null,
  subcategory_id uuid references public.subcategories(id) on delete set null,
  phone text,
  whatsapp text,
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  site_name text default 'Mepotia',
  phone text,
  whatsapp text,
  email text,
  address text,
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists products_status_idx on public.products(status);
create index if not exists products_category_idx on public.products(category_id);
create index if not exists products_created_idx on public.products(created_at desc);
create index if not exists products_views_idx on public.products(views desc);

-- Auto profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'user'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: is admin
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.favorites enable row level security;
alter table public.site_settings enable row level security;

-- Profiles policies
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles for select using (true);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id or public.is_admin());

-- Categories public read, admin write
drop policy if exists "categories_select" on public.categories;
create policy "categories_select" on public.categories for select using (true);
drop policy if exists "categories_admin" on public.categories;
create policy "categories_admin" on public.categories for all using (public.is_admin());

drop policy if exists "subcategories_select" on public.subcategories;
create policy "subcategories_select" on public.subcategories for select using (true);
drop policy if exists "subcategories_admin" on public.subcategories;
create policy "subcategories_admin" on public.subcategories for all using (public.is_admin());

-- Products
drop policy if exists "products_select" on public.products;
create policy "products_select" on public.products for select using (
  status in ('published', 'sold')
  or seller_id = auth.uid()
  or public.is_admin()
);

drop policy if exists "products_insert" on public.products;
create policy "products_insert" on public.products for insert with check (
  (auth.uid() = seller_id and source = 'seller')
  or public.is_admin()
);

drop policy if exists "products_update" on public.products;
create policy "products_update" on public.products for update using (
  seller_id = auth.uid() or public.is_admin()
);

drop policy if exists "products_delete" on public.products;
create policy "products_delete" on public.products for delete using (
  seller_id = auth.uid() or public.is_admin()
);

-- Images
drop policy if exists "product_images_select" on public.product_images;
create policy "product_images_select" on public.product_images for select using (
  exists (
    select 1 from public.products p
    where p.id = product_id
      and (p.status in ('published', 'sold') or p.seller_id = auth.uid() or public.is_admin())
  )
);

drop policy if exists "product_images_write" on public.product_images;
create policy "product_images_write" on public.product_images for all using (
  public.is_admin()
  or exists (
    select 1 from public.products p
    where p.id = product_id and p.seller_id = auth.uid()
  )
);

-- Favorites
drop policy if exists "favorites_select" on public.favorites;
create policy "favorites_select" on public.favorites for select using (auth.uid() = user_id);

drop policy if exists "favorites_insert" on public.favorites;
create policy "favorites_insert" on public.favorites for insert with check (auth.uid() = user_id);

drop policy if exists "favorites_delete" on public.favorites;
create policy "favorites_delete" on public.favorites for delete using (auth.uid() = user_id);

-- Settings
drop policy if exists "settings_select" on public.site_settings;
create policy "settings_select" on public.site_settings for select using (true);
drop policy if exists "settings_admin" on public.site_settings;
create policy "settings_admin" on public.site_settings for all using (public.is_admin());

-- Storage bucket for product images (run in SQL; bucket may also be created in dashboard)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "product_images_auth_upload" on storage.objects;
create policy "product_images_auth_upload" on storage.objects
  for insert with check (
    bucket_id = 'product-images' and auth.role() = 'authenticated'
  );

drop policy if exists "product_images_auth_update" on storage.objects;
create policy "product_images_auth_update" on storage.objects
  for update using (
    bucket_id = 'product-images' and auth.role() = 'authenticated'
  );

drop policy if exists "product_images_auth_delete" on storage.objects;
create policy "product_images_auth_delete" on storage.objects
  for delete using (
    bucket_id = 'product-images' and (auth.role() = 'authenticated' or public.is_admin())
  );

-- Seed settings
insert into public.site_settings (id, site_name, phone, whatsapp, email, address)
values (1, 'Mepotia', '05300000000', '905300000000', 'info@mepotia.com', 'İstanbul, Türkiye')
on conflict (id) do nothing;

-- Seed categories
insert into public.categories (id, name, slug, sort_order) values
  ('11111111-1111-1111-1111-111111111101', 'Elektronik', 'elektronik', 1),
  ('11111111-1111-1111-1111-111111111102', 'Araba', 'araba', 2),
  ('11111111-1111-1111-1111-111111111103', 'Motor', 'motor', 3),
  ('11111111-1111-1111-1111-111111111104', 'Ev', 'ev', 4),
  ('11111111-1111-1111-1111-111111111105', 'Moda', 'moda', 5),
  ('11111111-1111-1111-1111-111111111106', 'Kitap', 'kitap', 6),
  ('11111111-1111-1111-1111-111111111107', 'Spor', 'spor', 7),
  ('11111111-1111-1111-1111-111111111108', 'Koleksiyon', 'koleksiyon', 8),
  ('11111111-1111-1111-1111-111111111109', 'Diğer', 'diger', 9)
on conflict (slug) do nothing;

insert into public.subcategories (category_id, name, slug, sort_order) values
  ('11111111-1111-1111-1111-111111111101', 'Telefon', 'telefon', 1),
  ('11111111-1111-1111-1111-111111111101', 'Bilgisayar', 'bilgisayar', 2),
  ('11111111-1111-1111-1111-111111111101', 'Tablet', 'tablet', 3),
  ('11111111-1111-1111-1111-111111111101', 'Oyuncu Ekipmanları', 'oyuncu-ekipmanlari', 4),
  ('11111111-1111-1111-1111-111111111104', 'Mobilya', 'mobilya', 1),
  ('11111111-1111-1111-1111-111111111104', 'Beyaz Eşya', 'beyaz-esya', 2),
  ('11111111-1111-1111-1111-111111111105', 'Ayakkabı', 'ayakkabi', 1),
  ('11111111-1111-1111-1111-111111111105', 'Saat', 'saat', 2),
  ('11111111-1111-1111-1111-111111111105', 'Çanta', 'canta', 3)
on conflict (slug) do nothing;

-- Sample published products (no seller required for demo)
insert into public.products (
  id, title, description, price, status, condition, brand, model, city, district,
  views, is_premium, is_featured, source, category_id, phone, whatsapp
) values
(
  '22222222-2222-2222-2222-222222222201',
  'iPhone 15 Pro 256GB',
  'Kutulu, garantili, çok temiz kullanım. Adaptör dahil.',
  48750, 'published', 'used', 'Apple', 'iPhone 15 Pro', 'İzmir', 'Konak',
  1280, true, true, 'admin',
  '11111111-1111-1111-1111-111111111101', '05301112233', '905301112233'
),
(
  '22222222-2222-2222-2222-222222222202',
  '2022 Model Sedan — Az Km',
  'Bakımlı, boyasız, düşük kilometreli sedan.',
  1245000, 'published', 'used', 'Toyota', 'Corolla', 'İzmir', 'Bornova',
  890, false, true, 'admin',
  '11111111-1111-1111-1111-111111111102', '05304445566', '905304445566'
),
(
  '22222222-2222-2222-2222-222222222203',
  'MacBook Pro 14" M3',
  'Profesyonel kullanım için ideal. Garantisi devam ediyor.',
  62500, 'published', 'used', 'Apple', 'MacBook Pro', 'Ankara', 'Çankaya',
  2100, true, false, 'admin',
  '11111111-1111-1111-1111-111111111101', '05307778899', '905307778899'
),
(
  '22222222-2222-2222-2222-222222222204',
  'İskandinav Koltuk Takımı',
  'Az kullanılmış, lekesiz, modern tasarım.',
  28900, 'published', 'used', null, null, 'Bursa', 'Nilüfer',
  340, false, false, 'admin',
  '11111111-1111-1111-1111-111111111104', '05301234567', '905301234567'
)
on conflict (id) do nothing;

insert into public.product_images (product_id, url, sort_order) values
  ('22222222-2222-2222-2222-222222222201', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80', 0),
  ('22222222-2222-2222-2222-222222222202', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80', 0),
  ('22222222-2222-2222-2222-222222222203', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80', 0),
  ('22222222-2222-2222-2222-222222222204', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80', 0)
on conflict do nothing;
