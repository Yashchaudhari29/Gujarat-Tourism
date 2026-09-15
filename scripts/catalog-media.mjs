import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
const read=async p=>JSON.parse(await readFile(p,'utf8').then(s=>s.replace(/^\uFEFF/,'')));
const portraits=await read('public/assets/portraits/manifest.json');
const biographies=await read('src/data/people-biographies.json');
const landmarks=await read('src/data/district-landmarks.json');
const districtFile='src/data/district-photos.json';
const photos=existsSync(districtFile)?await read(districtFile):{};
const source=await readFile('src/data/people-catalog.js','utf8');
const names=[...new Set([...source.matchAll(/names:\[([^\]]+)\]/g)].flatMap(m=>[...m[1].matchAll(/'([^']+)'/g)].map(x=>x[1])))];
const aliases={'Sardar Vallabhbhai Patel':'Vallabhbhai Patel','Bhikhaiji Cama':'Bhikaiji Cama','K. M. Munshi':'Kanaiyalal Maneklal Munshi','Tribhuvandas Patel':'Tribhuvandas Kishibhai Patel','Hansa Mehta':'Hansa Jivraj Mehta','Dhumketu':'Dhumketu (writer)','Akho':'Akha Bhagat','Sardarsinh Rana':'S. R. Rana'};
const sleep=ms=>new Promise(r=>setTimeout(r,Math.max(5500,ms)));
async function get(url){const r=await fetch(url,{signal:AbortSignal.timeout(25000)});if(!r.ok)throw Error(r.status+' '+url);return r;}
async function photo(summary,path){let url=summary.thumbnail?.source?.split('?')[0];if(!url)throw Error('No photograph');if(url.includes('upload.wikimedia.org')&&!url.includes('/thumb/')){const u=new URL(url);const pieces=u.pathname.split('/');const file=pieces.at(-1);pieces.splice(3,0,'thumb');url='https://thumb.wikimedia.org'+pieces.join('/')+'/250px-'+file;}
 const r=await get(url);if(!r.headers.get('content-type')?.startsWith('image/'))throw Error('Image response is not an image');const ext=new URL(url).pathname.split('.').at(-1);const file=path+'.'+ext;await writeFile('public'+file,new Uint8Array(await r.arrayBuffer()));return {src:file,source:summary.content_urls.desktop.page,original:summary.originalimage?.source?.split('?')[0],title:summary.title};}
await mkdir('public/assets/districts',{recursive:true});
for(const name of names){const title=aliases[name]||name;try{if(biographies[title]&&portraits[title])continue;await sleep(1400);const summary=await(await get('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(title.replaceAll(' ','_')))).json();if(summary.type==='disambiguation')throw Error('Ambiguous biography');biographies[title]={extract:summary.extract,source:summary.content_urls.desktop.page,title:summary.title};if(!portraits[title])portraits[title]=await photo(summary,'/assets/portraits/'+title.toLowerCase().replace(/[^a-z0-9]+/g,'-'));console.log('PERSON',name);}catch(e){console.log('REVIEW PERSON',name,e.message);}await writeFile('src/data/people-biographies.json',JSON.stringify(biographies,null,2));await writeFile('public/assets/portraits/manifest.json',JSON.stringify(portraits,null,2));}
for(const [slug,title] of Object.entries(landmarks)){try{if(photos[slug]&&!photos[slug].original?.toLowerCase().includes('logo'))continue;await sleep(1400);const summary=await(await get('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(title.replaceAll(' ','_')))).json();if(summary.type==='disambiguation')throw Error('Ambiguous landmark');photos[slug]={...await photo(summary,'/assets/districts/'+slug),caption:title,description:summary.description};console.log('DISTRICT',slug,title);}catch(e){console.log('REVIEW DISTRICT',slug,title,e.message);}await writeFile(districtFile,JSON.stringify(photos,null,2));}
