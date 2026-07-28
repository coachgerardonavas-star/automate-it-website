const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/of2gfas8asapp1l49tfffs1nyln7fk7n";

export default {
  async fetch(request, env, ctx) {
    const VERIFY_TOKEN = env.META_VERIFY_TOKEN;

    if (request.method === "GET") {
      const url = new URL(request.url);
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");

      if (mode === "subscribe" && VERIFY_TOKEN && token === VERIFY_TOKEN) {
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
          headers: {
            "Content-Type": "application/json",
            "x-make-apikey": env.MAKE_WEBHOOK_KEY,
          },
          body,
        })
      );

      return new Response(null, { status: 200 });
    }

    return new Response(null, { status: 405 });
  },
};
