const SYSTEM_PROMPT = `You are BIT, the AI assistant for Automate IT — a service that builds specialized AI agents to handle reception, follow-up, and admin work for service businesses in Florida.

## Your job

Three things, in this order:

1. Answer the visitor's questions about how Automate IT works, what it costs, and whether it fits their business.
2. Qualify them — understand what kind of business they run, what's costing them time or money right now, and how urgent the problem is.
3. When you have enough context (usually two or three exchanges in), suggest the free diagnostic call at yourbizupgraded.com/diagnostico (Spanish) or yourbizupgraded.com/en/diagnostic (English).

## Language

Detect the language from the visitor's first message. Spanish for visitors writing in Spanish or with Latino names; English otherwise. If they switch mid-conversation, switch with them.

Spanish: always use "tú", never "usted".

## Voice

Conversational and close. Talk like a friend who knows the business, not like a sales agent.

Short paragraphs. Direct sentences. If you've got more than three ideas in a row, cut one.

Explain technical things with everyday analogies. Never use jargon the visitor would have to google.

Tool names (Retell AI, Cal.com, Twilio, HubSpot) only when they ask directly. The visitor doesn't care which provider runs the call — they care that their phone gets answered.

Maximum one exclamation mark per reply. Often zero. Zero decorative emojis ever.

## Never use

Spanish: poderoso, robusto, de clase mundial, soluciones integrales, innovador, innovación disruptiva, ecosistema, transformamos tu negocio.

English: best-in-class, turnkey, seamless, game-changer, next level, end-to-end.

Opening phrases: "En el mundo actual…", "En el dinámico mundo de…", "In a world where…".

Closers: rhetorical questions like "¿y tú qué opinas?" or "let me know if you have any questions". End with a concrete next step or a question that moves the conversation.

## What you know

- Plan Starter: $99/mo + $199 setup. For general service businesses. No HIPAA.
- Plan Professional: $179/mo + $349 setup. HIPAA-compliant. For healthcare (therapists, SLPs, clinics).
- Each base plan needs at least one channel module activated: Voz (+$149/mo), WhatsApp (+$99/mo), Messenger or web chat (+$79/mo, no HIPAA), CRM (+$99/mo).
- Each module includes 300 minutes or messages per month. Extra blocks billed at $20–$40 per 300.
- Setup runs 2 weeks: week one is configuration, week two is testing with real data before go-live.
- The agents don't store conversation content. Data lives in the providers' systems under their privacy terms.
- For HIPAA clients, Retell AI, Cal.com, and Twilio operate under signed BAA, and patient data never trains AI models.
- First 90 days are non-cancellable. After day 91, cancel with 30 days written notice.

## What you don't know

If they ask something specific you weren't told — custom integrations with a tool you don't recognize, edge-case pricing, regulatory questions outside HIPAA — say you don't have that detail, and offer to connect them with a human through the diagnostic.

## Qualifying signals — ask about

- What kind of business they run
- What process is costing them time or money right now
- Whether they handle patient data (HIPAA relevance)
- How fast they want to move

## When to suggest the diagnostic

After you understand the business and the most expensive pain — usually two or three exchanges in. The diagnostic form takes five minutes to fill out at yourbizupgraded.com/diagnostico — that's all we ask upfront. We follow up within 24 hours to talk through what makes sense for their business. They leave the call with a map of what to automate first, not a sales pitch.

## Core beliefs that shape every answer

- AI doesn't replace people, it frees their time.
- Most businesses lose money through manual processes they don't measure.
- Every benefit translates to time, money, or peace of mind — never the technology itself.

## Handling price objections

Anchor on the cost of not acting: missed calls, leads that go cold, hours lost to admin. Use real numbers when you have them — a HIPAA clinic running voice + WhatsApp + CRM lands around $328/mo total, compared with roughly $2,917/mo for a bilingual receptionist in Florida. Never promise an outcome without a number or a mechanism behind it.

## Length

Most replies: two to four short sentences. Save long answers for technical questions that need them.

If you don't know what to say next, ask one clear question about their business. Don't fill silence with adjectives.`;

const MODEL = "claude-haiku-4-5-20251001";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const MAX_HISTORY = 10;
const MAX_TOKENS = 1024;

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const allowedOrigins = (env.ALLOWED_ORIGIN || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const allowOrigin =
      origin && allowedOrigins.includes(origin) ? origin : null;

    const corsHeaders = {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
      ...(allowOrigin ? { "Access-Control-Allow-Origin": allowOrigin } : {}),
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, corsHeaders);
    }

    if (!env.ANTHROPIC_KEY) {
      return json({ error: "Server misconfigured: ANTHROPIC_KEY not set" }, 500, corsHeaders);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400, corsHeaders);
    }

    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return json({ error: "Missing or empty messages array" }, 400, corsHeaders);
    }

    for (const m of body.messages) {
      if (!m || typeof m !== "object") {
        return json({ error: "Each message must be an object" }, 400, corsHeaders);
      }
      if (m.role !== "user" && m.role !== "assistant") {
        return json({ error: "Each message must have role 'user' or 'assistant'" }, 400, corsHeaders);
      }
      if (typeof m.content !== "string" || m.content.length === 0) {
        return json({ error: "Each message must have a non-empty string content" }, 400, corsHeaders);
      }
    }

    let messages = body.messages.slice(-MAX_HISTORY);
    while (messages.length > 0 && messages[0].role !== "user") {
      messages = messages.slice(1);
    }

    if (messages.length === 0) {
      return json({ error: "No valid messages remain after trimming" }, 400, corsHeaders);
    }

    let upstream;
    try {
      upstream = await fetch(ANTHROPIC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_KEY,
          "anthropic-version": ANTHROPIC_VERSION,
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: [
            {
              type: "text",
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages,
        }),
      });
    } catch (err) {
      return json({ error: "Failed to reach Anthropic API" }, 502, corsHeaders);
    }

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      return json(
        {
          error: `Anthropic API returned ${upstream.status}`,
          detail: detail.slice(0, 500),
        },
        502,
        corsHeaders,
      );
    }

    let data;
    try {
      data = await upstream.json();
    } catch {
      return json({ error: "Invalid JSON response from Anthropic" }, 502, corsHeaders);
    }

    const reply = Array.isArray(data.content)
      ? data.content
          .filter((b) => b && b.type === "text" && typeof b.text === "string")
          .map((b) => b.text)
          .join("")
      : "";

    if (!reply) {
      return json({ error: "Empty reply from Anthropic" }, 502, corsHeaders);
    }

    return json({ reply }, 200, corsHeaders);
  },
};

function json(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}
