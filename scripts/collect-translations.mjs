import {build} from 'esbuild';
import {writeFile,readFile,readdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const output=resolve('.translation-content.mjs');
await build({entryPoints:['scripts/content-entry.jsx'],outfile:output,bundle:true,platform:'node',format:'esm',jsx:'automatic',external:['react','react/*','react-dom/*','/assets/*'],loader:{'.css':'empty'},logLevel:'silent'});
const data=await import(pathToFileURL(output));
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const routes=['/','/leadership','/districts','/development','/explore-deeper',...data.peopleCatalog.map(p=>'/leadership/'+p.id),...Object.keys(data.districtBySlug).map(s=>'/districts/'+s),...data.schemes.map(s=>'/development/'+slug(s.name))];
for(const [kind,records] of Object.entries({history:data.atlasData.sites,connections:data.connectionsData,objects:data.objectsData,people:data.peopleData,environment:[...data.environment.regions,...data.ecologyStories]}))routes.push('/explore/'+kind,...records.map(r=>'/explore/'+kind+'/'+r.id));
const strings=new Set();
const decode=s=>s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n));
function add(s){s=decode(s).trim();if(s&&/[A-Za-z\u0A80-\u0AFF]/.test(s)&&!/^https?:/.test(s)&&!s.startsWith('/assets/'))strings.add(s)}
for(const path of routes){const html=renderToStaticMarkup(createElement(data.App,{initialPath:path}));for(const m of html.matchAll(/>([^<>]+)</g))add(m[1]);for(const m of html.matchAll(/(?:placeholder|alt|aria-label|title)="([^"]+)"/g))add(m[1]);}
// Seasonal branches are reached through query strings, not separate paths.
for(const s of data.environment.seasons){const html=renderToStaticMarkup(createElement(data.App,{initialPath:'/explore/environment',initialSearch:'?season='+s.id}));for(const m of html.matchAll(/>([^<>]+)</g))add(m[1]);}
for(const text of ['Explore this district','Biography','Context','Reading','All','Born','profiles','stories available','English','ગુજરાતી'])add(text);
function collect(value){if(typeof value==='string')add(value);else if(Array.isArray(value))value.forEach(collect);else if(value&&typeof value==='object')Object.values(value).forEach(collect)}
for(const [key,value] of Object.entries(data))if(key!=='App')collect(value);
collect(JSON.parse(await readFile('src/data/district-photos.json','utf8')));
for(const name of await readdir('src/components'))if(name.endsWith('.jsx')){const source=await readFile('src/components/'+name,'utf8');for(const match of source.matchAll(/>([^<>{}]+)</g))add(match[1]);}
await writeFile('scripts/translation-strings.json',JSON.stringify([...strings],null,2));
await writeFile('scripts/current-routes.json',JSON.stringify([...new Set(routes)],null,2));
console.log('Collected',strings.size,'display strings across',routes.length,'routes');
