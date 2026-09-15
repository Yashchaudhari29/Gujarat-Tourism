import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {mkdtemp, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const temp=await mkdtemp(join(tmpdir(),'gujarat-pages-'));
try {
 const result=await build({stdin:{contents:`
 import React from 'react';
 import {renderToStaticMarkup} from 'react-dom/server';
 import People from './src/components/PersonalitiesPage.jsx';
 import District,{parseDistrictChapters} from './src/components/DistrictPage.jsx';
 import Development,{schemeSlug,findScheme} from './src/components/DevelopmentPage.jsx';
 export {parseDistrictChapters,schemeSlug,findScheme};
 export const people=(props)=>renderToStaticMarkup(React.createElement(People,props));
 export const district=(props)=>renderToStaticMarkup(React.createElement(District,props));
 export const development=(props)=>renderToStaticMarkup(React.createElement(Development,props));
 `,resolveDir:process.cwd(),loader:'jsx'},bundle:true,platform:'node',format:'esm',banner:{js:"import {createRequire} from 'node:module';const require=createRequire(import.meta.url);"},jsx:'automatic',write:false});
 const file=join(temp,'pages.mjs');await writeFile(file,result.outputFiles[0].text);
 const pages=await import(pathToFileURL(file));
 const chapters=pages.parseDistrictChapters('**Heading**\n\nParagraph.\n\n**Next heading**\n\nSecond paragraph.');
 assert.equal(chapters.length,2);assert.equal(chapters[1].title,'Next heading');assert.equal(chapters[0].paragraphs[0],'Paragraph.');
 const first=pages.findScheme('0');assert.equal(pages.findScheme(pages.schemeSlug(first)).name,first.name);
 assert.equal(pages.findScheme('not-a-scheme'),undefined);
 assert.match(pages.development({}),/href="\/development\/sauni-yojana"/);
 assert.match(pages.development({id:'sauni-yojana'}),/SAUNI Yojana/);
 assert.match(pages.development({id:'bogus'}),/Initiative not found/);
 assert.match(pages.people({search:'?tag=nonexistent'}),/No matching profiles/);
 assert.match(pages.people({id:'bogus'}),/Profile not found/);
 assert.match(pages.district({slug:'kutch'}),/href="#district-chapter-2"/);
 assert.match(pages.district({slug:'bogus'}),/District not found/);
 console.log('Page render checks passed: chapter navigation, URL filters, initiative slugs and missing routes.');
} finally {await rm(temp,{recursive:true,force:true});}
