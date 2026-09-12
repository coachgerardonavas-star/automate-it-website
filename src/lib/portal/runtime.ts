import { env } from "cloudflare:workers";

/** Cloudflare bindings for Astro 6+ / adapter 13+ server routes. */
export function getRuntimeEnv(): Record<string, unknown> {
  return env as unknown as Record<string, unknown>;
}
