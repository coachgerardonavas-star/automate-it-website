/**
 * www-redirect — manda www.yourbizupgraded.com al dominio principal.
 *
 * El sitio vive en el Worker `automate-it-website-worker`, atado solo a
 * yourbizupgraded.com. Antes de este Worker, www apuntaba por CNAME a Pages,
 * que no lo tenía registrado, y respondía 522.
 *
 * 301 conservando ruta y query: un enlace viejo a www.../blog/x llega a
 * yourbizupgraded.com/blog/x y Google consolida todo en un solo dominio.
 */
const CANONICAL_HOST = "yourbizupgraded.com";

export default {
  fetch(request) {
    const url = new URL(request.url);
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  },
};
