-- Tüm sayfa hero medyası (fotoğraf + video)
-- Supabase SQL Editor'da bir kez çalıştır.

alter table public.site_settings
  add column if not exists price_compare_bg_1 text,
  add column if not exists price_compare_bg_2 text,
  add column if not exists price_compare_bg_3 text,
  add column if not exists price_compare_video text,
  add column if not exists specs_compare_bg_1 text,
  add column if not exists specs_compare_bg_2 text,
  add column if not exists specs_compare_bg_3 text,
  add column if not exists specs_compare_video text,
  add column if not exists guide_hero text,
  add column if not exists guide_hero_2 text,
  add column if not exists guide_hero_3 text,
  add column if not exists guide_hero_video text,
  add column if not exists news_hero_bg_1 text,
  add column if not exists news_hero_video text,
  add column if not exists sell_hero_bg_1 text,
  add column if not exists sell_hero_bg_2 text,
  add column if not exists sell_hero_bg_3 text,
  add column if not exists sell_hero_video text,
  add column if not exists request_hero_bg_1 text,
  add column if not exists request_hero_bg_2 text,
  add column if not exists request_hero_bg_3 text,
  add column if not exists request_hero_video text;

-- product-images bucket'ında public okuma olduğundan emin ol.
