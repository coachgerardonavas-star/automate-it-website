import type { APIRoute } from "astro";
import { getPulsoProspect } from "../../lib/pulso/prospects";

export const prerender = false;

export const GET: APIRoute = ({ params, url }) => {
  const prospect = getPulsoProspect(params.prospect ?? "");

  if (!prospect) {
    return new Response("Enlace no encontrado", { status: 404 });
  }

  const query = new URLSearchParams({
    source: "qr",
    prospect_id: prospect.id,
    company_slug: prospect.slug,
    campaign: "pulso_print",
  });

  // El flag de QA venía DESPUÉS del `return`, así que nunca se ejecutaba:
  // abrir `/r/<slug>?qa=1` no propagaba nada a la página de destino.
  if (url.searchParams.get("qa") === "1") query.set("qa", "1");

  return new Response(null, {
    status: 302,
    headers: {
      Location: `/pulso/${prospect.slug}?${query.toString()}`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
};
