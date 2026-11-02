/**
 * Sanity check for src/lib/season-calendar.ts — pins the Fall ("Otoño")
 * window against the dates called out when the Smart Tap section shipped.
 * Run with: node scripts/check-season-calendar.ts
 */
import { isFallActive } from "../src/lib/season-calendar.ts";

const cases: [string, boolean][] = [
  ["2026-11-01", false],
  ["2026-11-02", true],
  ["2026-11-24", true],
  ["2026-11-25", false],
  ["2027-09-21", false],
  ["2027-09-22", true],
  ["2027-11-23", true],
  ["2027-11-24", false],
];

let failed = false;
for (const [date, expected] of cases) {
  // Noon UTC keeps the check away from the America/New_York day boundary.
  const got = isFallActive(new Date(`${date}T12:00:00Z`));
  const ok = got === expected;
  if (!ok) failed = true;
  console.log(`${ok ? "ok " : "FAIL"} ${date} -> ${got} (expected ${expected})`);
}

if (failed) {
  console.error("season-calendar sanity check FAILED");
  process.exit(1);
}
console.log("season-calendar sanity check passed");
