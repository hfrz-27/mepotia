-- Mepotia 2.0 kategori tohumu — schema.sql sonrasında çalıştırılır.
insert into public.categories (name, slug, description, image_url, sort_order) values
  ('Telefon', 'telefon', 'iPhone, Android ve seçilmiş ikinci el akıllı telefonlar.', '/brand/categories/mepotia-phone-v2.webp', 1),
  ('Bilgisayar', 'bilgisayar', 'Laptop, masaüstü, monitör ve çalışma sistemleri.', '/brand/categories/mepotia-computer-v2.webp', 2),
  ('Tablet', 'tablet', 'Günlük kullanım, eğitim ve üretkenlik için tabletler.', '/brand/categories/mepotia-accessories-v2.webp', 3),
  ('Kulaklık', 'kulaklik', 'Kablosuz, kablolu ve oyuncu kulaklıkları.', '/brand/categories/mepotia-gaming-v2.webp', 4),
  ('Kılıf & Koruma', 'kilif-koruma', 'Cihazını koruyan kılıf ve ekran çözümleri.', '/brand/categories/mepotia-accessories-v2.webp', 5),
  ('Şarj & Kablo', 'sarj-kablo', 'Adaptör, powerbank, kablo ve şarj istasyonları.', '/brand/categories/mepotia-accessories-v2.webp', 6),
  ('Aksesuar', 'aksesuar', 'Teknoloji deneyimini tamamlayan aksesuarlar.', '/brand/categories/mepotia-accessories-v2.webp', 7),
  ('Akıllı Saat', 'akilli-saat', 'Akıllı saatler, bileklikler ve kordonlar.', '/brand/categories/mepotia-accessories-v2.webp', 8),
  ('Oyun & Konsol', 'oyun-konsol', 'Konsol, kontrolcü ve oyuncu ekipmanları.', '/brand/categories/mepotia-gaming-v2.webp', 9)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order;

insert into public.subcategories (category_id, name, slug, sort_order)
select c.id, s.name, s.slug, s.sort_order
from public.categories c
join (values
  ('telefon','iPhone','iphone',1), ('telefon','Android','android',2),
  ('bilgisayar','Laptop','laptop',1), ('bilgisayar','Masaüstü','masaustu',2), ('bilgisayar','Monitör','monitor',3),
  ('tablet','iPad','ipad',1), ('tablet','Android tablet','android-tablet',2),
  ('kulaklik','Kablosuz','kablosuz-kulaklik',1), ('kulaklik','Kablolu','kablolu-kulaklik',2),
  ('kilif-koruma','Telefon kılıfı','telefon-kilifi',1), ('kilif-koruma','Ekran koruyucu','ekran-koruyucu',2),
  ('sarj-kablo','Şarj aleti','sarj-aleti',1), ('sarj-kablo','Powerbank','powerbank',2), ('sarj-kablo','Kablo & adaptör','kablo-adaptor',3),
  ('aksesuar','Stand & tutucu','stand-tutucu',1), ('aksesuar','Araç aksesuarı','arac-aksesuar',2),
  ('akilli-saat','Akıllı saat','akilli-saat-genel',1), ('akilli-saat','Kordon & aksesuar','saat-aksesuar',2),
  ('oyun-konsol','Konsol','konsol',1), ('oyun-konsol','Oyun kolu','oyun-kolu',2), ('oyun-konsol','Oyuncu ekipmanı','oyuncu-ekipmani',3)
) as s(category_slug, name, slug, sort_order) on c.slug = s.category_slug
on conflict (slug) do update set name = excluded.name, sort_order = excluded.sort_order;
