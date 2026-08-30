import type { APIRoute } from "astro";
import { getPulsoProspect } from "../../lib/pulso/prospects";

export const prerender = false;

export const GET: APIRoute = ({ params, redirect }) => {
  const prospect = getPulsoProspect(params.prospect ?? "");

  if (!prospect) {
    return new Response("Enlace no encontrado", { status: 404 });
  }

  const query = new URLSearchParams({
    source: "qr",
    prospect_id: prospect.id,
  });

  return redirect(`/pulso/${prospect.slug}?${query.toString()}`, 302);
};
