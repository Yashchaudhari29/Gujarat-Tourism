import {readFile,writeFile} from 'node:fs/promises';
const read=async p=>JSON.parse(await readFile(p,'utf8'));
const sources=await read('scripts/translation-shards/source-index.json');
const dictionaries={gu:{},en:{}};
const progress=[];
for(const name of ['gu-1','gu-2','gu-3','gu-4','en-1','en-2']){
 const batch=await read('scripts/translation-shards/'+name+'.json');
 const translated=await read('src/locale/shards/'+name+'.json');
 let complete=0;
 for(const {id,source} of batch.records){if(sources[id]!==source)throw Error('Translation source index changed: '+id);const value=translated[id];if(typeof value==='string'&&value.trim()){dictionaries[batch.target][source]=value;complete++;}}
 progress.push({name,complete,total:batch.records.length,missing:batch.records.length-complete});
}
for(const lang of ['en','gu'])await writeFile('src/locale/'+lang+'.json',JSON.stringify(dictionaries[lang],null,2));
await writeFile('scripts/translation-progress.json',JSON.stringify(progress,null,2));
console.log(JSON.stringify(progress,null,2));
