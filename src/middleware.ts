import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ url }, next) => {
  const response = await next();
  const path = url.pathname;

  if (!path.startsWith("/d/") && path !== "/portal" && !path.startsWith("/portal/")) {
    return response;
  }

  // _headers applies to static assets; dynamic Worker responses need these too.
  const secured = new Response(response.body, response);
  if (path.startsWith("/d/")) {
    secured.headers.set("X-Robots-Tag", "noindex, nofollow");
    secured.headers.set("Cache-Control", "private, max-age=0, must-revalidate");
  } else {
    secured.headers.set("X-Robots-Tag", "noindex, nofollow");
    secured.headers.set("Cache-Control", "private, no-store, max-age=0, must-revalidate");
    secured.headers.set("Referrer-Policy", "same-origin");
    secured.headers.set("X-Frame-Options", "DENY");
  }

  return secured;
});
