-- Haber sayfası hero görseli için, Supabase SQL Editor'da bir kez çalıştırın.

alter table public.site_settings
  add column if not exists news_hero_bg_1 text,
  add column if not exists news_hero_video text;
