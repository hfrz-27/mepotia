-- Ana sayfa önizlemesi için örnek yorumlar
insert into public.customer_reviews (author_name, stars, body) values
  ('Ahmet K.', 5, 'Ürün tam tarif edildiği gibiydi. Hızlı iletişim, güvenilir satıcı.'),
  ('Elif Y.', 5, 'İkinci el alışverişte en temiz deneyim. Fiyat şeffaf, süreç net.'),
  ('Murat D.', 4, 'MacBook''u kontrol ederek aldım. Paketleme özenli, memnun kaldım.'),
  ('Zeynep A.', 5, 'WhatsApp''tan yazdım, aynı gün dönüş geldi. Güvenle alışveriş.'),
  ('Can T.', 5, 'Ürün fotoğrafları gerçek, fiyat piyasaya göre çok iyi. Tavsiye ederim.')
on conflict do nothing;
