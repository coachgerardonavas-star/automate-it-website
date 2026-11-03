/**
 * Pure date logic for the Fall ("Otoño") season window, resolved in
 * America/New_York regardless of the visitor's or server's timezone.
 *
 * Mirrors the Fall window of the Smart Tap app's calendar
 * (panel-premium-nov2/src/lib/season-schedule.ts), scoped down to just
 * "otono" since that's the only season this site switches on today.
 *
 * The inline script in BaseLayout.astro duplicates this logic in plain JS
 * (no imports) so the `data-season` attribute can be set before first paint
 * with zero flash. Keep both in sync if the calendar ever changes — see
 * scripts/check-season-calendar.ts for the sanity check that pins the dates.
 */

const FALL_2026 = { start: "2026-11-02", end: "2026-11-24" };

function fallRangeForYear(year: number): { start: string; end: string } {
  if (year === 2026) return FALL_2026;
  const firstDayOfNovember = new Date(Date.UTC(year, 10, 1)).getUTCDay();
  const fourthThursdayMinusTwo = 1 + ((4 - firstDayOfNovember + 7) % 7) + 21 - 2;
  return {
    start: `${year}-09-22`,
    end: `${year}-11-${String(fourthThursdayMinusTwo).padStart(2, "0")}`,
  };
}

export function localDateString(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function isFallActive(now: Date = new Date()): boolean {
  const date = localDateString(now);
  const range = fallRangeForYear(Number(date.slice(0, 4)));
  return date >= range.start && date <= range.end;
}
