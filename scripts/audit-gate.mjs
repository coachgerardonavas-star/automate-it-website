#!/usr/bin/env node
// Fails CI only on advisories outside a documented allowlist of build-tooling
// packages (Astro/Vite/esbuild dev-server, Wrangler/Miniflare, Puppeteer, Sharp).
// None of these ship in the deployed Worker/site output — they run only during
// `npm run build` / local `astro dev` / screenshot scripts. Real supply-chain
// risks (leaked secrets, private keys) are still caught by glasswing-security.yml.
//
// Revisit this list when @astrojs/cloudflare or wrangler get a major bump —
// see git history around "revert: volver a Astro 4 / Cloudflare 11" for why
// that upgrade isn't done casually.
import { execSync } from "node:child_process";

const ALLOWLISTED_PACKAGES = new Set([
  "astro",
  "astro-integration-kit",
  "@astrojs/cloudflare",
  "@astrojs/markdoc",
  "@astrojs/react",
  "@inox-tools/astro-when",
  "esbuild",
  "vite",
  "wrangler",
  "miniflare",
  "undici",
  "ws",
  "sharp",
  "puppeteer",
  "puppeteer-core",
  "@puppeteer/browsers",
  "extract-zip",
]);

const auditArgs = process.argv.slice(2);
let report;
try {
  const raw = execSync(`npm audit --json ${auditArgs.join(" ")}`, {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 20,
  });
  report = JSON.parse(raw);
} catch (err) {
  // npm audit exits non-zero when it finds vulnerabilities; stdout still has the JSON.
  report = JSON.parse(err.stdout);
}

const vulnerabilities = report.vulnerabilities ?? {};
const unexpected = Object.entries(vulnerabilities).filter(
  ([name]) => !ALLOWLISTED_PACKAGES.has(name)
);

if (unexpected.length > 0) {
  console.error("Unallowlisted vulnerabilities found:\n");
  for (const [name, v] of unexpected) {
    console.error(`  ${name} - ${v.severity}`);
  }
  console.error(
    "\nThese are not in scripts/audit-gate.mjs's ALLOWLISTED_PACKAGES. Fix them or, if they are confirmed build-tooling-only, add them to the allowlist with a comment explaining why."
  );
  process.exit(1);
}

const allowlistedFound = Object.entries(vulnerabilities);
if (allowlistedFound.length > 0) {
  console.log("Allowlisted build-tooling vulnerabilities present (not blocking CI):\n");
  for (const [name, v] of allowlistedFound) {
    console.log(`  ${name} - ${v.severity}`);
  }
} else {
  console.log("No vulnerabilities found.");
}
