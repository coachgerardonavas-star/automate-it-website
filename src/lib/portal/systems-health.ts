/**
 * Salud de la infraestructura propia de Automate IT.
 *
 * ⚠️ Esto NO es la salud de los sistemas de los clientes. El worker
 * `health-check` vigila los workers de Automate IT (el sitio, BIT, los intakes,
 * Stripe, WhatsApp, Telegram). Son dos cosas distintas y en el Centro de
 * administración se muestran en bloques separados a propósito: confundirlas
 * llevaría a creer que un cliente está sano porque nuestros workers responden.
 *
 * Fuente: el namespace KV `STATE`, donde `health-check` escribe una clave por
 * servicio con la forma `state:<key>` → `{ status: "ok" | "down", since: ISO }`.
 * Se lee por binding, no por HTTP: no hay red de por medio, no hace falta un
 * token y el worker sigue sin exponerse a internet (`workers_dev = false`).
 *
 * El binding se declara en el panel de Cloudflare Pages con el nombre `STATE`.
 * Si no está, esto devuelve `null` y el Centro de administración simplemente no
 * muestra el bloque — el portal no se cae por una fuente que falta.
 */

/** Servicios vigilados. Debe coincidir con `SERVICES` en workers/health-check/index.js. */
const SERVICES: Array<{ key: string; name: string; tier0: boolean }> = [
  { key: "yourbizupgraded", name: "yourbizupgraded.com", tier0: true },
  { key: "diagnostico-intake", name: "Formulario de diagnóstico", tier0: true },
  { key: "stripe-webhook", name: "Pagos (Stripe)", tier0: true },
  { key: "consultoria-intake", name: "Entrevista y firma del acuerdo", tier0: true },
  { key: "bit-chat-3126", name: "Chatbot BIT", tier0: false },
  { key: "whatsapp-webhook", name: "WhatsApp", tier0: false },
  { key: "vero-telegram", name: "Agente de Telegram", tier0: false },
];

export interface SystemStatus {
  key: string;
  name: string;
  /** true = Tier 0: si se cae, se pierden leads o dinero sin aviso visible. */
  tier0: boolean;
  status: "ok" | "down" | "unknown";
  /** Desde cuándo está en ese estado. */
  since: string | null;
}

export interface SystemsHealth {
  systems: SystemStatus[];
  downCount: number;
  /** Servicios caídos que además son Tier 0. Es lo que decide si algo es crítico. */
  tier0DownCount: number;
}

interface KvLike {
  get(key: string, options?: { type: "json" }): Promise<unknown>;
}

/**
 * Lee el estado de los servicios desde KV.
 *
 * Devuelve `null` cuando no hay binding: es la señal de "esta fuente no está
 * disponible", distinta de "todo está caído". Nunca inventa un estado sano.
 */
export async function getSystemsHealth(
  runtimeEnv?: Record<string, unknown>
): Promise<SystemsHealth | null> {
  const kv = runtimeEnv?.STATE as KvLike | undefined;
  if (!kv || typeof kv.get !== "function") return null;

  const systems = await Promise.all(
    SERVICES.map(async (svc): Promise<SystemStatus> => {
      try {
        const stored = (await kv.get(`state:${svc.key}`, { type: "json" })) as
          | { status?: string; since?: string }
          | null;

        // Sin registro todavía: el cron aún no corrió para ese servicio. Se
        // marca `unknown`, no `ok` — no sabemos que esté bien, solo que no
        // tenemos dato.
        if (!stored?.status) {
          return { ...svc, status: "unknown", since: null };
        }
        return {
          ...svc,
          status: stored.status === "down" ? "down" : "ok",
          since: stored.since ?? null,
        };
      } catch {
        return { ...svc, status: "unknown", since: null };
      }
    })
  );

  return {
    systems,
    downCount: systems.filter((s) => s.status === "down").length,
    tier0DownCount: systems.filter((s) => s.status === "down" && s.tier0).length,
  };
}
