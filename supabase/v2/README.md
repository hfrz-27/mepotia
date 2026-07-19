# Mepotia 2.0 Supabase

Bu klasör yeni ve boş bir Supabase projesi için tek kaynaklı veritabanı kurulumudur. Mevcut canlı projeyi değiştirmez.

Kurulum sırası:

1. Yeni bir Supabase projesi oluştur.
2. SQL Editor içinde `schema.sql` dosyasını çalıştır.
3. Ardından `seed.sql` dosyasını çalıştır.
4. Authentication bölümünden ilk kullanıcıyı oluştur.
5. Kullanıcının UUID değeriyle aşağıdaki komutu çalıştır:

```sql
update public.profiles set role = 'admin' where id = 'KULLANICI_UUID';
```

6. Yeni projenin URL ve anon key değerlerini staging ortamına ekle.
7. Ürün ve formları staging üzerinde doğrula; canlı geçişten önce eski veriyi dışa aktar.

Şema; ürünler, kategoriler, ürün görselleri, favoriler, satış/takas teklifleri, ürün talepleri, yorumlar, geri bildirim, teknoloji haberleri, ayarlar, roller, RLS politikaları ve Storage kovalarını içerir.
