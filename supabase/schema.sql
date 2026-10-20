-- =====================================================================
-- Portfolio CMS schema. Run once in Supabase: SQL Editor -> New query.
-- Everyone can READ content; only accounts listed in `admins` can WRITE.
-- =====================================================================

-- 1. Content: one row per section, stored as JSON.
create table if not exists public.content (
  key        text primary key check (key in
               ('profile','expertise','experience','administration','education','publications','references')),
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2. Admin accounts (user ids from Authentication -> Users).
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

-- 3. Helper used by every write policy. SECURITY DEFINER so it can read
--    `admins` even though that table is locked down.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- 4. Row Level Security.
alter table public.content enable row level security;
alter table public.admins  enable row level security;

drop policy if exists "content readable by everyone" on public.content;
create policy "content readable by everyone"
  on public.content for select
  to anon, authenticated
  using (true);

drop policy if exists "content insert by admin" on public.content;
create policy "content insert by admin"
  on public.content for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "content update by admin" on public.content;
create policy "content update by admin"
  on public.content for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "content delete by admin" on public.content;
create policy "content delete by admin"
  on public.content for delete
  to authenticated
  using (public.is_admin());

-- Upgrading an existing database? Run these two lines once to allow the
-- new 'administration' section:
alter table public.content drop constraint if exists content_key_check;
alter table public.content add constraint content_key_check check (key in
  ('profile','expertise','experience','administration','education','publications','references'));

-- No policies on `admins` = nobody can read or change it through the API.

-- 5. File storage for the CV and portrait (public read, admin write).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 10485760,
        array['application/pdf','image/webp','image/png','image/jpeg'])
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "media upload by admin" on storage.objects;
create policy "media upload by admin"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media update by admin" on storage.objects;
create policy "media update by admin"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media delete by admin" on storage.objects;
create policy "media delete by admin"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_admin());

-- 6. Make the professor an admin. First create his user in
--    Authentication -> Users -> Add user, then run (with his email):
--
-- insert into public.admins (user_id)
-- select id from auth.users where email = 'drmorshed@brur.ac.bd';