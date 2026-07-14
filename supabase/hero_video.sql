-- Hero video (hero_backgrounds.sql sonrası bir kez çalıştır)

alter table public.site_settings
  add column if not exists hero_video text;
