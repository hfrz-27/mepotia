-- Şikayet, öneri ve memnuniyet anketleri (bir kez çalıştır)

create table if not exists public.site_feedback (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('satisfaction', 'problem', 'suggestion')),
  rating int check (rating is null or rating between 1 and 5),
  message text not null check (char_length(trim(message)) >= 5),
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists site_feedback_created_at_idx
  on public.site_feedback (created_at desc);

alter table public.site_feedback enable row level security;

grant insert on table public.site_feedback to anon, authenticated;
grant select, update, delete on table public.site_feedback to authenticated;

drop policy if exists "site_feedback_public_insert" on public.site_feedback;
create policy "site_feedback_public_insert" on public.site_feedback
  for insert to anon, authenticated
  with check (
    category in ('satisfaction', 'problem', 'suggestion')
    and char_length(trim(message)) >= 5
  );

drop policy if exists "site_feedback_admin" on public.site_feedback;
create policy "site_feedback_admin" on public.site_feedback
  for all to authenticated
  using (public.is_admin());
