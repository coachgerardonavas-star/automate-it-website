import assert from "node:assert/strict";
import test from "node:test";
import worker from "./secure-entry.js";

test("fails closed when the Telegram webhook secret is absent", async () => {
  const response = await worker.fetch(new Request("https://worker.example/", { method: "POST" }), {}, {});
  assert.equal(response.status, 500);
});

test("rejects a POST with the wrong Telegram secret", async () => {
  const response = await worker.fetch(
    new Request("https://worker.example/", { method: "POST", headers: { "X-Telegram-Bot-Api-Secret-Token": "wrong" } }),
    { TELEGRAM_WEBHOOK_SECRET: "expected" },
    {},
  );
  assert.equal(response.status, 401);
});
