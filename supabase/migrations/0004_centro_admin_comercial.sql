-- ============================================================================
-- Automate IT — Client Portal · lo que solo ve Automate IT
--
-- El Centro de administración de hoy contesta "¿qué cliente está roto?". No
-- contesta "¿cuál se me vence el mes que viene?" ni "¿cuánto facturo?" ni
-- "¿cuál dejó de entrar?". Esta migración agrega esas tres.
--
-- REGLA QUE GOBIERNA TODO ESTE ARCHIVO: Stripe manda en precios y estado de
-- cobro. Nada de lo que hay acá es la fuente de verdad de un monto. Es un
-- espejo con fecha de sincronización visible, para que una cifra vieja se
-- delate sola en vez de mentir en silencio.
--
-- Todo lo de acá es admin-only a nivel de base. No hay una sola política que
-- le permita a un cliente leer estas tablas: no es que la UI se las esconda,
-- es que la base no se las entrega.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Espejo de Stripe.
--
-- `synced_at` no es metadato decorativo: es lo que distingue "este cliente no
-- paga" de "hace seis días que no sincronizo". Sin esa fecha, una tabla vacía
-- y una tabla desactualizada se ven idénticas, y se toman decisiones de cobro
-- sobre datos muertos.
--
-- `sync_error` guarda el último fallo. Un espejo que falla en silencio es peor
-- que no tener espejo.
-- ----------------------------------------------------------------------------
create table client_accounts (
  organization_id        uuid primary key references organizations(id) on delete cascade,

  -- Identificadores de Stripe. Son la llave para ir a buscar el detalle allá;
  -- acá no se copia nada que Stripe pueda cambiar sin avisarnos.
  stripe_customer_id     text,
  stripe_subscription_id text,

  plan_name              text,
  -- En centavos y entero, como en 0003: los flotantes para dinero acumulan
  -- error de redondeo.
  mrr_cents              integer check (mrr_cents >= 0),
  currency               text not null default 'usd',

  -- Estado tal como lo nombra Stripe, sin traducir. Traducirlo acá crearía un
  -- segundo vocabulario que hay que mantener sincronizado con el de ellos.
  status                 text,

  started_at             timestamptz,
  -- La renovación. Es el campo por el que existe media tabla.
  current_period_end     timestamptz,
  cancel_at_period_end   boolean not null default false,

  synced_at              timestamptz,
  sync_error             text
);

alter table client_accounts enable row level security;

create policy admin_only on client_accounts for select
  using (private.auth_is_admin());

-- Ordenar por vencimiento es la consulta que más se va a hacer.
create index on client_accounts (current_period_end);

-- ----------------------------------------------------------------------------
-- Compromiso: quién dejó de mirar.
--
-- Es el mejor predictor de que un cliente no renueva. Deja de entrar mucho
-- antes de avisar que se va.
-- ----------------------------------------------------------------------------
alter table profiles
  add column last_seen_at timestamptz;

create table portal_visits (
  id              bigserial primary key,
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id         uuid references profiles(id) on delete set null,
  path            text not null,
  visited_on      date not null default current_date,
  at              timestamptz not null default now()
);

-- Una fila por usuario, ruta y día. Esto acota el crecimiento de raíz: con 13
-- rutas, un usuario genera como máximo 13 filas diarias por más que recargue
-- mil veces. Sin este índice, una tabla en la que escribe el cliente crece sin
-- techo y se convierte en un problema de costos.
create unique index portal_visits_uniq
  on portal_visits (organization_id, user_id, path, visited_on);

create index on portal_visits (organization_id, at desc);

alter table portal_visits enable row level security;

create policy admin_only on portal_visits for select
  using (private.auth_is_admin());

