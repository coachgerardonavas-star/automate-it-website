/**
 * Safely serialize a value as JSON-LD content for inclusion inside
 * <script type="application/ld+json"> tags.
 *
 * Escapes "<" → "<" so that any string containing "</script>" or
 * "<!--" cannot break out of the script tag context and inject HTML.
 */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
