# /.well-known/ — Apple Pay domain verification

Para que **Apple Pay** funcione en el Checkout hosted de Stripe, el dominio
`yourbizupgraded.com` tiene que estar registrado.

## Pasos

1. Stripe Dashboard → **Settings → Payment methods → Apple Pay → Add domain**.
2. Ingresa `yourbizupgraded.com`.
3. Stripe te da un link para descargar el archivo
   `apple-developer-merchantid-domain-association` (sin extensión).
4. Coloca ese archivo **junto a este README**, en `public/.well-known/`.
5. Commit + push. Cloudflare Pages lo servirá en
   `https://yourbizupgraded.com/.well-known/apple-developer-merchantid-domain-association`.
6. Vuelve a Stripe y dale **Verify**.

## Notas

- El archivo no lleva extensión; respeta el nombre exacto.
- Cloudflare Pages sirve cualquier archivo dentro de `public/` tal cual está
  en el repo — no hace falta configuración extra.
- Este README también es servido públicamente, pero solo es informativo y no
  interfiere con la verificación.