-- ----------------------------------------------------------------------------
-- EXCEPCIÓN DECLARADA a la regla de 0001.
--
-- 0001 dice: "No se abre ninguna política de insert/update/delete a usuarios
-- finales". Acá se abren dos, y conviene que quede escrito por qué y con qué
-- límites, en vez de que alguien lo descubra dentro de un año leyendo el
-- diff.
--
-- Por qué: registrar la visita necesita una escritura en el mismo momento en
-- que la persona navega. La alternativa —un Worker con service_role— agrega
-- un servicio entero para escribir una fila.
--
-- Con qué límites: solo INSERT y solo UPDATE del propio perfil. Nada de
-- DELETE, nada de tocar filas ajenas. El `with check` exige las dos cosas a
-- la vez: que la fila sea de quien la escribe Y que pertenezca a una
-- organización de la que es miembro. Manipular el id en el body no alcanza.
--
-- Qué puede hacer un cliente malicioso: inflar sus propias visitas hasta 13
-- filas por día. Ensucia su propia métrica de compromiso y nada más — no ve
-- datos ajenos, no escribe en otra organización, y el índice único le pone
-- techo. Es un riesgo aceptado a conciencia, no un descuido.
-- ----------------------------------------------------------------------------
create policy own_visit_insert on portal_visits for insert
  with check (
    user_id = auth.uid()
    and private.auth_is_member(organization_id)
  );

create policy own_profile_touch on profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- ----------------------------------------------------------------------------
-- La consulta del Centro de administración, en la base.
--
-- SECURITY INVOKER: la RLS de cada tabla se aplica sola con los privilegios de
-- quien llama. Un cliente que invoque esto por RPC no recibe una lista de
-- clientes ajenos — recibe la suya, vacía de todo lo comercial, porque las
-- políticas de `client_accounts` y `portal_visits` son admin-only.
-- ----------------------------------------------------------------------------
create or replace function public.admin_overview()
returns jsonb
language sql stable security invoker set search_path = public
as $$
  -- Guarda explícita. La RLS ya impide que salga un solo dato comercial —
  -- verificado: a un cliente miembro le devolvía todos los campos de dinero en
  -- null— pero una función que se llama `admin_overview` no tiene por qué
  -- contestarle nada a quien no es admin. Se corta antes de armar la fila, así
  -- no depende de que las políticas de dos tablas sigan siendo correctas
  -- dentro de un año.
  select case when not private.auth_is_admin() then '[]'::jsonb else (
  select coalesce(jsonb_agg(fila order by fila->>'nombre'), '[]'::jsonb)
  from (
    select jsonb_build_object(
      'id',    o.id,
      'slug',  o.slug,
      'nombre', o.name,
      'estado', o.status,
      'modo',   o.data_mode,

      -- Comercial (espejo de Stripe)
      'plan',            ca.plan_name,
      'mrr_centavos',    ca.mrr_cents,
      'estado_cobro',    ca.status,
      'renueva',         ca.current_period_end,
      'cancela_al_fin',  ca.cancel_at_period_end,
      'cliente_desde',   ca.started_at,
      'sincronizado',    ca.synced_at,
      'error_sync',      ca.sync_error,

      -- Días hasta la renovación. Se calcula acá para que ordenar por
      -- urgencia no dependa de que el frontend haga bien la resta.
      'dias_para_renovar', case
        when ca.current_period_end is null then null
        else extract(day from (ca.current_period_end - now()))::int
      end,

      -- Salud: fallos de los últimos 7 días, no solo el estado de ahora.
      'fallos_7d', (
        select count(*) from automation_events e
        where e.organization_id = o.id
          and e.occurred_at > now() - interval '7 days'
          and e.status <> 'success'
      ),
      'alertas_abiertas', (
        select count(*) from alerts a
        where a.organization_id = o.id and a.resolved_at is null
      ),
      'ultima_actividad', (
        select max(e.occurred_at) from automation_events e
        where e.organization_id = o.id
      ),

      -- Compromiso
      'ultimo_ingreso', (
        select max(p.last_seen_at) from profiles p
        join organization_users ou on ou.user_id = p.id
        where ou.organization_id = o.id
      ),
      'vio_reportes_30d', (
        select count(*) > 0 from portal_visits v
        where v.organization_id = o.id
          and v.path like '%/reports%'
          and v.at > now() - interval '30 days'
      )
    ) as fila
    from organizations o
    left join client_accounts ca on ca.organization_id = o.id
  ) t) end;
$$;

grant execute on function public.admin_overview() to authenticated;
