-- Ana sayfa 3 koleksiyon: senin seçtiğin ürünler
-- Supabase SQL Editor'da bir kez çalıştır.

alter table public.products
  add column if not exists home_collection text
    check (home_collection is null or home_collection in ('featured', 'curated', 'popular'));

alter table public.products
  add column if not exists home_collection_order smallint
    check (home_collection_order is null or home_collection_order between 1 and 24);

-- Eski "Öne çıkan" bayrağını ilk koleksiyona taşı
update public.products
set home_collection = 'featured'
where is_featured = true
  and (home_collection is null or home_collection = '');

create index if not exists products_home_collection_idx
  on public.products (home_collection, home_collection_order asc nulls last, created_at desc)
  where home_collection is not null;
