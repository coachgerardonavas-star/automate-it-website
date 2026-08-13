-- ============================================================================
-- Automate IT — Client Portal · helpers de autorización fuera de la API pública
--
-- `auth_is_admin()` y `auth_is_member()` nacieron en `public`, y PostgREST
-- expone como endpoint RPC todo lo que vive en `public`. Quedaban alcanzables
-- en `/rest/v1/rpc/auth_is_admin` sin haber iniciado sesión.
--
-- No filtraban nada — a un anónimo le devuelven `false`, que es la respuesta
-- correcta — pero una función SECURITY DEFINER no tiene por qué formar parte
-- de la superficie pública de la API. Cuanto menos haya ahí, menos hay que
-- razonar cada vez que se agrega una tabla.
--
-- Se mudan a un esquema `private`, que PostgREST no publica. Las políticas las
-- siguen llamando igual porque el EXECUTE sigue concedido a `authenticated`:
-- lo único que desaparece es la ruta HTTP.
--
-- Por qué NO se resolvió revocando el EXECUTE, que era la otra opción: las
-- expresiones de una política RLS se evalúan con los privilegios de quien hace
-- la consulta. Revocarle el EXECUTE a `authenticated` no habría cerrado un
-- agujero, habría roto todas las políticas con "permission denied".
-- ============================================================================

create schema if not exists private;

create or replace function private.auth_is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function private.auth_is_member(org uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from organization_users
    where organization_id = org and user_id = auth.uid()
  ) or private.auth_is_admin();
$$;

grant usage   on schema   private                       to authenticated;
grant execute on function private.auth_is_admin()       to authenticated;
grant execute on function private.auth_is_member(uuid)  to authenticated;

-- ----------------------------------------------------------------------------
-- Las políticas se reescriben apuntando al esquema privado. Se listan una por
-- una a propósito, igual que en 0001: una política es una regla de seguridad y
-- quiero poder leer cada una sin ejecutar nada para saber qué permite.
-- ----------------------------------------------------------------------------
drop policy org_read        on organizations;
drop policy profile_self    on profiles;
drop policy membership_read on organization_users;
drop policy tenant_read     on leads;
drop policy tenant_read     on customers;
drop policy tenant_read     on conversations;
drop policy tenant_read     on appointments;
drop policy tenant_read     on automations;
drop policy tenant_read     on integrations;
drop policy tenant_read     on alerts;
drop policy tenant_read     on insights;
drop policy tenant_read     on documents;
drop policy tenant_read     on automation_events;
drop policy admin_only      on automation_internals;
drop policy admin_only      on admin_audit_log;

drop function public.auth_is_member(uuid);
drop function public.auth_is_admin();

create policy org_read on organizations for select
  using (private.auth_is_member(id));

create policy profile_self on profiles for select
  using (id = auth.uid() or private.auth_is_admin());

create policy membership_read on organization_users for select
  using (user_id = auth.uid() or private.auth_is_admin());

create policy tenant_read on leads for select
  using (private.auth_is_member(organization_id));
create policy tenant_read on customers for select
  using (private.auth_is_member(organization_id));
create policy tenant_read on conversations for select
  using (private.auth_is_member(organization_id));
create policy tenant_read on appointments for select
  using (private.auth_is_member(organization_id));
create policy tenant_read on automations for select
  using (private.auth_is_member(organization_id));
create policy tenant_read on integrations for select
  using (private.auth_is_member(organization_id));
create policy tenant_read on alerts for select
  using (private.auth_is_member(organization_id));
create policy tenant_read on insights for select
  using (private.auth_is_member(organization_id));
create policy tenant_read on documents for select
  using (private.auth_is_member(organization_id));
create policy tenant_read on automation_events for select
  using (private.auth_is_member(organization_id));

create policy admin_only on automation_internals for select
  using (private.auth_is_admin());

create policy admin_only on admin_audit_log for select
  using (private.auth_is_admin());
