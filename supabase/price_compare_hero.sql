-- Fiyat karşılaştır sayfası hero arka planı (bir kez çalıştır)

alter table public.site_settings
  add column if not exists price_compare_bg_1 text,
  add column if not exists price_compare_bg_2 text,
  add column if not exists price_compare_bg_3 text,
  add column if not exists price_compare_video text;
