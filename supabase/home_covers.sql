-- Ana sayfa kapak görselleri (admin panelden yüklenir)
-- Supabase SQL Editor'da bir kez çalıştır.

alter table public.site_settings
  add column if not exists home_products_cover text,
  add column if not exists home_featured_cover text,
  add column if not exists home_curated_cover text,
  add column if not exists home_popular_cover text,
  add column if not exists home_news_cover text,
  add column if not exists home_value_cover text;
