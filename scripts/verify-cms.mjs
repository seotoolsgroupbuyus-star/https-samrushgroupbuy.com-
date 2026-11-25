import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import YAML from 'yaml';

const config=YAML.parse(fs.readFileSync('.pages.yml','utf8'),{strict:true,uniqueKeys:true});
assert.ok(Array.isArray(config.content),'Pages CMS content collections are missing');
assert.ok(Array.isArray(config.media),'Pages CMS media sources are missing');
const errors=[];
const sources=new Map(config.content.map(entry=>[entry.path,entry]));
function audit(value,fields,scope) {
 const known=new Map((fields||[]).map(f=>[f.name,f]));
 if(value&&typeof value==='object'&&!Array.isArray(value)) {
  for(const [key,child] of Object.entries(value)) {
   const field=known.get(key);
   if(!field) {errors.push(scope+'.'+key+' has no Pages CMS field');continue;}
   if(Array.isArray(child)){
    if(!field.list){errors.push(scope+'.'+key+' should be an editable list');continue;}
    if(child[0]&&typeof child[0]==='object'&&!Array.isArray(child[0])) for(const [index,item] of child.entries())audit(item,field.fields,scope+'.'+key+'['+index+']');
   }else if(child&&typeof child==='object'){
    if(field.type!=='object')errors.push(scope+'.'+key+' should be an object field');
    else audit(child,field.fields,scope+'.'+key);
   }
  }
 }
}
for(const file of ['content/site.json','content/ui.json','content/privacy.json']){
 const entry=sources.get(file);
 assert.ok(entry,'Pages CMS does not expose '+file);
 assert.equal(entry.type,'file');
 assert.equal(entry.format,'json');
 audit(JSON.parse(fs.readFileSync(file,'utf8')),entry.fields,file);
}
const articles=sources.get('content/articles');
assert.ok(articles&&articles.type==='collection','Articles collection missing from Pages CMS');
const articleNames=fs.readdirSync('content/articles').filter(name=>name.endsWith('.json'));
assert.equal(articleNames.length,35,'Original 35 SEO article records must remain');
for(const file of articleNames){
 const item=JSON.parse(fs.readFileSync(path.join('content/articles',file),'utf8'));
 audit(item,articles.fields,'content/articles/'+file);
}
assert.ok(articles.fields.find(f=>f.name==='content'&&f.type==='rich-text'&&f.options?.format==='html'),'Article content must have rich-text HTML editor');
const data=JSON.parse(fs.readFileSync('content/site.json','utf8'));
assert.ok(data.plans.every(p=>p.buyUrl===data.paymentBaseUrl),'All plan checkout URLs must use CMS payment host');
assert.ok(data.supportWhatsappNumber,'Support phone number missing');
assert.ok(config.media.some(x=>x.name==='logos'),'Tool logo media source is missing');
for(const entry of config.content){
 const names=(entry.fields||[]).map(f=>f.name);
 if(new Set(names).size!==names.length)errors.push(entry.path+': duplicate CMS fields');
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('PAGES CMS PASS: 35 articles, all JSON settings, nested page copy, plans, pricing, images, rich-text and media fields have editors.');
