import {readFileSync,writeFileSync,existsSync,mkdirSync,realpathSync} from 'node:fs';
import {resolve,sep,extname} from 'node:path';
import {districtBySlug} from '../src/data/districts.js';
const root=resolve('public/district-media');mkdirSync(root,{recursive:true});
const catalog={};const fail=(slug,msg)=>{throw Error(`District recording ${slug}: ${msg}`)};
for(const [slug,d] of Object.entries(districtBySlug)){
 const folder=resolve(root,slug);mkdirSync(folder,{recursive:true});mkdirSync(resolve(folder,'images'),{recursive:true});
 const config=resolve(folder,'story.json');
 if(!existsSync(config)){
  writeFileSync(config,JSON.stringify({district:slug,published:false,title:`${d.name} — a journey`,gu:d.gu,audio:'audio.mp3',script:'script.txt',sources:[],scenes:[],topics:[]},null,2)+'\n');
  writeFileSync(resolve(folder,'script.txt'),'');writeFileSync(resolve(folder,'images/.gitkeep'),'');
 }
 const m=JSON.parse(readFileSync(config,'utf8'));if(!m.published)continue;
 if(m.district!==slug)fail(slug,'district must match folder name');
 const local=(file,extensions)=>{
  if(typeof file!=='string'||!file||file.includes('\\')||file.startsWith('/')||file.split('/').includes('..'))fail(slug,'unsafe or missing local filename');
  const p=resolve(folder,file);if(!p.startsWith(folder+sep)||!existsSync(p))fail(slug,`file not found: ${file}`);
  if(!realpathSync(p).startsWith(realpathSync(folder)+sep))fail(slug,'symlinks must stay within district folder');
  if(extensions&&!extensions.includes(extname(p).toLowerCase()))fail(slug,`unsupported file: ${file}`);
  return p;
 };
 local(m.audio,['.mp3','.m4a','.ogg','.wav']);const script=readFileSync(local(m.script,['.txt']),'utf8').trim();if(!script)fail(slug,'script.txt is empty');
 if(!m.title||!m.gu||!Array.isArray(m.scenes)||!m.scenes.length)fail(slug,'title, Gujarati title and scenes are required');
 const url=file=>'/district-media/'+slug+'/'+file.split('/').map(encodeURIComponent).join('/');
 let end=0;
 const scenes=m.scenes.map((s,i)=>{
  if(!Number.isFinite(s.start)||!Number.isFinite(s.end)||Math.abs(s.start-end)>.05||s.end<=s.start)fail(slug,`scene ${i+1}: use consecutive, increasing timestamps in seconds, starting at 0`);
  if(!s.title||!s.text)fail(slug,`scene ${i+1}: title and script excerpt are required`);
  local(s.image,['.jpg','.jpeg','.png','.webp']);end=s.end;
  if(s.focus&&!/^\d+(?:\.\d+)?% \d+(?:\.\d+)?%$/.test(s.focus))fail(slug,'focus must be two percentages');
  return {...s,image:url(s.image)};
 });
 const topicIds=new Set();for(const t of m.topics||[]){if(!/^[a-z0-9-]+$/.test(t.id)||topicIds.has(t.id)||!t.title||!Number.isFinite(t.start)||!Number.isFinite(t.end)||t.start<0||t.end<=t.start||t.end>end)fail(slug,'invalid topic id or timestamp range');topicIds.add(t.id);}
 if(!Array.isArray(m.sources)||!m.sources.length)fail(slug,'add at least one source');
 for(const s of m.sources){if(!s.title||!/^https:\/\//.test(s.url))fail(slug,'source links require a title and HTTPS URL');}
 catalog[slug]={...m,districtId:d.id,audio:url(m.audio),script,scenes,topics:m.topics||[]};
}
writeFileSync('src/data/district-recordings.json',JSON.stringify(catalog,null,2)+'\n');
console.log(`District folders ready: ${Object.keys(districtBySlug).length}. Published recordings: ${Object.keys(catalog).length}.`);
