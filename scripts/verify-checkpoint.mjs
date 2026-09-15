import {spawnSync} from 'node:child_process';
import {writeFile} from 'node:fs/promises';
const results=[];
for(const script of ['scripts/collect-translations.mjs','scripts/audit-content.mjs','node_modules/vite/bin/vite.js','scripts/prerender.mjs','scripts/check-prerender.mjs','scripts/check-routes.mjs','scripts/check-pages.mjs']){
 const args=script.includes('/vite/')?[script,'build']:[script];
 const r=spawnSync(process.execPath,args,{encoding:'utf8',maxBuffer:12*1024*1024});
 results.push({script,status:r.status,stdout:r.stdout,stderr:r.stderr});console.log(script,'exit',r.status);if(r.status)console.log((r.stderr||r.stdout||'').slice(-2000));
 if(script.includes('/vite/')&&r.status!==0)break;
}
await writeFile('scripts/checkpoint-verification.json',JSON.stringify(results,null,2));
