-- Ana sayfa hero arka plan görselleri (bir kez çalıştır)

alter table public.site_settings
  add column if not exists hero_bg_1 text,
  add column if not exists hero_bg_2 text,
  add column if not exists hero_bg_3 text,
  add column if not exists hero_video text;
