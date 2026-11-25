import fs from 'node:fs';
import path from 'node:path';
const s=JSON.parse(fs.readFileSync('content/site.json'));
const docs=fs.readdirSync('content/articles').filter(x=>x.endsWith('.json'));
const assert=(x,m)=>{if(!x)throw Error(m)};
assert(s.siteUrl==='https://samrushgroupbuy.com','Original production URL was changed');
assert(s.paymentBaseUrl==='https://pay.samrushgroupbuy.com','Wrong pay subdomain');
assert(docs.length===35,'Missing original routes');
for(const p of docs){const d=JSON.parse(fs.readFileSync(path.join('content/articles',p)));assert(d.slug+'.json'===p,'Bad file '+p);assert(d.metaTitle&&d.metaDescription,'Missing SEO fields '+p)}
assert(s.plans.length===3,'Original plans missing');
assert(s.plans.map(p=>p.monthlyPrice).join(',')==='5,25,35','Original price changed');
assert(s.plans.every(p=>p.buyUrl===s.paymentBaseUrl),'Legacy checkout URL still used');
for(const asset of ['logos/semrush.svg','logos/ahrefs.png','logos/canva.svg','og.svg'])assert(fs.existsSync(path.join('public',asset)),'Missing asset '+asset);
console.log('SOURCE-SCOPED PASS: '+docs.length+' routes, 3 preserved plan prices, SEO metadata, CMS data and bundled public assets.');
