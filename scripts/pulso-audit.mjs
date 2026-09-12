import assert from 'node:assert/strict';
import vm from 'node:vm';
import { writeFileSync } from 'node:fs';
import { pulsoProspects } from '../src/lib/pulso/prospects.ts';
import { pulsoProspects11to15 } from '../src/lib/pulso/prospects-11-15.ts';
import { pulsoProspects16to20 } from '../src/lib/pulso/prospects-16-20.ts';
import { pulsoProspects21to30 } from '../src/lib/pulso/prospects-21-30.ts';
import { pulsoProspects31to40 } from '../src/lib/pulso/prospects-31-40.ts';
import { pulsoProspect14Override } from '../src/lib/pulso/prospect-14-override.ts';
import { pulsoProspect27Override } from '../src/lib/pulso/prospect-27-override.ts';

// Node 22.18+; fetches real HTML and executes its inline analytics scripts in
// an isolated JS context. This proves calls/queueing, NOT GA4 persistence.
const base = process.argv[2] || 'http://localhost:4321';
const records = [...pulsoProspects, ...pulsoProspects11to15, ...pulsoProspects16to20, ...pulsoProspects21to30, ...pulsoProspects31to40];
assert.equal(records.length, 40);
for (const key of ['id', 'slug']) assert.equal(new Set(records.map(p => p[key])).size, 40, `duplicate ${key}`);
assert.equal(new Set(records.flatMap(p => [p.id, p.slug])).size, 80, 'cross-key collision');
const effective = records.map(p => [pulsoProspect14Override, pulsoProspect27Override].find(o => o.id === p.id) || p);
const expectedIds = ['little-miracles-016','fl-upholstery-017','orlando-pa-018','all-floridian-019','sol-borinquen-020','capella-immigration-021','immigration-universe-022','city-driving-school-023','kissimmee-notary-024','garay-eye-care-025','mrs-busy-bee-026','cleanair-contractors-027','legacy-fencing-028','in-phaze-electric-029','cg-auto-center-030','ana-studio-031','third-coat-032','sumtek-shoes-033','eco-green-auto-parts-034','maintenance-team-solutions-035','venelegal-036','rgc-builders-037','pa-paraguana-038','sofrito-latin-cafe-039','al-renovations-040'];
const expectedSlugs = ['little-miracles-pediatrics','fl-upholstery','orlando-public-adjusters','all-floridian-insurance','sol-de-borinquen-bakery','capella-immigration-law','immigration-universe-attorneys','city-driving-school','kissimmee-notary-public','garay-eye-care','mrs-busy-bee-air-conditioning','cleanair-contractors-usa','legacy-fencing-corp','in-phaze-electric','cg-auto-center','ana-studio','third-coat','sumtek-shoes-usa','eco-green-auto-parts','maintenance-team-solutions','venelegal','rgc-builders','pa-paraguana','sofrito-latin-cafe','al-renovations'];
assert.deepEqual(effective.slice(15).map(p => p.id), expectedIds);
assert.deepEqual(effective.slice(15).map(p => p.slug), expectedSlugs);
const decode = s => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
// Cloudflare encodes public email text at the edge; normalize that transport
// transformation before comparing historical copy with its source record.
const decodeCloudflareEmails = html => html.replace(/<a\b[^>]*data-cfemail="([a-f0-9]+)"[^>]*>[\s\S]*?<\/a>/gi, (_, hex) => {
  const bytes = Buffer.from(hex, 'hex');
  return Buffer.from(bytes.subarray(1).map(byte => byte ^ bytes[0])).toString('utf8');
});

