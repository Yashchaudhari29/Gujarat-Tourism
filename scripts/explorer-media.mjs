import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
const file='src/data/explorer-media.json';
const images=existsSync(file)?JSON.parse(await readFile(file,'utf8')):{};
await mkdir('public/assets/explorers',{recursive:true});
for(const [id,title] of [['site_vadnagar','Vadnagar'],['site_uparkot','Uparkot Fort'],['eco-grasslands','Blackbuck National Park, Velavadar'],['site_surkotada','Surkotada'],['site_rojdi','Rojdi'],['site_vallabhi','Vallabhi'],['site_cambay','Khambhat'],['site_junagadh','Girnar'],['art-pithora','Pithora (painting)']]){
 if(images[id])continue;
 try{const summary=await(await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(title))).json();let original=summary.thumbnail?.source?.split('?')[0];if(!original||summary.type==='disambiguation')throw Error('No verified image');let url=original;if(url.includes('upload.wikimedia.org')&&!url.includes('/thumb/')){const pieces=new URL(url).pathname.split('/');const name=pieces.at(-1);pieces.splice(3,0,'thumb');url='https://thumb.wikimedia.org'+pieces.join('/')+'/250px-'+name;}const r=await fetch(url);if(!r.ok||!r.headers.get('content-type')?.startsWith('image/'))throw Error('Image unavailable');const src='/assets/explorers/'+id+'.'+new URL(url).pathname.split('.').at(-1);await writeFile('public'+src,new Uint8Array(await r.arrayBuffer()));images[id]={src,source:summary.content_urls.desktop.page,original,title};console.log(id,original);}catch(e){console.log('REVIEW',id,e.message)}await new Promise(r=>setTimeout(r,1600));
}
await writeFile(file,JSON.stringify(images,null,2));
