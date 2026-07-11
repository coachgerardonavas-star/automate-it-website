const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/of2gfas8asapp1l49tfffs1nyln7fk7n";
const VERIFY_TOKEN = "automateit2026";

export default {
  async fetch(request, env, ctx) {
    if (request.method === "GET") {
      const url = new URL(request.url);
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");

      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        return new Response(challenge, {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      }

      return new Response(null, { status: 403 });
    }

    if (request.method === "POST") {
      const body = await request.text();

      ctx.waitUntil(
        fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        })
      );

      return new Response(null, { status: 200 });
    }

    return new Response(null, { status: 405 });
  },
};
