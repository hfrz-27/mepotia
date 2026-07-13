-- Supabase SQL Editor'da bir kez çalıştır.
-- 7 günden eski teknoloji yazılarını otomatik siler.

create or replace function public.cleanup_expired_tech_posts()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_count integer;
begin
  delete from public.tech_posts
  where created_at < now() - interval '7 days';

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

revoke all on function public.cleanup_expired_tech_posts() from public;
grant execute on function public.cleanup_expired_tech_posts() to anon, authenticated, service_role;
