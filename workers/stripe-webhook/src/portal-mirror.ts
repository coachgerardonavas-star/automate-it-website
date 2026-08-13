/**
 * Espejo de Stripe hacia el Client Portal.
 *
 * Escribe en `client_accounts` lo que el Centro de administración necesita para
 * contestar "¿cuál se me vence?" y "¿cuánto facturo?". Stripe sigue siendo la
 * fuente de verdad: acá solo se copia, con la fecha de copiado al lado.
 *
 * POR QUÉ VIVE EN EL WORKER Y NO EN EL SITIO: escribir en `client_accounts`
 * exige la service_role key, que salta RLS por completo. La migración 0001 lo
 * dejó dicho: esa llave nunca entra al proyecto del sitio, vive en un Worker
 * aparte. Este es ese Worker.
 */

export interface MirrorEnv {
  SUPABASE_URL?: string;
  /** `wrangler secret put SUPABASE_SERVICE_ROLE_KEY`. Nunca en wrangler.toml. */
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

interface StripeSubscription {
  id?: unknown;
  customer?: unknown;
  status?: unknown;
  start_date?: unknown;
  current_period_end?: unknown;
  cancel_at_period_end?: unknown;
  metadata?: Record<string, unknown>;
  items?: { data?: Array<Record<string, any>> };
}

/** Resultado del intento de espejar, para que quien llame decida si alerta. */
export interface MirrorResult {
  ok: boolean;
  /** Por qué no se pudo, en lenguaje entendible en una alerta de Telegram. */
  reason?: string;
  organizationSlug?: string;
}

const secondsToIso = (v: unknown): string | null =>
  typeof v === "number" && v > 0 ? new Date(v * 1000).toISOString() : null;

/**
 * Ingreso MENSUAL, normalizado.
 *
 * Una suscripción anual de $12.000 no son $12.000 por mes. Sumar sin normalizar
 * infla el ingreso mensual del panel por doce, y esa cifra es la que se mira
 * para decidir. Se divide por la cantidad de meses del intervalo.
 *
 * Devuelve null —y no 0— cuando el precio no se puede leer: "no sé cuánto paga"
 * no es lo mismo que "paga cero", y el panel muestra cosas distintas.
 */
function monthlyCents(sub: StripeSubscription): number | null {
  const item = sub.items?.data?.[0];
  const price = item?.price;
  if (!price || typeof price.unit_amount !== "number") return null;

  const cantidad = typeof item.quantity === "number" ? item.quantity : 1;
  const bruto = price.unit_amount * cantidad;

  const intervalo = String(price.recurring?.interval ?? "month");
  const cada = Number(price.recurring?.interval_count ?? 1) || 1;

  const mesesPorIntervalo: Record<string, number> = {
    day: 1 / 30,
    week: 1 / 4.345,
    month: 1,
    year: 12,
  };
  const meses = (mesesPorIntervalo[intervalo] ?? 1) * cada;
  if (meses <= 0) return null;

  return Math.round(bruto / meses);
}

/** Nombre legible del plan. El cliente ve "Estratega", nunca un `price_id`. */
function planName(sub: StripeSubscription): string | null {
  const price = sub.items?.data?.[0]?.price;
  if (!price) return null;
  const producto = price.product;
  return (
    price.nickname ??
    (producto && typeof producto === "object" ? producto.name : null) ??
    null
  );
}

async function supabase(
  env: MirrorEnv,
  path: string,
  init: RequestInit
): Promise<Response> {
  return fetch(`${env.SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

/**
 * Encuentra a qué organización pertenece esta suscripción.
 *
 * Dos caminos, en este orden:
 *
 *   1. `metadata.organization_slug` en la suscripción de Stripe. Es el camino
 *      explícito y el que conviene usar siempre: se pone una vez al crear la
 *      suscripción y no vuelve a fallar.
 *   2. Una fila de `client_accounts` que ya tenga guardado ese
 *      `stripe_customer_id`, o sea, un cliente ya vinculado antes.
 *
 * NO se adivina por email a propósito. Un mismo correo puede estar en varias
 * organizaciones, y vincular la suscripción equivocada significa mostrarle a un
 * cliente el plan y el precio de otro. Ante la duda no se escribe nada: se
 * devuelve el motivo para que salga una alerta y se vincule a mano.
 */
async function findOrganization(
  env: MirrorEnv,
  sub: StripeSubscription
): Promise<{ id: string; slug: string } | { error: string }> {
  const slug = sub.metadata?.organization_slug;
  if (typeof slug === "string" && slug.trim()) {
    const res = await supabase(env, `organizations?select=id,slug&slug=eq.${encodeURIComponent(slug.trim())}`, { method: "GET" });
    const filas = res.ok ? ((await res.json()) as any[]) : [];
    if (filas.length === 1) return { id: filas[0].id, slug: filas[0].slug };
    return { error: `metadata.organization_slug="${slug}" no coincide con ninguna organización` };
  }

  const customer = typeof sub.customer === "string" ? sub.customer : null;
  if (customer) {
    const res = await supabase(
      env,
      `client_accounts?select=organization_id,organizations(slug)&stripe_customer_id=eq.${encodeURIComponent(customer)}`,
      { method: "GET" }
    );
    const filas = res.ok ? ((await res.json()) as any[]) : [];
    if (filas.length === 1) {
      return { id: filas[0].organization_id, slug: filas[0].organizations?.slug ?? "" };
    }
  }

  return {
    error: "sin organization_slug en la metadata y sin cliente vinculado previamente",
  };
}

/**
 * Copia el estado de una suscripción a `client_accounts`.
 *
 * Idempotente: el mismo evento reenviado por Stripe deja la fila igual. Importa
 * porque Stripe reintenta cuando no recibe un 200 a tiempo.
 */
export async function mirrorSubscription(
  env: MirrorEnv,
  sub: StripeSubscription
): Promise<MirrorResult> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, reason: "el worker no tiene configurado el acceso a Supabase" };
  }

  const org = await findOrganization(env, sub);
  if ("error" in org) return { ok: false, reason: org.error };

  const fila = {
    organization_id: org.id,
    stripe_customer_id: typeof sub.customer === "string" ? sub.customer : null,
    stripe_subscription_id: typeof sub.id === "string" ? sub.id : null,
    plan_name: planName(sub),
    mrr_cents: monthlyCents(sub),
    status: typeof sub.status === "string" ? sub.status : null,
    started_at: secondsToIso(sub.start_date),
    current_period_end: secondsToIso(sub.current_period_end),
    cancel_at_period_end: Boolean(sub.cancel_at_period_end),
    synced_at: new Date().toISOString(),
    // Se limpia el error anterior: si esta pasada funcionó, el panel no debe
    // seguir mostrando una advertencia vieja.
    sync_error: null,
  };

  const res = await supabase(env, "client_accounts?on_conflict=organization_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(fila),
  });

  if (!res.ok) {
    return { ok: false, reason: `Supabase respondió ${res.status}: ${await res.text()}` };
  }

  return { ok: true, organizationSlug: org.slug };
}

/**
 * Deja constancia de que la sincronización falló.
 *
 * Un espejo que falla en silencio es peor que no tener espejo: el panel sigue
 * mostrando la cifra vieja como si fuera de hoy. Esto escribe el motivo en la
 * fila para que la pantalla lo delate. Solo actualiza si el cliente ya estaba
 * vinculado — si no lo está, no hay fila donde escribir y la alerta de Telegram
 * es el único aviso posible.
 */
export async function recordSyncError(
  env: MirrorEnv,
  customerId: string | null,
  motivo: string
): Promise<void> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY || !customerId) return;
  try {
    await supabase(
      env,
      `client_accounts?stripe_customer_id=eq.${encodeURIComponent(customerId)}`,
      {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ sync_error: motivo, synced_at: new Date().toISOString() }),
      }
    );
  } catch (e) {
    console.error("[portal-mirror] no se pudo registrar el error de sync", e);
  }
}
