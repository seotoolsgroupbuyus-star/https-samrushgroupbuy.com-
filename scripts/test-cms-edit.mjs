import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';

const paths=['content/site.json','content/ui.json','content/articles/semrush-group-buy-guide.json'];
const backups=new Map(paths.map(p=>[p,fs.readFileSync(p,'utf8')]));
const marker='CMS_EDIT_SIMULATION_87642';
function read(p){return JSON.parse(fs.readFileSync(p,'utf8'))}
function save(p,v){fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n')}
try {
 const site=read(paths[0]);site.hero.title=marker+'_HERO';site.plans[0].monthlyPrice=919;save(paths[0],site);
 const ui=read(paths[1]);ui.footer.description=marker+'_FOOTER';save(paths[1],ui);
 const article=read(paths[2]);article.title=marker+'_ARTICLE';save(paths[2],article);
 execFileSync('npm',['run','build'],{stdio:'inherit',timeout:180000,env:process.env});
 const home=fs.readFileSync('dist/index.html','utf8');
 const guide=fs.readFileSync('dist/semrush-group-buy-guide/index.html','utf8');
 assert.ok(home.includes(marker+'_HERO'),'CMS hero edit not visible in homepage HTML');
 assert.ok(home.includes(marker+'_FOOTER'),'CMS footer edit not visible in homepage HTML');
 assert.ok(home.includes('919'),'CMS pricing edit not visible in homepage HTML');
 assert.ok(guide.includes(marker+'_ARTICLE'),'CMS article title edit not visible in article HTML');
 console.log('CMS LIVE BUILD TEST PASS: changing site JSON, UI copy, plan price and article title updates generated pages.');
} finally {
 for(const [p,text] of backups)fs.writeFileSync(p,text);
}
