import type { APIRoute } from "astro";

export const prerender = false;

// Keep unknown document URLs private and unindexed on Workers.
export const GET: APIRoute = () => new Response("Not found", { status: 404 });