function execute(html, query) {
  let click;
  const loaded = [];
  const context = vm.createContext({ URLSearchParams, setTimeout: () => {}, document: {
    documentElement: {lang:'es'}, readyState:'loading',
    head: {appendChild: s => loaded.push(s.src)}, createElement: () => ({}),
    getElementById: id => id === 'pulso-cta' ? {addEventListener: (name, fn) => { if (name === 'click') click = fn; }} : null,
  }});
  context.window = context;
  context.location = {search: query};
  context.addEventListener = () => {};
  for (const [, attrs, script] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (!attrs.includes('application/ld+json') && (script.includes('window.trackEvent') || script.includes('prospectId'))) vm.runInContext(script, context);
  }
  const before = JSON.parse(JSON.stringify(Array.from(context.dataLayer || [], e => Array.from(e))));
  click?.();
  const after = JSON.parse(JSON.stringify(Array.from(context.dataLayer || [], e => Array.from(e))));
  return {before, after, loaded, hasTracker: typeof context.trackEvent === 'function'};
}

const results = [];
for (let index = 0; index < effective.length; index++) {
  const p = effective[index];
  const row = {number:index+1, slug:p.slug, id:p.id, contact:p.contactFirstName, cases:[]};
  for (const query of index >= 15 ? ['', '?source=qr', '?qa=1', '?source=qr&qa=1'] : ['?qa=1']) {
    const result = {query};
    try {
      const response = await fetch(`${base}/pulso/${p.slug}${query}`, {redirect:'manual'});
      result.http = response.status;
      assert.equal(response.status, 200);
      const html = await response.text();
      const text = decode(decodeCloudflareEmails(html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<[^>]*>/g,''));
      assert.ok(text.includes(p.name), 'business');
      assert.ok(text.includes(`${p.contactFirstName}, ${p.title}`), 'contact/title');
      for (const f of p.facts) { assert.ok(text.includes(f.title), 'fact title'); assert.ok(text.includes(f.body), 'fact body'); }
      for (const k of ['intro','unknowns','review','closing']) assert.ok(text.includes(p[k]), k);
      const cta = html.match(/<a\b[^>]*id="pulso-cta"[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/);
      assert.ok(cta, 'CTA');
      assert.equal(cta[2], 'Hablar con Gerardo');
      const href = new URL(decode(cta[1]));
      assert.equal(href.origin + href.pathname, 'https://wa.me/14074049495');
      assert.equal(href.searchParams.get('text'), `Hola Gerardo, vi la revisión que preparaste para ${p.name} y quiero hablar contigo.`);
      assert.match(html, /<meta name="robots" content="noindex,nofollow"/);
      assert.doesNotMatch(html, /href=["']tel:|bit-chat-3126|id="chatbot|id="whatsapp-float/i);
      assert.doesNotMatch(text, /407.?404.?9495|407.?214.?5114/);
      if (index >= 15) {
        assert.ok(text.includes('Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.'));
        const events = execute(html, query);
        const qa = query.includes('qa=1');
        const names = events.after.filter(e => e[0] === 'event').map(e => e[1]);
        assert.deepEqual(names, qa ? [] : [...(query.includes('source=qr') ? ['pulso_qr_scan'] : []), 'pulso_landing_view','pulso_cta_call']);
        if (qa) { assert.equal(events.after.length, 0, 'QA must also suppress GA page_view'); assert.equal(events.hasTracker, false); }
        for (const e of events.after.filter(e => e[0] === 'event')) {
          assert.equal(e[2].prospect_id,p.id); assert.equal(e[2].company_slug,p.slug); assert.equal(e[2].campaign,'pulso_print');
        }
        result.events = names;
      }
      if (index === 26) { assert.doesNotMatch(html, /https:\/\/cleanaircontractors\.com/); assert.ok(html.includes('https://cleanaircontractorsusa.godaddysites.com/contact-us')); }
      result.pass = true;
    } catch(error) { result.pass = false; result.error = error.message; }
    row.cases.push(result);
  }
  row.pass = row.cases.every(c => c.pass);
  results.push(row);
  console.log(`${row.number} ${p.slug}: ${row.pass ? 'PASS' : 'FAIL'} ${row.cases.filter(c=>!c.pass).map(c=>c.error).join('; ')}`);
}
const report = {date:new Date().toISOString(), base, method:'HTTP + isolated inline JS execution; not backend persistence', results};
if (process.argv[3]) writeFileSync(process.argv[3], JSON.stringify(report,null,2));
if (results.some(r=>!r.pass)) process.exitCode = 1;
