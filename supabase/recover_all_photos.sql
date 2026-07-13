-- Supabase SQL Editor'da bir kez çalıştır.
-- Storage'daki TÜM fotoğrafları geri bağlar + silinen ilanları yeniden oluşturur.

-- Silinen ilanlar (storage'da fotoğraf var, ürün yok)
insert into public.products (
  id, title, description, price, status, condition, source, category_id,
  seller_id, phone, whatsapp, city
) values
  ('175b1dc4-7dd1-4464-95e6-8a573d8858ba', 'Geri yüklenen ilan — düzenle', 'Otomatik geri yüklendi. Başlık ve fiyatı güncelle.', 1000, 'published', 'used', 'admin', (select id from public.categories where slug = 'elektronik'), '65a7657e-0387-4383-8399-0addaa8bc7ae', '905059574122', '905059574122', 'İstanbul'),
  ('193daf82-95f3-42f2-b55f-e2d5baa32389', 'Geri yüklenen ilan — düzenle', 'Otomatik geri yüklendi. Başlık ve fiyatı güncelle.', 1000, 'published', 'used', 'admin', (select id from public.categories where slug = 'elektronik'), '65a7657e-0387-4383-8399-0addaa8bc7ae', '905059574122', '905059574122', 'İstanbul'),
  ('7fcf7592-d3f4-4077-8a10-56b9c44bb800', 'Geri yüklenen ilan — düzenle', 'Otomatik geri yüklendi. Başlık ve fiyatı güncelle.', 1000, 'published', 'used', 'admin', (select id from public.categories where slug = 'elektronik'), '65a7657e-0387-4383-8399-0addaa8bc7ae', '905059574122', '905059574122', 'İstanbul'),
  ('aa8ba06b-272f-4ac1-8954-6d08e76e1028', 'Geri yüklenen ilan — düzenle', 'Otomatik geri yüklendi. Başlık ve fiyatı güncelle.', 1000, 'published', 'used', 'admin', (select id from public.categories where slug = 'elektronik'), '65a7657e-0387-4383-8399-0addaa8bc7ae', '905059574122', '905059574122', 'İstanbul'),
  ('d13a0ea1-d186-4341-952e-0782b14ebcf3', 'Geri yüklenen ilan — düzenle', 'Otomatik geri yüklendi. Başlık ve fiyatı güncelle.', 1000, 'published', 'used', 'admin', (select id from public.categories where slug = 'elektronik'), '65a7657e-0387-4383-8399-0addaa8bc7ae', '905059574122', '905059574122', 'İstanbul')
on conflict (id) do nothing;

-- Tüm storage fotoğrafları
insert into public.product_images (product_id, url, sort_order)
select v.product_id::uuid, v.url, v.sort_order
from (values
  ('175b1dc4-7dd1-4464-95e6-8a573d8858ba', 'https://cpdnonjbnkixtvfoadjl.supabase.co/storage/v1/object/public/product-images/65a7657e-0387-4383-8399-0addaa8bc7ae/175b1dc4-7dd1-4464-95e6-8a573d8858ba/1783897846960-23186.jpg', 0),
  ('193daf82-95f3-42f2-b55f-e2d5baa32389', 'https://cpdnonjbnkixtvfoadjl.supabase.co/storage/v1/object/public/product-images/65a7657e-0387-4383-8399-0addaa8bc7ae/193daf82-95f3-42f2-b55f-e2d5baa32389/1783898681316-23289.jpg', 0),
  ('7fcf7592-d3f4-4077-8a10-56b9c44bb800', 'https://cpdnonjbnkixtvfoadjl.supabase.co/storage/v1/object/public/product-images/65a7657e-0387-4383-8399-0addaa8bc7ae/7fcf7592-d3f4-4077-8a10-56b9c44bb800/1783898456868-23271.jpg', 0),
  ('7fcf7592-d3f4-4077-8a10-56b9c44bb800', 'https://cpdnonjbnkixtvfoadjl.supabase.co/storage/v1/object/public/product-images/65a7657e-0387-4383-8399-0addaa8bc7ae/7fcf7592-d3f4-4077-8a10-56b9c44bb800/1783898458741-23270.jpg', 1),
  ('7fcf7592-d3f4-4077-8a10-56b9c44bb800', 'https://cpdnonjbnkixtvfoadjl.supabase.co/storage/v1/object/public/product-images/65a7657e-0387-4383-8399-0addaa8bc7ae/7fcf7592-d3f4-4077-8a10-56b9c44bb800/1783898461572-23276.jpg', 2),
  ('aa8ba06b-272f-4ac1-8954-6d08e76e1028', 'https://cpdnonjbnkixtvfoadjl.supabase.co/storage/v1/object/public/product-images/65a7657e-0387-4383-8399-0addaa8bc7ae/aa8ba06b-272f-4ac1-8954-6d08e76e1028/1783898566625-23282.jpg', 0),
  ('d13a0ea1-d186-4341-952e-0782b14ebcf3', 'https://cpdnonjbnkixtvfoadjl.supabase.co/storage/v1/object/public/product-images/65a7657e-0387-4383-8399-0addaa8bc7ae/d13a0ea1-d186-4341-952e-0782b14ebcf3/1783882813699-20848.jpg', 0),
  ('57243e66-8789-4bd7-80df-0cc5f02bf3bb', 'https://cpdnonjbnkixtvfoadjl.supabase.co/storage/v1/object/public/product-images/65a7657e-0387-4383-8399-0addaa8bc7ae/57243e66-8789-4bd7-80df-0cc5f02bf3bb/1783951167539-110001191549951.jpg', 1),
  ('57243e66-8789-4bd7-80df-0cc5f02bf3bb', 'https://cpdnonjbnkixtvfoadjl.supabase.co/storage/v1/object/public/product-images/65a7657e-0387-4383-8399-0addaa8bc7ae/57243e66-8789-4bd7-80df-0cc5f02bf3bb/1783951168878-110001191549951.jpg', 2),
  ('57243e66-8789-4bd7-80df-0cc5f02bf3bb', 'https://cpdnonjbnkixtvfoadjl.supabase.co/storage/v1/object/public/product-images/65a7657e-0387-4383-8399-0addaa8bc7ae/57243e66-8789-4bd7-80df-0cc5f02bf3bb/1783951170214-110001191549951.jpg', 3)
) as v(product_id, url, sort_order)
where not exists (
  select 1 from public.product_images pi
  where pi.product_id = v.product_id::uuid and pi.url = v.url
);

select p.title, count(pi.id) as foto
from public.products p
left join public.product_images pi on pi.product_id = p.id
group by p.id, p.title
order by p.created_at desc;
