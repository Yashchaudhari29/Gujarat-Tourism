import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {build} from 'esbuild';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parseExplorerRoute,seasonalObservations,relatedRecords,explorerPath} from '../src/components/explorer-model.js';
const read=name=>fs.readFile(new URL(`../src/data/${name}.json`,import.meta.url),'utf8').then(JSON.parse);
const [env,atlas,connections,objects,people]=await Promise.all(['environment','historical-atlas','connections','objects','documentary-people'].map(read));
const collections={history:atlas.sites,connections,objects,people};
for(const season of env.seasons){
 assert.equal(seasonalObservations(env,season.id).length,env.regions.length);
 for(const region of env.regions){const matches=seasonalObservations(env,season.id,region.id);assert.equal(matches.length,1);assert.equal(matches[0].region_id,region.id);assert.equal(matches[0].season_id,season.id);}
}
assert.equal(parseExplorerRoute('/explore/invalid'),null);
assert.equal(parseExplorerRoute('/explore/objects/%E0%A4'),null);
assert.equal(parseExplorerRoute('/explore/objects/art-001/extra'),null);
for(const [kind,records] of Object.entries(collections))for(const record of records){assert.deepEqual(parseExplorerRoute(explorerPath(kind,record.id)),{kind,id:record.id});for(const related of relatedRecords(kind,record.id,collections))assert.ok(collections[related.kind].includes(related.record));}
// Temporary entry stays beside package dependencies and is always removed.
const temp=await fs.mkdtemp(path.join(process.cwd(),'.explorer-check-'));
try{
 const out=path.join(temp,'component.mjs');
 await build({entryPoints:['src/components/Explorers.jsx'],outfile:out,bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic',loader:{'.css':'empty'},logLevel:'silent'});
 const {default:Explorers}=await import(pathToFileURL(out).href);
 const render=(route,search='')=>renderToStaticMarkup(React.createElement(Explorers,{route,search}));
 for(const [kind,records] of Object.entries(collections)){
  const list=render(explorerPath(kind));assert.match(list,/<h1/);
  for(const record of records){const html=render(explorerPath(kind,record.id));assert.ok(html.includes(record.name||record.title));assert.ok(html.includes('References'));assert.ok(!html.includes('Explorer page not found'));}
 }
 const seasonal=render('/explore/environment');assert.ok(seasonal.includes('Winter'));assert.ok(seasonal.includes('North Gujarat Plains'));assert.ok(!seasonal.includes('[object Object]'));
 const region=render('/explore/environment/r1');assert.ok(region.includes('Kutch'));assert.ok(region.includes('Seasonal Gujarat'));assert.ok(!region.includes('Coastal estuaries'));
 const summer=render('/explore/environment/r1','?season=s2');
 assert.ok(summer.includes('Unalo — Summer'));
 assert.ok(summer.includes('href="/explore/environment/r2?season=s2"'));
 assert.ok(summer.includes('href="/explore/environment?season=s2"'));
 assert.ok(summer.includes('href="/explore/environment/r1?season=s3"'));
 assert.ok(!summer.includes('Dry, cool to cold nights'));
 assert.ok(render('/explore/environment/r1','?season=invalid').includes('Shiyalo — Winter'));
 assert.ok(render('/explore/environment/r2','?season=s3').includes('Chomasu — Monsoon'));
 assert.ok(render('/explore/environment/bad').includes('Explorer page not found'));
 assert.ok(render('/explore/objects/bad').includes('Explorer page not found'));
 assert.ok(render('/explore/objects/art-001').includes('/explore/connections/lothal-maritime-trade'));
 assert.ok(render('/explore/people/narsinh-mehta').includes('lang="gu"'));
 console.log(`Explorer checks passed: ${Object.values(collections).flat().length} detail pages, five directories, 12 seasonal combinations, related links and invalid routes.`);
}finally{await fs.rm(temp,{recursive:true,force:true});}
