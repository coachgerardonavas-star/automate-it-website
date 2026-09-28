const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
(async()=>{
 const base=process.argv[2]; if (!base) throw new Error('Falta URL'); const out=process.argv[3] || '.verification/e2e'; fs.mkdirSync(out,{recursive:true});
 const report={time:new Date().toISOString(),base,referenceMainCommit:process.env.VERIFICATION_REFERENCE_COMMIT || null,serverCommitClaimed:false,checks:[],errors:[]};
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:844}});
  const page=await ctx.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  for(const path of ['/','/en/','/diagnostico','/en/diagnostic','/blog','/blog/cuando-el-negocio-crece-pero-sigues-igual-de-ocupado','/quienes-somos','/demo','/en/demo','/portal/login']){
   const r=await page.goto(base+path,{waitUntil:'domcontentloaded'});
   report.checks.push({type:'public',path,status:r.status(),url:page.url()});
   if(r.status()!==200) throw new Error(path+' returned '+r.status());
  }
  for(const path of ['/portal','/portal/activity','/portal/admin','/portal/admin/demo','/portal/appointments','/portal/automations','/portal/conversations','/portal/customers','/portal/files','/portal/insights','/portal/leads','/portal/reports','/portal/settings']){
   const r=await ctx.request.get(base+path,{maxRedirects:0});
   const location=r.headers()['location'];
   report.checks.push({type:'protected',path,status:r.status(),location});
   if(r.status()!==302||!location?.startsWith('/portal/login')) throw new Error(path+' expected 302 login, got '+r.status());
  }
  for(const [path,target] of [['/empresas','/'],['/privacidad','/privacy-policy'],['/terminos','/terms'],['/en/privacy','/en/privacy-policy']]){
   const r=await ctx.request.get(base+path,{maxRedirects:0});
   report.checks.push({type:'redirect',path,status:r.status(),location:r.headers()['location']});
   if(r.status()!==301||r.headers()['location']!==target) throw new Error(path+' redirect changed');
  }
  for(const lang of ['es','en']){
   const demoCtx=await browser.newContext({viewport:{width:390,height:844}});
   const demo=await demoCtx.newPage();
   demo.on('pageerror',e=>report.errors.push(e.message));
   await demo.goto(base+(lang==='es'?'/demo/':'/en/demo/'),{waitUntil:'domcontentloaded'});
   await demo.locator('input[name="name"]').fill('Prueba');
   await demo.locator('input[name="business"]').fill('Negocio de prueba');
   const button=demo.locator('form[data-entry-form] button[type="submit"]');
   const buttonText=await button.innerText();
   const responseWait=demo.waitForResponse(r=>new URL(r.url()).pathname==='/portal' && r.request().method()==='GET');
   await button.click();
   const portal=await responseWait;
   await demo.waitForURL(base+'/portal');
   const body=await demo.locator('body').innerText();
   if(portal.status()!==200||!body.includes('Prueba')||!body.includes('Negocio de prueba')||!/demo|ejemplo|sample/i.test(body)) throw new Error('Demo failed '+lang);
   if (!body.includes('42 s') || !body.includes('$14,400') || !body.includes('287')) throw new Error('Missing seeded metrics '+lang);
   await demo.screenshot({path:out+'/demo-'+lang+'.png',fullPage:true});
   report.checks.push({type:'demo-flow',lang,buttonText,status:portal.status(),personalized:true,exampleData:true});
   for(const path of ['/portal/leads','/portal/conversations','/portal/settings']){
    const r=await demo.goto(base+path,{waitUntil:'domcontentloaded'});
    report.checks.push({type:'demo-route',lang,path,status:r.status()});
    if(r.status()!==200) throw new Error('Demo '+path+' failed');
   }
   await demoCtx.close();
  }
  const sm=await ctx.request.get(base+'/sitemap-0.xml');
  const urls=[...(await sm.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
  report.checks.push({type:'sitemap',status:sm.status(),count:urls.length,excluded:!urls.some(x=>/\/portal|\/demo|\/keystatic/.test(x))});
  if(sm.status()!==200||urls.length!==50||urls.some(x=>/\/portal|\/demo|\/keystatic/.test(x))) throw new Error('Sitemap changed');
  for(const path of ['/demo/','/en/demo/','/portal/login','/consultoria/','/acuerdo-colaboracion/']){
   const r=await ctx.request.get(base+path);
   const html=await r.text();
   const noindex=/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)||/noindex/.test(r.headers()['x-robots-tag']||'');
   report.checks.push({type:'noindex',path,noindex});
   if(!noindex) throw new Error('Missing noindex '+path);
  }

  const production='https://yourbizupgraded.com';
  const productionSm=await ctx.request.get(production+'/sitemap-0.xml');
  const prodUrls=[...(await productionSm.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]).sort();
  const sameSitemap=JSON.stringify([...urls].sort())===JSON.stringify(prodUrls);
  report.checks.push({type:'sitemap-identity',productionCount:prodUrls.length,sameSitemap});
  if(!sameSitemap)throw new Error('Sitemap URL mismatch against production');
  for(const path of ['/demo/','/en/demo/','/portal/login','/consultoria/','/acuerdo-colaboracion/','/d/verification-missing-document']){
   const read=async origin=>{const r=await ctx.request.get(origin+path);const html=await r.text();return {header:r.headers()['x-robots-tag']||null,meta:[...html.matchAll(/<meta[^>]*name=["']robots["'][^>]*>/gi)].map(m=>m[0]).sort()};};
   const a=await read(base),b=await read(production);const same=JSON.stringify(a)===JSON.stringify(b);
   report.checks.push({type:'noindex-identity',path,same,robots:a});
   if(!same)throw new Error('Noindex mismatch '+path);
  }
  report.passed=report.errors.length===0;

 }catch(e){report.passed=false;report.failure=e.message;}
 finally{await browser.close();fs.writeFileSync(out+'/playwright.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}
 if(!report.passed)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
