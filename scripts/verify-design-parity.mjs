import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const read=file=>fs.readFileSync(file,'utf8');
const classes=source=>[...source.matchAll(/className\s*=\s*"([^"]*)"/g)].map(m=>m[1]);
const checks=[
 ...['Hero','Pricing','SharedAccess','ComparisonVisual','PremiumTools','ToolbarSection','TransparencySection','Reviews','FAQ','Navbar','Footer','Layout','Logo','ChatWidget','Limitations','ToolDetail','ExtensionAccess','Contact','SocialProof'].map(name=>[
  'original-source/src/components/'+name+'.tsx','src/react/components/'+name+'.tsx'
 ]),
 ['original-source/src/views/Home.tsx','src/react/views/Home.tsx'],
 ['original-source/src/views/DynamicPage.tsx','src/react/views/DynamicPage.tsx'],
 ['original-source/src/app/privacy/page.tsx','src/react/PrivacyContent.tsx']
];
let total=0;
for(const [original,migrated] of checks) {
 assert.ok(fs.existsSync(migrated),'Missing migrated component '+migrated);
 assert.deepEqual(classes(read(migrated)),classes(read(original)),
  'Visual CSS class order changed in '+migrated+' compared with '+original);
 total++;
}
assert.equal(read('src/styles/global.css'),read('original-source/src/app/globals.css'),
 'Global theme CSS differs from Next.js original');
const homeSections=s=>[...s.matchAll(/<(Hero|Pricing|SharedAccess|ComparisonVisual|PremiumTools|ToolbarSection|TransparencySection|Reviews|FAQ)\s*\/>/g)].map(x=>x[1]);
assert.deepEqual(homeSections(read('src/react/views/Home.tsx')),homeSections(read('original-source/src/views/Home.tsx')),
 'Homepage section order changed');
const logoDir='original-source/public/logos';
for(const file of fs.readdirSync(logoDir)) {
 assert.deepEqual(fs.readFileSync(path.join('public/logos',file)),fs.readFileSync(path.join(logoDir,file)), 'Logo changed: '+file);
}
console.log('DESIGN PARITY PASS: '+total+' components, original CSS class order, theme CSS, homepage section order and logos.');
