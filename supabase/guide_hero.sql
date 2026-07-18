-- Tüm kategori ve ürün rehberlerinde kullanılacak tek büyük görsel.
-- Supabase SQL Editor'da bir kez çalıştırın.

alter table public.site_settings
  add column if not exists guide_hero text;
