import site from '../../content/site.json';
const pages=import.meta.glob('../../content/articles/*.json',{eager:true,import:'default'});
export function GET(){const routes=['/','/privacy/',...Object.values(pages).filter(x=>x.status==='published').map(x=>'/'+x.slug+'/')];const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(p=>'<url><loc>'+site.siteUrl+p+'</loc></url>').join('')+'</urlset>';return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8'}})}
