import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import assert from 'node:assert/strict';
import {transformSync} from 'esbuild';

const base='original-source';
const originalSite=fs.readFileSync(path.join(base,'src/config/site.ts'),'utf8');
const compiled=transformSync(originalSite,{loader:'ts',format:'cjs',target:'node20'}).code;
const mod={exports:{}};
vm.runInNewContext(compiled,{module:mod,exports:mod.exports},{timeout:3500});
const pages=mod.exports.PAGES;
const site=JSON.parse(fs.readFileSync('content/site.json','utf8'));
const privacy=JSON.parse(fs.readFileSync('content/privacy.json','utf8'));
const homeSource=fs.readFileSync(path.join(base,'src/app/page.tsx'),'utf8');
const originalHomeTitle=/const HOME_META_TITLE = '([^']+)'/.exec(homeSource)?.[1];
const originalHomeDesc=/const HOME_META_DESCRIPTION\s*=\s*'([^']+)'/.exec(homeSource)?.[1];
assert.ok(originalHomeTitle && originalHomeDesc,'Original ZIP homepage SEO strings could not be read');
assert.equal(site.homeMetaTitle,originalHomeTitle,'Homepage meta title differs from original ZIP');
assert.equal(site.homeMetaDescription,originalHomeDesc,'Homepage meta description differs from original ZIP');
assert.equal(site.name,mod.exports.SITE_CONFIG.name,'Site brand name differs from original ZIP');
const originalPrivacy=fs.readFileSync(path.join(base,'src/app/privacy/page.tsx'),'utf8');
assert.ok(originalPrivacy.includes("const privacyTitle = 'Privacy Policy'"),'Unexpected original Privacy title');
assert.ok(originalPrivacy.includes('handles information when you use this site.'),'Unexpected original Privacy description');
assert.equal(privacy.seoTitle,'Privacy Policy | '+site.name,'Privacy browser title differs from original ZIP');
assert.equal(privacy.seoDescription,'How '+site.name+' handles information when you use this site.','Privacy meta description differs from original ZIP');
const files=fs.readdirSync('content/articles').filter(f=>f.endsWith('.json'));
assert.equal(files.length,Object.keys(pages).length,'Original ZIP page count differs');
for(const filename of files){
 const item=JSON.parse(fs.readFileSync(path.join('content/articles',filename),'utf8'));
 const original=pages[item.slug];
 assert.ok(original,'Original ZIP has no matching slug '+item.slug);
 for(const key of ['metaTitle','metaDescription','title','description','cluster','isPillar'])
  assert.equal(item[key],original[key],item.slug+' '+key+' differs from original ZIP');
 assert.equal(item.parentSlug??null,original.parentSlug??null,item.slug+' parent differs');
}
console.log('ORIGINAL ZIP SEMRUSH SEO PASS: homepage, Privacy Policy, and '+files.length+' articles match original unedited Next.js metadata exactly.');
