-- Supabase SQL Editor'da bir kez çalıştır.
-- Satıldı işaretli ürünler de vitrinde görünsün.

drop policy if exists "products_select" on public.products;
create policy "products_select" on public.products for select using (
  status in ('published', 'sold')
  or seller_id = auth.uid()
  or public.is_admin()
);

drop policy if exists "product_images_select" on public.product_images;
create policy "product_images_select" on public.product_images for select using (
  exists (
    select 1 from public.products p
    where p.id = product_id
      and (p.status in ('published', 'sold') or p.seller_id = auth.uid() or public.is_admin())
  )
);
