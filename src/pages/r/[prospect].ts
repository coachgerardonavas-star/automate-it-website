import type { APIRoute } from "astro";
import { getPulsoProspect } from "../../lib/pulso/prospects";

export const prerender = false;

export const GET: APIRoute = ({ params, request }) => {
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

  return new Response(null, {
    status: 302,
    headers: {
      Location: `/pulso/${prospect.slug}?${query.toString()}`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
  if (new URL(request.url).searchParams.get("qa") === "1") query.set("qa", "1");
};
