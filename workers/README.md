# Workers — Automate IT

Cloudflare Workers que sostienen la integración de Stripe. Viven aquí, **separados** del Worker del chatbot BIT (`bit-chat-3126`, que no se toca desde este repo).

## stripe-checkout-automate

Crea Stripe Checkout Sessions con setup fee + suscripción mensual en una sola transacción. Recibe POST desde el sitio (yourbizupgraded.com) y devuelve la URL hosted de Stripe para redirigir al cliente.

### Setup inicial (solo la primera vez)

```bash
cd workers/stripe-checkout
npm install
npx wrangler login                       # autentica tu cuenta Cloudflare
npx wrangler secret put STRIPE_SECRET_KEY
# Pega el sk_test_* (sandbox) o sk_live_* (producción)
```

Opcional — restringir los orígenes que pueden llamar al Worker:

```bash
npx wrangler secret put ALLOWED_ORIGINS
# Pega: https://yourbizupgraded.com,https://www.yourbizupgraded.com
```

### Deploy

```bash
cd workers/stripe-checkout
npx wrangler deploy
```

Cloudflare devolverá la URL, típicamente `https://stripe-checkout-automate.<tu-subdomain>.workers.dev`. Si difiere de lo que está en `src/config/site.ts → STRIPE_CHECKOUT_WORKER_URL`, actualízalo.

### Probar local

```bash
npx wrangler dev
```

Luego, en otra terminal:

```bash
curl -X POST http://127.0.0.1:8787/ \
  -H "Content-Type: application/json" \
  -d '{
    "priceIdMonthly": "price_1TYA6kAgJkIop9B2yz36URbT",
    "priceIdSetup":   "price_1TYAB1AgJkIop9B2yr6pPEwq",
    "planName":       "Starter",
    "lang":           "es"
  }'
```

Esperas un `{ "url": "https://checkout.stripe.com/..." }`.

---

## stripe-webhook-automate

Recibe eventos de Stripe, verifica la firma HMAC y logea los relevantes. Por ahora solo log — la integración con HubSpot/Airtable se hace en un sprint posterior.

### Setup inicial

```bash
cd workers/stripe-webhook
npm install
npx wrangler secret put STRIPE_WEBHOOK_SECRET
# Pega el whsec_* del endpoint configurado en Stripe Dashboard.
```

### Deploy

```bash
cd workers/stripe-webhook
npx wrangler deploy
```

Luego en Stripe Dashboard → Developers → Webhooks → Add endpoint:

- Endpoint URL: la que devuelve `wrangler deploy`
- Eventos a escuchar:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
  - `customer.subscription.deleted`

Stripe te da el `whsec_*` después de crear el endpoint — copialo y usalo en el `wrangler secret put` de arriba.

### Ver logs en vivo

```bash
cd workers/stripe-webhook
npx wrangler tail
```

---

## Live vs Sandbox

Los Workers solo conocen el secret que les pasas. Para alternar entre sandbox y producción, **cambia el secret** (no hay que redesplegar el código):

```bash
npx wrangler secret put STRIPE_SECRET_KEY   # paste sk_live_*
```

Los Price IDs en `src/lib/stripe.ts` **sí** hay que reemplazarlos por los de Live cuando el CEO active producción.
