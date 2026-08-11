-- ============================================================================
-- Automate IT — Client Portal · esquema multi-tenant (V1)
--
-- Principio rector: NINGUNA consulta confía en un organization_id que venga
-- del frontend. La pertenencia se resuelve siempre contra `organization_users`
-- dentro de la base, vía RLS. Un cliente que manipule el id en la URL o en el
-- body no obtiene nada: la política lo filtra antes de que la fila salga.
--
-- Roles:
--   client → ve solo las organizaciones donde es miembro.
--   admin  → ve todas. Es el rol de Automate IT.
--
-- El rol NO vive en el JWT ni en el cliente: vive en `profiles.role` y se lee
-- desde la base en cada política. Un token robado no puede escalar a admin.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Tipos
-- ----------------------------------------------------------------------------
create type user_role        as enum ('client', 'admin');
create type org_status       as enum ('healthy', 'needs_attention', 'critical');
create type lead_temp        as enum ('hot', 'warm', 'cold', 'unclassified');
create type automation_state as enum ('running', 'needs_attention', 'unavailable');
create type alert_level      as enum ('info', 'warning', 'critical');
create type appt_state       as enum ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show');
create type integration_state as enum ('connected', 'degraded', 'disconnected');

-- ----------------------------------------------------------------------------
-- Identidad y pertenencia
-- ----------------------------------------------------------------------------
create table organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  status      org_status not null default 'healthy',
  -- Separa demo de producción a nivel de fila (handoff §38). Una organización
  -- en modo 'demo' sirve datos sembrados; en 'live' sirve datos reales. Nunca
  -- se mezclan porque el modo es de la organización, no de la consulta.
  data_mode   text not null default 'demo' check (data_mode in ('demo', 'live')),
  locale      text not null default 'es' check (locale in ('es', 'en')),
  account_manager text,
  created_at  timestamptz not null default now()
);

create table profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  full_name  text,
  role       user_role not null default 'client',
  locale     text not null default 'es' check (locale in ('es', 'en')),
  created_at timestamptz not null default now()
);

create table organization_users (
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id         uuid not null references profiles(id) on delete cascade,
  created_at      timestamptz not null default now(),
  primary key (organization_id, user_id)
);

-- ----------------------------------------------------------------------------
-- Helpers de autorización.
--
-- SECURITY DEFINER a propósito: estas funciones leen tablas que el propio
-- usuario no puede leer libremente. Sin `definer` la política se llamaría a sí
-- misma y entraría en recursión infinita.
-- `search_path` fijo evita que un esquema del usuario secuestre los nombres.
-- ----------------------------------------------------------------------------
create or replace function auth_is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function auth_is_member(org uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from organization_users
    where organization_id = org and user_id = auth.uid()
  ) or auth_is_admin();
$$;

-- ----------------------------------------------------------------------------
-- Datos de negocio (uno por tenant)
-- ----------------------------------------------------------------------------
create table leads (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name            text not null,
  temperature     lead_temp not null default 'unclassified',
  source          text,
  interest        text,
  summary         text,
  next_action     text,
  owner           text,
  status          text,
  crm_url         text,
  last_activity_at timestamptz,
  created_at      timestamptz not null default now()
);

create table customers (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name            text not null,
  service         text,
  status          text,
  notes           text,
  last_interaction_at timestamptz,
  next_appointment_at timestamptz,
  created_at      timestamptz not null default now()
);

create table conversations (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  lead_id         uuid references leads(id) on delete set null,
  contact_name    text not null,
  channel         text not null,
  last_message    text,
  status          text,
  duration_seconds integer,
  summary         text,
  last_message_at timestamptz,
  created_at      timestamptz not null default now()
);

