-- ============================================================================
-- Automate IT — Client Portal · métricas de impacto real
--
-- El esquema 0001 sabía QUÉ pasó (leads, citas, conversaciones) pero no podía
-- contestar la única pregunta que le importa al dueño del negocio: "¿esto me
-- está haciendo ganar más plata o recuperando mi tiempo?".
--
-- Esta migración agrega lo mínimo para contestarla. Criterio de diseño: nada
-- que obligue al cliente a cargar datos a mano cada semana. Todo lo que se
-- pide manualmente se abandona al mes y deja la métrica muerta. Por eso el
-- dinero sale de UN solo dato que se pregunta una vez en el onboarding —el
-- ticket promedio— y todo lo demás lo estampan las automatizaciones.
--
-- Se agrega ahora, con cero filas, a propósito: sumar `first_response_at`
-- cuando ya haya 10.000 conversaciones deja esa columna vacía para todo el
-- histórico, y una métrica sin histórico no prueba ninguna mejora.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Contexto del negocio.
--
-- `business_hours_*` y `timezone` son lo que permite afirmar "esto entró un
-- sábado a las 22:00 y aun así se atendió". Sin horario declarado, "fuera de
-- horario" no significa nada.
--
-- `avg_ticket_cents` es el único número que el cliente aporta a mano, una vez.
-- En centavos y entero: los flotantes para dinero acumulan error de redondeo.
-- ----------------------------------------------------------------------------
alter table organizations
  add column timezone             text     not null default 'America/New_York',
  add column business_hours_start smallint not null default 9  check (business_hours_start between 0 and 23),
  add column business_hours_end   smallint not null default 17 check (business_hours_end   between 1 and 24),
  add column business_days        smallint[] not null default '{1,2,3,4,5}',
  add column avg_ticket_cents     integer  check (avg_ticket_cents >= 0);

-- ----------------------------------------------------------------------------
-- Velocidad y cobertura: las dos columnas que hacen calculable la métrica más
-- importante del portal.
--
-- `first_inbound_at`  = cuándo escribió el cliente final.
-- `first_response_at` = cuándo recibió respuesta.
-- La diferencia entre ambas ES el tiempo de respuesta. Se guardan los dos
-- instantes y no la resta ya hecha: con los instantes se puede recalcular la
-- métrica si mañana cambia la definición; con la resta, no.
--
-- `first_response_by` separa lo que hizo la automatización de lo que hizo un
-- humano. Sin esta columna, la atribución es adivinanza: no se puede afirmar
-- que el sistema mejoró nada si no se sabe quién contestó.
-- ----------------------------------------------------------------------------
alter table conversations
  add column first_inbound_at  timestamptz,
  add column first_response_at timestamptz,
  add column first_response_by text check (first_response_by in ('automation', 'human'));

create index on conversations (organization_id, first_inbound_at);

-- `answered_at` en leads responde "¿cuántos entraron y nadie contestó nunca?".
-- Es la métrica que debe tender a cero, y la única de la pantalla que cuando
-- sube es una alarma real y no un adorno.
alter table leads
  add column answered_at timestamptz;

-- Valor del trabajo. Nullable a propósito: si no se cargó, la consulta cae al
-- ticket promedio de la organización. Un dato estimado y declarado como tal es
-- mejor que una pantalla sin dinero.
alter table appointments
  add column value_cents integer check (value_cents >= 0);

create index on appointments (organization_id, created_at);

-- Reactivación: ingreso que ya estaba muerto y volvió. Se marca cuando un
-- cliente inactivo responde a un contacto automático.
alter table customers
  add column reactivated_at timestamptz;

-- ----------------------------------------------------------------------------
-- Línea base: el "antes".
--
-- Esta tabla es la que decide si el portal puede contar una historia o solo
-- mostrar números sueltos. Sin el "antes" capturado en el onboarding, no se
-- puede afirmar ninguna mejora — y la ventana para capturarlo se cierra apenas
-- el sistema entra en funcionamiento.
--
-- `source` obliga a decir de dónde salió el número. Un baseline sin origen es
-- una opinión, y una opinión no sirve para justificar una factura.
-- ----------------------------------------------------------------------------
create table baselines (
  organization_id uuid not null references organizations(id) on delete cascade,
  metric_key      text not null,
  value           numeric not null,
  unit            text not null,
  -- De dónde salió: 'declarado_por_cliente', 'medido', 'estimado_conservador'.
  source          text not null,
  note            text,
  captured_at     timestamptz not null default now(),
  primary key (organization_id, metric_key)
);

alter table baselines enable row level security;

create policy tenant_read on baselines for select
  using (private.auth_is_member(organization_id));

