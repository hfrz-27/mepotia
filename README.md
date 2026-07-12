# Mepotia Marketplace MVP
Next.js 15 + Supabase ikinci el marketplace.
## Kurulum

1. `npm install`
2. 
3. `.env.local` dosyasına ekle:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Supabase SQL Editor’de [`supabase/schema.sql`](supabase/schema.sql) çalıştır.
4. Auth kullanıcısı oluştur (Kayıt Ol), sonra SQL ile admin yap:

```sql
update public.profiles set role = 'admin' where id = 'USER_UUID';
```

5. `npm run dev` → http://localhost:3000

## Özellikler (MVP)

- Ana sayfa: slider, kategoriler, son/öne çıkan/popüler ürünler, istatistik, kampanya
- Mega menü, arama/filtre, kategori, ürün detay, WhatsApp
- İlan Ver → `pending` → Admin onay/red
- Admin: dashboard, ürün ekle (direkt yayın), premium/öne çıkar
- Auth: giriş/kayıt, panel, favoriler


