import site from '../../../content/site.json';
const modules=import.meta.glob('../../../content/articles/*.json',{eager:true,import:'default'});
const records=Object.values(modules) as any[];

export {site};
export const SITE_CONFIG={name:site.name,url:site.siteUrl,description:site.description,clusters:[]};
export const PAGES=Object.fromEntries(records.filter(p=>p.status==='published').map(p=>[p.slug,p])) as Record<string,any>;
export const contentAuthors=site.authorProfiles;
export function getAuthorForSlug(slug:string){let h=0;for(let i=0;i<slug.length;i++)h=(Math.imul(31,h)+slug.charCodeAt(i))|0;return contentAuthors[Math.abs(h)%contentAuthors.length]}
export function authorInitialsFromName(name:string){return name.trim().split(/\s+/).map(s=>s[0]).join('').slice(0,2).toUpperCase()}
export function absoluteUrl(base:string,path:string){return /^https?:\/\//.test(path)?path:base.replace(/\/$/,'')+'/'+path.replace(/^\//,'')}