-- ----------------------------------------------------------------------------
-- El cálculo, en la base y no en el cliente.
--
-- SECURITY INVOKER a propósito, al revés que los helpers de autorización: esta
-- función se ejecuta con los privilegios de quien la llama, así que la RLS de
-- cada tabla se aplica sola. Un cliente que la invoque con el id de otra
-- organización recibe ceros, no datos ajenos — la política filtra antes.
--
-- Vive en `public` porque SÍ está pensada para ser un endpoint: el portal la
-- llama por /rest/v1/rpc/portal_metrics.
--
-- La mediana se calcula acá con percentile_cont y no en JavaScript: traer
-- 10.000 conversaciones al servidor de render para ordenarlas sería absurdo.
-- Se usa mediana y no promedio porque una sola conversación contestada 14
-- horas tarde arrastra el promedio y esconde que las otras 40 se contestaron
-- en 90 segundos.
-- ----------------------------------------------------------------------------
create or replace function public.portal_metrics(org uuid, desde timestamptz, hasta timestamptz)
returns jsonb
language plpgsql stable security invoker set search_path = public
as $$
declare
  tz        text;
  h_ini     smallint;
  h_fin     smallint;
  dias      smallint[];
  ticket    integer;
  resultado jsonb;
begin
  select o.timezone, o.business_hours_start, o.business_hours_end,
         o.business_days, o.avg_ticket_cents
    into tz, h_ini, h_fin, dias, ticket
  from organizations o
  where o.id = org;

  -- Sin fila, la RLS ya dijo que no. Se devuelve vacío, no un error: la UI
  -- pinta estado vacío y no una pantalla rota.
  if tz is null then
    return jsonb_build_object('sin_acceso', true);
  end if;

  select jsonb_build_object(

    -- 1. GANA TRABAJOS QUE ANTES PERDÍA -------------------------------------
    'mediana_respuesta_segundos', (
      select percentile_cont(0.5) within group (
        order by extract(epoch from (c.first_response_at - c.first_inbound_at))
      )
      from conversations c
      where c.organization_id = org
        and c.first_inbound_at between desde and hasta
        and c.first_response_at is not null
    ),

    'fuera_de_horario_atendidas', (
      select count(*)
      from conversations c
      where c.organization_id = org
        and c.first_inbound_at between desde and hasta
        and c.first_response_at is not null
        and (
          extract(isodow from c.first_inbound_at at time zone tz)::smallint <> all (dias)
          or extract(hour from c.first_inbound_at at time zone tz) <  h_ini
          or extract(hour from c.first_inbound_at at time zone tz) >= h_fin
        )
    ),

    'leads_sin_contestar', (
      select count(*)
      from leads l
      where l.organization_id = org
        and l.created_at between desde and hasta
        and l.answered_at is null
    ),

    -- 2. PIERDE MENOS DE LOS QUE YA TENÍA -----------------------------------
    -- Denominador explícito: solo citas que ya ocurrieron y tienen desenlace.
    -- Incluir las futuras infla la tasa artificialmente.
    'tasa_asistencia', (
      select case when count(*) filter (where a.state in ('completed', 'no_show')) = 0
                  then null
                  else round(
                    100.0 * count(*) filter (where a.state = 'completed')
                          / count(*) filter (where a.state in ('completed', 'no_show')), 1)
             end
      from appointments a
      where a.organization_id = org
        and a.starts_at between desde and hasta
    ),

    'clientes_reactivados', (
      select count(*)
      from customers c
      where c.organization_id = org
        and c.reactivated_at between desde and hasta
    ),

    -- 3. VOLUMEN Y DINERO ---------------------------------------------------
    'citas_agendadas', (
      select count(*)
      from appointments a
      where a.organization_id = org
        and a.created_at between desde and hasta
    ),

    'citas_por_automatizacion', (
      select count(*)
      from appointments a
      where a.organization_id = org
        and a.created_at between desde and hasta
        and a.created_by_automation
    ),

    -- Atribución conservadora: SOLO citas que creó la automatización y que se
    -- completaron. Deja fuera todo lo que agendó un humano y todo lo que se
    -- cayó. El número queda más chico y sobrevive a que el cliente lo audite.
    'ingreso_atribuido_centavos', (
      select coalesce(sum(coalesce(a.value_cents, ticket)), 0)
      from appointments a
      where a.organization_id = org
        and a.starts_at between desde and hasta
        and a.created_by_automation
        and a.state = 'completed'
    ),

    -- Se declara si el dinero salió de valores reales o del ticket promedio.
    -- La UI tiene que poder decirlo en pantalla: un número estimado que se
    -- presenta como medido es una mentira que se descubre en la primera
    -- reunión.
    'ingreso_es_estimado', (
      select coalesce(bool_or(a.value_cents is null), false)
      from appointments a
      where a.organization_id = org
        and a.starts_at between desde and hasta
        and a.created_by_automation
        and a.state = 'completed'
    ),

    'conversion_lead_a_cita', (
      select case when count(distinct l.id) = 0 then null
                  else round(100.0 * count(distinct a.lead_id) / count(distinct l.id), 1)
             end
      from leads l
      left join appointments a
        on a.lead_id = l.id and a.organization_id = org
      where l.organization_id = org
        and l.created_at between desde and hasta
    ),

    -- 4. EL "ANTES" ---------------------------------------------------------
    'linea_base', (
      select coalesce(jsonb_object_agg(b.metric_key,
               jsonb_build_object('valor', b.value, 'unidad', b.unit, 'origen', b.source)), '{}'::jsonb)
      from baselines b
      where b.organization_id = org
    )

  ) into resultado;

  return resultado;
end $$;

grant execute on function public.portal_metrics(uuid, timestamptz, timestamptz) to authenticated;
