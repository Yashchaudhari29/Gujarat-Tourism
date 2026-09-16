import {knowledge} from '../data/knowledge.js';
import {translateText} from '../locale/context.js';
const tr = s => typeof s === 'string' ? translateText(s, document.documentElement.lang) : s;
import {episodes,crafts} from '../data/content.js';
export function createKnowledge({esc,sourceLink,image,open}){
 const render=(id,includeTranscript=false)=>{const k=knowledge[id];if(!k)return '';const e=episodes[id];return `<section class="knowledge-section"><span class="eyebrow">"+tr("LOOK DEEPER")+"</span><h3>"+tr("Context, evidence & connections")+"</h3><dl class="knowledge-facts">${k.facts.map(([key,value])=>`<div><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>${k.sections.map(([heading,text])=>`<article><h4>${esc(heading)}</h4><p>${esc(text)}</p></article>`).join('')}${includeTranscript&&e?`<h3 lang="gu">વિગતવાર ગુજરાતી વાંચન</h3>${e.chapters.map(c=>`<article lang="gu"><h4>${esc(c[0])}</h4><p>${esc(c[1])}</p></article>`).join('')}`:''}<div class="source-links">${sourceLink(k.source)}${k.extraSource?`<a href="${esc(k.extraSource[1])}" target="_blank" rel="noopener noreferrer">${esc(k.extraSource[0])} ↗</a>`:''}</div></section>`};
 const show=id=>{const e=episodes[id]||crafts.find(c=>c.id===id);if(!e)return;open(`<div class="detail-hero">${image(e.image,e.title||e.name)}</div><div class="detail-body"><span class="eyebrow">"+tr("EXPLORE THE DETAILS")+"</span><h2 id="detail-title">${esc(e.title||e.name)}</h2>${episodes[id]?`<button class="text-button" data-episode="${id}">▷ <span lang="gu">ગુજરાતીમાં વાર્તા સાંભળો</span></button>`:''}${render(id,true)}</div>`)};
 return {render,show};
}
