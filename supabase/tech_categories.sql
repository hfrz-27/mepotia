-- Mepotia — teknoloji vitrin kategorileri (telefon, bilgisayar, aksesuar…)
-- Supabase → SQL Editor → yapıştır → Run (bir kez)

-- Eski genel kategorilere bağlı ürünleri teknoloji kategorilerine taşı
update public.products
set category_id = (
  select id from public.categories where slug = 'telefon' limit 1
)
where category_id in (
  select id from public.categories
  where slug in ('elektronik', 'araba', 'motor', 'ev', 'moda', 'kitap', 'spor', 'koleksiyon', 'diger')
)
and (
  lower(coalesce(title, '')) like '%iphone%'
  or lower(coalesce(title, '')) like '%telefon%'
  or lower(coalesce(title, '')) like '%samsung%'
  or lower(coalesce(title, '')) like '%xiaomi%'
  or lower(coalesce(model, '')) like '%iphone%'
);

update public.products
set category_id = (
  select id from public.categories where slug = 'bilgisayar' limit 1
)
where category_id in (
  select id from public.categories where slug = 'elektronik'
);

update public.products
set category_id = null
where category_id in (
  select id from public.categories
  where slug in ('araba', 'motor', 'ev', 'moda', 'kitap', 'spor', 'koleksiyon', 'diger')
);

-- Eski alt kategorileri temizle
delete from public.subcategories
where category_id in (
  select id from public.categories
  where slug not in (
    'telefon', 'bilgisayar', 'tablet', 'kulaklik', 'kilif-koruma',
    'sarj-kablo', 'aksesuar', 'akilli-saat', 'oyun-konsol'
  )
);

delete from public.categories
where slug not in (
  'telefon', 'bilgisayar', 'tablet', 'kulaklik', 'kilif-koruma',
  'sarj-kablo', 'aksesuar', 'akilli-saat', 'oyun-konsol'
);

-- Teknoloji kategorileri
insert into public.categories (id, name, slug, sort_order) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01', 'Telefon', 'telefon', 1),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa02', 'Bilgisayar', 'bilgisayar', 2),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa03', 'Tablet', 'tablet', 3),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa04', 'Kulaklık', 'kulaklik', 4),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa05', 'Kılıf & Koruma', 'kilif-koruma', 5),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa06', 'Şarj & Kablo', 'sarj-kablo', 6),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa07', 'Aksesuar', 'aksesuar', 7),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa08', 'Akıllı Saat', 'akilli-saat', 8),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa09', 'Oyun & Konsol', 'oyun-konsol', 9)
on conflict (slug) do update set
  name = excluded.name,
  sort_order = excluded.sort_order;

-- Alt kategoriler
insert into public.subcategories (category_id, name, slug, sort_order)
select c.id, v.name, v.slug, v.sort_order
from public.categories c
join (
  values
    ('telefon', 'iPhone', 'iphone', 1),
    ('telefon', 'Android', 'android', 2),
    ('telefon', 'Yedek parça', 'telefon-yedek-parca', 3),
    ('bilgisayar', 'Laptop', 'laptop', 1),
    ('bilgisayar', 'Masaüstü', 'masaustu', 2),
    ('bilgisayar', 'Monitör', 'monitor', 3),
    ('tablet', 'iPad', 'ipad', 1),
    ('tablet', 'Android tablet', 'android-tablet', 2),
    ('kulaklik', 'Kablosuz', 'kablosuz-kulaklik', 1),
    ('kulaklik', 'Kablolu', 'kablolu-kulaklik', 2),
    ('kulaklik', 'Mikrofonlu', 'mikrofonlu-kulaklik', 3),
    ('kilif-koruma', 'Telefon kılıfı', 'telefon-kilifi', 1),
    ('kilif-koruma', 'Ekran koruyucu', 'ekran-koruyucu', 2),
    ('kilif-koruma', 'Tablet kılıfı', 'tablet-kilifi', 3),
    ('sarj-kablo', 'Şarj aleti', 'sarj-aleti', 1),
    ('sarj-kablo', 'Powerbank', 'powerbank', 2),
    ('sarj-kablo', 'Kablo & adaptör', 'kablo-adaptor', 3),
    ('aksesuar', 'Stand & tutucu', 'stand-tutucu', 1),
    ('aksesuar', 'Araç aksesuarı', 'arac-aksesuar', 2),
    ('aksesuar', 'Diğer aksesuar', 'diger-aksesuar', 3),
    ('akilli-saat', 'Apple Watch', 'apple-watch', 1),
    ('akilli-saat', 'Akıllı saat', 'akilli-saat-genel', 2),
    ('akilli-saat', 'Kordon & aksesuar', 'saat-aksesuar', 3),
    ('oyun-konsol', 'Konsol', 'konsol', 1),
    ('oyun-konsol', 'Oyun kolu', 'oyun-kolu', 2),
    ('oyun-konsol', 'Oyuncu ekipmanı', 'oyuncu-ekipmani', 3)
) as v(cat_slug, name, slug, sort_order) on c.slug = v.cat_slug
on conflict (slug) do update set
  name = excluded.name,
  sort_order = excluded.sort_order,
  category_id = excluded.category_id;

-- Demo ürünleri teknoloji kategorilerine bağla
update public.products
set category_id = (select id from public.categories where slug = 'telefon' limit 1)
where id = '22222222-2222-2222-2222-222222222201';

update public.products
set category_id = (select id from public.categories where slug = 'bilgisayar' limit 1)
where id = '22222222-2222-2222-2222-222222222203';

update public.products
set category_id = null
where id = '22222222-2222-2222-2222-222222222202';

update public.products
set category_id = (select id from public.categories where slug = 'aksesuar' limit 1)
where id = '22222222-2222-2222-2222-222222222204';
