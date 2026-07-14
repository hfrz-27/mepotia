-- Mepotia — tüm vitrin içeriğini sıfırla (ürün, haber, teklif, istek, yorum)
-- Supabase → SQL Editor → yapıştır → Run

truncate table
  public.favorites,
  public.product_images,
  public.products,
  public.tech_posts,
  public.sell_offers,
  public.product_requests,
  public.customer_reviews
restart identity cascade;

-- Kategoriler ve site ayarları kalır. Sadece vitrin içeriği silinir.
