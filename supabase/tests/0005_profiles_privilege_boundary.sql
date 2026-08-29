-- Run after migrations. Raises on any regression without requiring pgTAP.
do $$
declare
  authenticated_update_columns text[];
begin
  if has_table_privilege('anon', 'public.profiles', 'INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER') then
    raise exception 'anon retains a write privilege on public.profiles';
  end if;

  select coalesce(array_agg(column_name order by column_name), array[]::text[])
    into authenticated_update_columns
  from information_schema.column_privileges
  where table_schema = 'public'
    and table_name = 'profiles'
    and grantee = 'authenticated'
    and privilege_type = 'UPDATE';

  if authenticated_update_columns <> array['last_seen_at']::text[] then
    raise exception 'authenticated UPDATE columns are %, expected only last_seen_at', authenticated_update_columns;
  end if;

  if exists (
    select 1 from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'private'
      and p.proname in ('auth_is_admin', 'auth_is_member')
      and (not p.prosecdef or p.proconfig is distinct from array['search_path='])
  ) then
    raise exception 'private authorization helpers must be SECURITY DEFINER with empty search_path';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
      and policyname = 'own_profile_touch' and cmd = 'UPDATE'
  ) then
    raise exception 'own_profile_touch UPDATE policy is missing';
  end if;
end
$$;
