import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("./index.js", import.meta.url), "utf8");

test("lead handoff has no committed Make capability URL", () => {
  assert.doesNotMatch(source, /https:\/\/hook\.[a-z0-9.-]*make\.com\/[A-Za-z0-9]+/i);
});

test("lead handoff requires both Worker secrets", () => {
  assert.match(source, /env\.LEAD_WEBHOOK_URL/);
  assert.match(source, /env\.MAKE_WEBHOOK_KEY/);
  assert.match(source, /fetch\(env\.LEAD_WEBHOOK_URL/);
});
