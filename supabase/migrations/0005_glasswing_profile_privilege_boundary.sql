-- Glasswing 2026-08: prevent self-service privilege escalation through profiles.
-- RLS limits rows, while column grants limit the fields a matching row may change.

revoke insert, update, delete, truncate, references, trigger
  on table public.profiles from anon, authenticated;
grant update (last_seen_at) on table public.profiles to authenticated;

drop policy if exists own_profile_touch on public.profiles;
create policy own_profile_touch on public.profiles for update
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Resolve every object explicitly from an empty search_path. Replacing the
-- functions makes this safe to apply after the production hotfix and on a
-- database built only from the repository migrations.
create or replace function private.auth_is_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

create or replace function private.auth_is_member(org uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select private.auth_is_admin() or exists (
    select 1 from public.organization_users
    where organization_id = org and user_id = (select auth.uid())
  );
$$;

revoke all on function private.auth_is_admin() from public;
revoke all on function private.auth_is_member(uuid) from public;
grant usage on schema private to authenticated;
grant execute on function private.auth_is_admin() to authenticated;
grant execute on function private.auth_is_member(uuid) to authenticated;
