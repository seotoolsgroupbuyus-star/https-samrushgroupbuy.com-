import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const site=JSON.parse(fs.readFileSync('content/site.json','utf8'));
const privacy=JSON.parse(fs.readFileSync('content/privacy.json','utf8'));
const decode=s=>String(s??'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const title=html=>decode(/<title>([\s\S]*?)<\/title>/.exec(html)?.[1]);
const meta=(html,attribute,value)=>[...html.matchAll(/<meta\b[^>]*>/g)].map(m=>m[0]).filter(tag=>tag.includes(attribute+'="'+value+'"')).map(tag=>decode(/\bcontent="([^"]*)"/.exec(tag)?.[1]||''))[0]||'';
function checkPage(route,expectedTitle,expectedDesc,expectedOgTitle,extraKeywords=[]){
 const filename=path.join('dist',route,'index.html');
 assert.ok(fs.existsSync(filename),'Built route missing: '+filename);
 const html=fs.readFileSync(filename,'utf8');
 assert.equal(title(html),expectedTitle,'Browser meta title '+route);
 assert.equal(meta(html,'name','description'),expectedDesc,'Meta description '+route);
 assert.equal(meta(html,'property','og:title'),expectedOgTitle,'OG title '+route);
 assert.equal(meta(html,'property','og:description'),expectedDesc,'OG description '+route);
 assert.equal(meta(html,'name','twitter:title'),expectedOgTitle,'Twitter title '+route);
 assert.equal(meta(html,'name','twitter:description'),expectedDesc,'Twitter description '+route);
 const keywords=meta(html,'name','keywords');
 for(const key of [...site.seoKeywords,...extraKeywords])
  assert.ok(keywords.split(', ').includes(key),'Missing original SEO keyword '+key+' on '+route);
}
checkPage('',site.homeMetaTitle+' | '+site.name,site.homeMetaDescription,site.homeMetaTitle);
checkPage('privacy',privacy.seoTitle,privacy.seoDescription,privacy.seoTitle,privacy.seoKeywords);
let count=0;
for(const file of fs.readdirSync('content/articles').filter(x=>x.endsWith('.json'))){
 const a=JSON.parse(fs.readFileSync(path.join('content/articles',file),'utf8'));
 if(a.status!=='published')continue;
 checkPage(a.slug,(a.metaTitle||a.title)+' | '+site.name,a.metaDescription||a.description,a.metaTitle||a.title,[a.cluster,a.title,a.slug.replace(/-/g,' ')]);
 count++;
}
console.log('BUILT SEO META PASS: homepage + privacy + '+count+' articles; exact HTML titles, descriptions, OG/Twitter titles, keywords.');
