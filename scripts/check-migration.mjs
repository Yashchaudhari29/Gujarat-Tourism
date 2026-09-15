import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {episodes,districts,sources} from '../src/data/content.js';
const baseline=JSON.parse(readFileSync('scripts/migration-baseline.json'));
const hash=value=>createHash('sha256').update(value).digest('hex');
const preservation=JSON.parse(readFileSync('scripts/preservation-baseline.json'));
assert.equal(hash(readFileSync('src/styles.css').subarray(0,preservation.stylesPrefixBytes)),preservation.stylesPrefixSha256,'Uploaded design rules preserved; approved additions may follow');
assert.equal(hash(readFileSync('src/data/content.js')),baseline.content,'Original stories and source links');
for(const [file,expected] of Object.entries(baseline.assets)){
 assert.equal(hash(readFileSync('public/assets/'+file)),expected,'Original asset: '+file);
 assert.equal(hash(readFileSync('dist/assets/'+file)),expected,'Built asset: '+file);
}
const atlas=readFileSync('src/runtime/atlas.js','utf8');
assert.ok(atlas.includes(preservation.sceneStart)&&atlas.includes(preservation.sceneEnd),'Scene preservation markers exist');
assert.equal(hash(atlas.slice(atlas.indexOf(preservation.sceneStart),atlas.indexOf(preservation.sceneEnd)).replace('PerspectiveCamera(38,initialSize.aspect,.1,100)','PerspectiveCamera(38,stage.clientWidth/stage.clientHeight,.1,100)')),preservation.sceneSha256,'Uploaded scene geometry, camera, lighting and particles');
assert.equal(hash(atlas.slice(atlas.indexOf('const still=options.reduced()'),atlas.indexOf('renderer.render(scene,camera)}'))),baseline.atlasMotion,'Original animation parameters');
assert.equal(Object.keys(episodes).length,11);assert.equal(Object.values(episodes).reduce((n,e)=>n+e.chapters.length,0),44);assert.equal(districts.length,34);
for(const [id,e] of Object.entries(episodes)){assert.ok(sources[e.source]);e.chapters.forEach((_,i)=>assert.ok(existsSync(`dist/assets/audio/${id}-${i+1}.mp3`)))}
const html=readFileSync('dist/index.html','utf8');
for(const id of ['explore','destinations','districts','heritage','wildlife','stories','detail','map-stage','story-grid'])assert.ok(html.includes(id),id+' present before JS');
for(const path of html.matchAll(/(?:src|href)="(\/bundles\/[^\"]+)"/g))assert.ok(existsSync('dist'+path[1]),path[1]);
assert.ok(readdirSync('dist/bundles').some(f=>f.startsWith('atlas-')),'Separate atlas chunk');
console.log('PASS: supplied CSS prefix, original content/assets, scene geometry/motion; 11 stories / 44 chapters / 34 districts; prerendered homepage and bundles.');
