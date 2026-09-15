import {readFile,writeFile} from 'node:fs/promises';
const read=async p=>JSON.parse(await readFile(p,'utf8').then(s=>s.replace(/^\uFEFF/,'')));
const texts=await read('scripts/translation-strings.json');
const dictionaries={en:await read('src/locale/en.json'),gu:await read('src/locale/gu.json')};
const separator='\n~~~~\n';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function translate(text,from,to){for(let attempt=0;attempt<5;attempt++){try{const url='https://translate.googleapis.com/translate_a/single?'+new URLSearchParams({client:'gtx',sl:from,tl:to,dt:'t',q:text});const response=await fetch(url,{signal:AbortSignal.timeout(40000)});if(!response.ok)throw Error(response.status);const result=await response.json();return result[0].map(s=>s[0]||'').join('');}catch(e){if(attempt===4)throw e;await sleep(2000*(attempt+1));}}}
const batches=[];
for(const target of ['gu','en']){const pending=texts.filter(s=>(/[\u0A80-\u0AFF]/.test(s)?'en':'gu')===target&&!dictionaries[target][s]);let group=[],length=0;for(const s of pending){if(length+s.length>3200&&group.length){batches.push({target,group});group=[];length=0}group.push(s);length+=s.length+separator.length;}if(group.length)batches.push({target,group});}
let completed=0,failed=0;
async function worker(){while(batches.length){const {target,group}=batches.shift();try{const result=await translate(group.join(separator),target==='gu'?'en':'gu',target);const pieces=result.split(/\s*~{3,}\s*/);if(pieces.length===group.length){group.forEach((s,i)=>dictionaries[target][s]=pieces[i].trim());}else{for(const s of group)dictionaries[target][s]=(await translate(s,target==='gu'?'en':'gu',target)).trim();}completed+=group.length;if(completed%100<group.length)console.log('Translated',completed,'strings; batches left',batches.length);}catch(e){failed+=group.length;console.log('RETRY NEEDED',target,group.length,e.message)}await writeFile('src/locale/'+target+'.json',JSON.stringify(dictionaries[target],null,2));await sleep(250);}}
// One worker per language keeps dictionary writes ordered and requests modest.
await worker();
console.log('Completed',completed,'failed',failed);
