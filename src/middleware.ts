import { defineMiddleware } from "astro:middleware";

const baseline = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "X-Frame-Options": "SAMEORIGIN",
};

export const onRequest = defineMiddleware(async (context, next) => {
  const original = await next();
  const response = new Response(original.body, original);

  for (const [name, value] of Object.entries(baseline)) {
    if (!response.headers.has(name)) response.headers.set(name, value);
  }

  if (context.url.pathname.startsWith("/portal")) {
    response.headers.set("Cache-Control", "private, no-store, max-age=0, must-revalidate");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Referrer-Policy", "same-origin");
    response.headers.set("X-Frame-Options", "DENY");
  }

  return response;
});
