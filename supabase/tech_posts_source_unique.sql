-- Aynı kaynak URL ile tekrar haber eklenmesini engeller (opsiyonel)
create unique index if not exists tech_posts_source_url_unique
  on public.tech_posts (source_url)
  where source_url is not null;
