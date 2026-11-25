import fs from 'node:fs';
import { chromium } from 'playwright';

const original='https://samrushgroupbuy.com/';
const migrated='http://127.0.0.1:4321/';
fs.mkdirSync('reports/live-design',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];

async function inspect(url,label,viewport){
 const page=await browser.newPage({viewport,deviceScaleFactor:1,reducedMotion:'reduce'});
 try {
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
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
   return {title:document.title,body:details(document.body),nav:document.querySelector('nav')?details(document.querySelector('nav')):null,footer:document.querySelector('footer')?details(document.querySelector('footer')):null,sections:Array.from(document.querySelectorAll('main section')).filter(el=>!el.parentElement?.closest('section')).map(details)};
  });
  await page.screenshot({path:'reports/live-design/'+label+'.png',fullPage:true,animations:'disabled',timeout:60000});
  return metrics;
 } finally {await page.close()}
}

const values=[['desktop',{width:1366,height:850}],['mobile',{width:390,height:844}]];
for(const [device,viewport] of values){
 const live=await inspect(original,'original-'+device,viewport);
 const local=await inspect(migrated,'astro-'+device,viewport);
 const differences=[];
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
 for(let i=0;i<Math.min(live.sections.length,local.sections.length);i++)compare('section '+(i+1)+' '+live.sections[i].id,live.sections[i],local.sections[i]);
 const report={device,live,local,differences};
 fs.writeFileSync('reports/live-design/'+device+'.json',JSON.stringify(report,null,2));
 results.push({device,liveSections:live.sections.length,migratedSections:local.sections.length,differenceCount:differences.length,differences:differences.slice(0,35)});
}
await browser.close();
console.log(JSON.stringify(results,null,2));
if(results.some(x=>x.differenceCount))process.exitCode=1;
