import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const routes=JSON.parse(readFileSync('dist/prerender-routes.json'));
for(const route of routes){
 const html=readFileSync(`dist${route==='/'?'':route}/index.html`,'utf8');
 assert.ok(html.includes(`data-prerender-path="${route}"`),`Matching hydration path ${route}`);
 assert.ok(html.includes('id="page-content"')||route==='/',`Skip link target ${route}`);
 assert.ok(!html.includes('Explorer page not found'),`Valid explorer content ${route}`);
 assert.ok(!html.includes('Profile not found'),`Valid profile ${route}`);
 // Root-relative asset URLs must work from every nested path.
 for(const m of html.matchAll(/(?:src|href)="(\/(?:assets|bundles|district-media)\/[^"#?]+)"/g)) assert.ok(existsSync('dist'+m[1]),`Missing asset ${m[1]} on ${route}`);
}
assert.ok(routes.includes('/explore/environment/r1'));
assert.ok(routes.includes('/leadership/narendra-modi'));
assert.ok(routes.includes('/districts/vav-tharad'));
console.log(`PASS: ${routes.length} prerendered routes, hydration markers, skip targets and local referenced assets`);
