-- Supabase SQL Editor'da bir kez çalıştır.
-- product_images ekleme/silme izinlerini netleştirir (admin + ilan sahibi).

drop policy if exists "product_images_write" on public.product_images;

create policy "product_images_insert" on public.product_images
  for insert
  with check (
    public.is_admin()
    or exists (
      select 1 from public.products p
      where p.id = product_id and p.seller_id = auth.uid()
    )
  );

create policy "product_images_update" on public.product_images
  for update
  using (
    public.is_admin()
    or exists (
      select 1 from public.products p
      where p.id = product_id and p.seller_id = auth.uid()
    )
  );

create policy "product_images_delete" on public.product_images
  for delete
  using (
    public.is_admin()
    or exists (
      select 1 from public.products p
      where p.id = product_id and p.seller_id = auth.uid()
    )
  );

-- Storage bucket: yalnızca adminler nesne yazabilir/değiştirebilir/silebilir.
drop policy if exists "product_images_auth_upload" on storage.objects;
create policy "product_images_auth_upload" on storage.objects
  for insert with check (
    bucket_id = 'product-images' and public.is_admin()
  );

drop policy if exists "product_images_auth_update" on storage.objects;
create policy "product_images_auth_update" on storage.objects
  for update using (
    bucket_id = 'product-images' and public.is_admin()
  ) with check (
    bucket_id = 'product-images' and public.is_admin()
  );

drop policy if exists "product_images_auth_delete" on storage.objects;
create policy "product_images_auth_delete" on storage.objects
  for delete using (
    bucket_id = 'product-images' and public.is_admin()
  );
