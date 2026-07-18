-- Ürün detaylarındaki telefon ve bilgisayar rehberleri için büyük görseller.
-- Supabase SQL Editor'da bir kez çalıştırın.

alter table public.site_settings
  add column if not exists phone_guide_hero text,
  add column if not exists computer_guide_hero text;