create table appointments (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  lead_id         uuid references leads(id) on delete set null,
  title           text not null,
  contact_name    text,
  state           appt_state not null default 'scheduled',
  created_by_automation boolean not null default false,
  starts_at       timestamptz not null,
  created_at      timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Automatizaciones y telemetría
-- ----------------------------------------------------------------------------
create table automations (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  -- Nombre humano. El cliente ve "WhatsApp Assistant", nunca un scenario id.
  name            text not null,
  icon            text,
  state           automation_state not null default 'running',
  unit_label      text,
  volume_this_period integer not null default 0,
  last_activity_at timestamptz,
  -- Referencias técnicas: SOLO se exponen a admin. La política de `automations`
  -- no puede filtrar por columna, así que estos campos viven en su propia tabla.
  created_at      timestamptz not null default now()
);

create table automation_internals (
  automation_id uuid primary key references automations(id) on delete cascade,
  provider      text,
  external_id   text,
  webhook_ref   text,
  last_success_at timestamptz,
  last_failure_at timestamptz,
  error_count   integer not null default 0,
  retry_state   text
);

create table automation_events (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  automation_id   uuid references automations(id) on delete set null,
  event_type      text not null,
  source          text not null,
  entity_type     text,
  entity_id       text,
  status          text not null default 'success',
  -- Lo único que el frontend del cliente renderiza. Se escribe ya redactado.
  human_summary   text not null,
  -- Payload técnico. Nunca se sirve al rol client: ver la política de abajo.
  metadata        jsonb,
  occurred_at     timestamptz not null default now()
);

create index on automation_events (organization_id, occurred_at desc);
create index on leads (organization_id, created_at desc);
create index on appointments (organization_id, starts_at);

create table integrations (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name            text not null,
  state           integration_state not null default 'connected',
  last_success_at timestamptz,
  created_at      timestamptz not null default now()
);

create table alerts (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  level           alert_level not null default 'info',
  title           text not null,
  detail          text,
  -- Agrupa repeticiones en vez de generar 200 filas iguales (handoff §26).
  fingerprint     text not null,
  occurrences     integer not null default 1,
  resolved_at     timestamptz,
  first_seen_at   timestamptz not null default now(),
  last_seen_at    timestamptz not null default now(),
  unique (organization_id, fingerprint)
);

create table insights (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  body            text not null,
  -- De dónde salió la afirmación. Un insight sin evidencia no se muestra.
  evidence        jsonb,
  period_start    date,
  period_end      date,
  created_at      timestamptz not null default now()
);

create table documents (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  title           text not null,
  category        text,
  url             text not null,
  created_at      timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Audit trail de acciones administrativas (handoff §31)
-- ----------------------------------------------------------------------------
create table admin_audit_log (
  id          bigserial primary key,
  actor_id    uuid references profiles(id) on delete set null,
  action      text not null,
  target_org  uuid references organizations(id) on delete set null,
  detail      jsonb,
  occurred_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- RLS. Se habilita en TODAS las tablas. Sin política explícita, deniega.
-- ----------------------------------------------------------------------------
alter table organizations       enable row level security;
alter table profiles            enable row level security;
alter table organization_users  enable row level security;
alter table leads               enable row level security;
alter table customers           enable row level security;
alter table conversations       enable row level security;
alter table appointments        enable row level security;
alter table automations         enable row level security;
alter table automation_internals enable row level security;
alter table automation_events   enable row level security;
alter table integrations        enable row level security;
alter table alerts              enable row level security;
alter table insights            enable row level security;
alter table documents           enable row level security;
alter table admin_audit_log     enable row level security;

create policy org_read on organizations for select
  using (auth_is_member(id));

create policy profile_self on profiles for select
  using (id = auth.uid() or auth_is_admin());

create policy membership_read on organization_users for select
  using (user_id = auth.uid() or auth_is_admin());

-- Un bloque idéntico por tabla de tenant. Se escribe explícito y no con un
-- bucle generado: una política es una regla de seguridad, y quiero poder leer
-- cada una sin ejecutar nada para saber qué permite.
create policy tenant_read on leads for select
  using (auth_is_member(organization_id));
create policy tenant_read on customers for select
  using (auth_is_member(organization_id));
create policy tenant_read on conversations for select
  using (auth_is_member(organization_id));
create policy tenant_read on appointments for select
  using (auth_is_member(organization_id));
create policy tenant_read on automations for select
  using (auth_is_member(organization_id));
create policy tenant_read on integrations for select
  using (auth_is_member(organization_id));
create policy tenant_read on alerts for select
  using (auth_is_member(organization_id));
create policy tenant_read on insights for select
  using (auth_is_member(organization_id));
create policy tenant_read on documents for select
  using (auth_is_member(organization_id));

-- `automation_events` es la única tabla de tenant con datos técnicos en una
-- columna (`metadata`). RLS no filtra columnas, así que el cliente SÍ puede
-- leer la fila — y por eso la capa de datos nunca la pide con `select=*`.
-- Ver `src/lib/portal/queries.ts`: el rol client pide columnas nombradas.
create policy tenant_read on automation_events for select
  using (auth_is_member(organization_id));

-- Detalle técnico de automatizaciones: solo Automate IT.
create policy admin_only on automation_internals for select
  using (auth_is_admin());

create policy admin_only on admin_audit_log for select
  using (auth_is_admin());

-- La escritura no pasa por el portal en V1: la hace la capa de telemetría con
-- la service_role key, que salta RLS por diseño. No se abre ninguna política
-- de insert/update/delete a usuarios finales.
