import fs from 'node:fs';
import { chromium } from 'playwright';

const original='https://samrushgroupbuy.com/';
const migrated=(process.env.MIGRATED_URL || 'http://127.0.0.1:4321/').replace(/\/?$/, '/');
fs.mkdirSync('reports/live-design',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];

async function inspect(url,label,viewport){
 const page=await browser.newPage({viewport,deviceScaleFactor:1,reducedMotion:'reduce'});
 const assetFailures=[];
 page.on('response',response=>{if(response.status()>=400 && /\.(?:css|js|svg|woff2?|png|jpg|webp)(?:\?|$)/i.test(response.url()))assetFailures.push(response.status()+' '+response.url())});
 page.on('requestfailed',request=>assetFailures.push('FAILED '+request.url()+' '+request.failure()?.errorText));
 try {
  const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
  if(!response || response.status()>=400)throw new Error('Page HTTP '+response?.status()+' at '+url);
  await page.waitForLoadState('networkidle',{timeout:15000}).catch(()=>{});
  await page.evaluate(()=>document.fonts.ready);
  await page.addStyleTag({content:'*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important;scroll-behavior:auto!important}'});
  await page.waitForTimeout(900);
  // Trigger every whileInView/reveal block before capturing full-page screenshots.
  // Otherwise Playwright's full-page capture sees offscreen opacity:0 placeholders.
  await page.evaluate(async ()=>{
   const sections=Array.from(document.querySelectorAll('main section')).filter(el=>!el.parentElement?.closest('section'));
   for(const section of sections){
    section.scrollIntoView({block:'center',behavior:'instant'});
    await new Promise(resolve=>setTimeout(resolve,230));
   }
   window.scrollTo({top:0,behavior:'instant'});
  });
  await page.waitForTimeout(1000);
  const metrics=await page.evaluate(()=>{
   const details=el=>{
    const rect=el.getBoundingClientRect(),style=getComputedStyle(el);
    return {id:el.id||'',tag:el.tagName.toLowerCase(),top:Math.round(rect.top+scrollY),height:Math.round(rect.height),width:Math.round(rect.width),background:style.backgroundColor,color:style.color,fontFamily:style.fontFamily,fontSize:style.fontSize,paddingTop:style.paddingTop,paddingBottom:style.paddingBottom};
   };
   return {title:document.title,body:details(document.body),nav:document.querySelector('nav')?details(document.querySelector('nav')):null,footer:document.querySelector('footer')?details(document.querySelector('footer')):null,sections:Array.from(document.querySelectorAll('main section')).filter(el=>!el.parentElement?.closest('section')).map(details),relatedArticleLinks:Array.from(document.querySelectorAll('main section')).filter(el=>!el.parentElement?.closest('section')).at(-1)?.querySelectorAll('a') ? Array.from(Array.from(document.querySelectorAll('main section')).filter(el=>!el.parentElement?.closest('section')).at(-1).querySelectorAll('a')).map(a=>a.pathname) : []};
  });
  await page.screenshot({path:'reports/live-design/'+label+'.png',fullPage:true,animations:'disabled',timeout:60000});
  metrics.assetFailures=assetFailures;
  metrics.stylesheets=await page.evaluate(()=>Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(x=>x.href));
  return metrics;
 } finally {await page.close()}
}

const values=[['desktop',{width:1366,height:850}],['mobile',{width:390,height:844}]];
const pages=[['home',''],['privacy','privacy/'],['article','semrush-group-buy-guide/']];
for(const [device,viewport] of values) for(const [pageName,pathname] of pages){
 const live=await inspect(original+pathname,'original-'+pageName+'-'+device,viewport);
 const local=await inspect(migrated+pathname,'astro-'+pageName+'-'+device,viewport);
 const differences=[];
 if(local.assetFailures.length)differences.push(...local.assetFailures.map(s=>'Migrated asset: '+s));
 if(!local.stylesheets.length)differences.push('Migrated page has no linked CSS stylesheet');
 const compare=(label,a,b)=>{
  if(!a||!b){differences.push(label+': missing element');return}
  for(const field of ['width','height','top']){
   if(Math.abs(a[field]-b[field])>14)differences.push(label+' '+field+': original '+a[field]+', Astro '+b[field]);
  }
  for(const field of ['background','color','fontSize','fontFamily','paddingTop','paddingBottom']){
   if(a[field]!==b[field])differences.push(label+' '+field+': original '+a[field]+', Astro '+b[field]);
  }
 };
 compare('body',live.body,local.body);
 compare('nav',live.nav,local.nav);
 compare('footer',live.footer,local.footer);
 if(live.sections.length!==local.sections.length)differences.push('section count '+live.sections.length+' vs '+local.sections.length);
 if(pageName==='article' && JSON.stringify(live.relatedArticleLinks)!==JSON.stringify(local.relatedArticleLinks))
   differences.push('related article link order differs from original source');
 for(let i=0;i<Math.min(live.sections.length,local.sections.length);i++)compare('section '+(i+1)+' '+live.sections[i].id,live.sections[i],local.sections[i]);
 const report={device,page:pageName,live,local,differences};
 fs.writeFileSync('reports/live-design/'+pageName+'-'+device+'.json',JSON.stringify(report,null,2));
 results.push({device,page:pageName,liveSections:live.sections.length,migratedSections:local.sections.length,differenceCount:differences.length,differences:differences.slice(0,35)});
}
await browser.close();
console.log(JSON.stringify(results,null,2));
if(results.some(x=>x.differenceCount))process.exitCode=1;
