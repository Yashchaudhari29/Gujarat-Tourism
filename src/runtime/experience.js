import {navigate} from '../routes.js';
import {gauravDistricts,gauravLeadership,gauravMinisters,gauravSchemes} from '../data/gaurav.js';
import recordings from '../data/district-recordings.json';
import {districtSlug,localStories} from '../data/districts.js';
import {createDistrictPlayer} from './district-player.js';
import {createKnowledge} from './knowledge.js';
import { modiJourney, modiInitiatives, councilOfMinisters } from '../data/leadership.js';
import {regions,episodes,eras,crafts,sources,districts} from '../data/content.js';
import {createStoryPlayer} from './story-player.js';

export function mountExperience(){
const lifecycle=new AbortController();const {signal}=lifecycle;let disposed=false,atlasCleanup=()=>{};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image=(file,alt,cls='')=>`<img class="${cls}" src="/assets/${file}" alt="${esc(alt)}" loading="lazy">`;
const sourceLink=key=>{const s=sources[key]||sources.tourism;return `<a href="${s[1]}" target="_blank" rel="noopener noreferrer">${s[0]} ↗</a>`};
const dialog=$('#detail'),content=$('#detail-content');let cleanup=()=>{};
function open(html,cls=''){if(disposed)return;cleanup();cleanup=()=>{};dialog.className=cls;content.innerHTML=html;if(!dialog.open)dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';}
const details=createKnowledge({esc,sourceLink,image,open});
function close(){cleanup();cleanup=()=>{};dialog.close();document.body.style.overflow='';}
$('.close-dialog').onclick=close;dialog.addEventListener('cancel',e=>{e.preventDefault();close()},{signal});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}},{signal});
let reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;try{if(localStorage.getItem('gujarat-motion')!==null)reduced=localStorage.getItem('gujarat-motion')==='true'}catch{}
function setMotion(){document.documentElement.classList.toggle('reduce-motion',reduced);$('#motion').setAttribute('aria-pressed',reduced);window.dispatchEvent(new CustomEvent('motionchange',{detail:reduced}));}setMotion();$('#motion').onclick=()=>{reduced=!reduced;setMotion();try{localStorage.setItem('gujarat-motion',reduced)}catch{}};
$('.hero').addEventListener('pointermove',e=>{if(reduced)return;const r=$('.hero').getBoundingClientRect();$('.hero').style.setProperty('--mx',`${e.clientX-r.left}px`);$('.hero').style.setProperty('--my',`${e.clientY-r.top}px`)},{signal});
function showRegion(id){const r=regions[id];if(!r)return;open(`<div class="detail-hero">${image(r.image,r.name)}</div><div class="detail-body"><span class="eyebrow">${r.tag}</span><h2 id="detail-title">${r.title}</h2><p>${r.text}</p><div class="detail-tags">${r.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="subplaces"><h3 lang="gu">ગુજરાતીમાં વાર્તા જુઓ</h3><div>${r.episodes.map(e=>`<button data-episode="${e}">▷ <span lang="gu">${episodes[e].gu}</span></button>`).join('')}</div></div><div class="source-links" style="margin-top:24px">${sourceLink(r.source)}</div></div>`)}
let currentEra=0,eraTimer;function setEra(i){currentEra=i;const a=eras[i];$$('.era').forEach((b,j)=>{b.classList.toggle('active',i===j);b.setAttribute('aria-pressed',i===j)});$('#era-feature').innerHTML=`<div class="era-image" role="button" tabindex="0" data-info="${a.episode}" aria-label="Read about ${esc(a.title)}">${image(a.image,a.title)}</div><div class="era-copy"><span class="eyebrow">${a.label}</span><h3>${a.title}</h3><p>${a.text}</p><button class="text-button" data-episode="${a.episode}">Watch the Gujarati story <span>↗</span></button></div>`;clearInterval(eraTimer);if(!reduced)eraTimer=setInterval(()=>{if(!document.hidden&&location.pathname==='/')setEra((currentEra+1)%eras.length)},3000);}setEra(0);$$('.era').forEach(b=>b.onclick=()=>setEra(Number(b.dataset.era)));window.addEventListener('motionchange',()=>setEra(currentEra),{signal});
function showCraft(id){const c=crafts.find(x=>x.id===id);let z=1;open(`<div class="zoom-view">${image(c.image,c.name)}</div><div class="detail-body"><span class="eyebrow">THE ART OF LOOKING CLOSER</span><h2 id="detail-title">${c.name}</h2><div class="zoom-controls"><label>Photographic detail · <output id="zoom-label">100%</output></label><button id="craft-minus" aria-label="Zoom out">−</button><button id="craft-plus" aria-label="Zoom in">+</button></div><div class="annotations">${c.notes.map((n,i)=>`<button class="${i===0?'active':''}" data-note="${i}">${i+1}. ${n[0]}</button>`).join('')}</div><p id="annotation" aria-live="polite">${c.notes[0][1]}</p>${id==='patola'?'<button class="text-button" data-episode="patola">▷ Watch in Gujarati</button>':''}<div class="source-links">${sourceLink(c.source)}</div>${details.render(id)}</div>`);function zoom(d){z=Math.max(1,Math.min(3,z+d));$('.zoom-view img').style.transform=`scale(${z})`;$('#zoom-label').textContent=Math.round(z*100)+'%'}$('#craft-plus').onclick=()=>zoom(.5);$('#craft-minus').onclick=()=>zoom(-.5);$('.zoom-view').onpointermove=e=>{if(z===1)return;const r=e.currentTarget.getBoundingClientRect();$('.zoom-view img').style.transformOrigin=`${(e.clientX-r.left)/r.width*100}% ${(e.clientY-r.top)/r.height*100}%`};$$('[data-note]').forEach(b=>b.onclick=()=>{$$('[data-note]').forEach(a=>a.classList.toggle('active',a===b));$('#annotation').textContent=c.notes[+b.dataset.note][1]})}
$('.wildlife-photo').dataset.info='gir';$('.wildlife-photo').setAttribute('role','button');$('.wildlife-photo').tabIndex=0;$('.wildlife-photo').setAttribute('aria-label','Read about this habitat');
let habitat='gir';const ecosystem={gir:{plants:'Grasses and other plants capture energy from sunlight. Herbivores feed on plant material.',grazers:'Herbivores such as deer connect plants to predators through feeding relationships.',predators:'Lions and other predators depend on prey and suitable habitat. This is a simplified food chain, not the full forest web.'},kutch:{plants:'Algae and other primary producers support food webs in wetland habitats.',grazers:'Small aquatic organisms feed within the wetland food web. Their abundance changes with conditions.',predators:'Waterbirds feed in these changing wetlands. Different species have different diets; this diagram simplifies those connections.'},coast:{plants:'Algae and phytoplankton form the base of many marine feeding relationships.',grazers:'Small marine consumers feed on producers and transfer energy through the food web.',predators:'Larger consumers feed on smaller animals. Real coastal food webs branch into many connected relationships.'}};
$$('[data-habitat]').forEach(b=>b.onclick=()=>{habitat=b.dataset.habitat;$('.wildlife-photo').dataset.info=habitat==='coast'?'marine':habitat==='kutch'?'rann':'gir';$$('[data-habitat]').forEach(x=>x.classList.toggle('active',x===b));$('.wildlife-photo').style.backgroundImage=`linear-gradient(90deg,#102d29 0%,#102d29e8 29%,#102d2977 65%,#102d2944),url('/assets/${regions[habitat].image}')`;$('.wildlife-content>.primary').dataset.region=habitat;$('.wildlife-content>.primary').innerHTML=`Explore ${regions[habitat].name} <span>↗</span>`;$('#eco-detail').textContent='Select a link to see how life in this habitat connects.';});$$('[data-eco]').forEach(b=>b.onclick=()=>$('#eco-detail').textContent=ecosystem[habitat][b.dataset.eco]);
// Documentary chapters replace the earlier imagined-voice story cards.
$('#begin').innerHTML='▷ <span lang="gu">ગુજરાતીમાં સફર શરૂ કરો</span>';$('#begin').onclick=()=>showEpisode('rann');
// Accessible district directory: every district can be reached without hovering.
const districtBtn=document.createElement('a');districtBtn.href='#districts';districtBtn.className='district-cta';districtBtn.textContent='Explore all 34 districts →';$('.hero-content').append(districtBtn);
function showDistrict(id){const d=districts[id];if(d)navigate('/districts/'+districtSlug(d.name));}
const showEpisode=createStoryPlayer({$, $$, episodes, esc, sourceLink, open, isReduced:()=>reduced, onCleanup:fn=>{cleanup=fn},renderKnowledge:details.render});
const showRecording=createDistrictPlayer({$, $$, open,esc,onCleanup:fn=>{cleanup=fn},isReduced:()=>reduced,recordings});
$('#about').onclick=()=>open(`<div class="detail-body"><span class="eyebrow">ABOUT THE EXPLORATION</span><h2 id="detail-title">A more curious way to see Gujarat.</h2><p>Gujarat Unveiled is an independent educational atlas. Explore 34 district reference points, living crafts, and a growing collection of Gujarati animated photo stories.</p><p>Historical chapters draw on UNESCO records, government district information, Gujarat Tourism and the linked supporting references. This is a curated introduction, not an exhaustive history or an official government website. No complete book collection has been reviewed. The directory includes districts without a dedicated episode; these link to clearly labelled related journeys.</p><p>The atlas uses a simplified historical geographic dataset for the land shape, with approximate present-day district reference points. It does not display current district boundaries. Elevation and glowing markers are illustrative, not measured topography.</p><p>Gujarati AI narration is included with each story. Press Play to listen; use the volume slider to adjust it. Generated speech needs native-speaker review for pronunciation.</p><div class="source-links">${sourceLink('districts')}</div></div>`);
$('#credits').onclick=async()=>{let credits=[];try{credits=await(await fetch('/assets/credits.json')).json()}catch{}open(`<div class="detail-body"><span class="eyebrow">READ BEYOND THE STORY</span><h2 id="detail-title">Sources & image credits</h2><p>Each chapter links to its source. Government and UNESCO records ground the historical introductions; photographs are credited separately.</p><div class="source-links">${Object.keys(sources).map(sourceLink).join('')}<a href="https://github.com/datameet/maps/tree/master/Districts/Census_2011" target="_blank" rel="noopener noreferrer">Land geometry: DataMeet · Census 2011 · CC BY 4.0 ↗</a></div><h3 style="margin-top:28px">Photography</h3><div class="source-links">${credits.map(c=>`<a href="${esc(c.source)}" target="_blank" rel="noopener noreferrer">${esc(c.credit)} · ${esc(c.file)} ↗</a>`).join('')}</div><p class="story-type-note">Image ownership remains with the respective creators. Sources are credited; redistribution licences have not been confirmed for every photograph. This is an independent educational edition.</p></div>`)};
$('#feedback').onclick=()=>{open(`<div class="detail-body"><span class="eyebrow">A NOTE FOR THE JOURNEY</span><h2 id="detail-title">What should we explore next?</h2><p>Save a feedback note on this device. Nothing is sent to a team or server.</p><form class="feedback-form"><label for="feedback-text">Your suggestion or a correction with its source</label><textarea id="feedback-text" required maxlength="2000" placeholder="A district, a craft, a story…"></textarea><button class="primary" type="submit">Save note on this device</button><p class="feedback-status" role="status"></p></form></div>`);try{$('#feedback-text').value=localStorage.getItem('gujarat-feedback')||''}catch{}$('.feedback-form').onsubmit=ev=>{ev.preventDefault();try{localStorage.setItem('gujarat-feedback',$('#feedback-text').value);$('.feedback-status').textContent='Your note is saved on this device. It has not been sent.'}catch{$('.feedback-status').textContent='This browser could not save the note. Please copy it to keep it.'}}};
function showGaurav(type, id) {
  if (type === 'districts') {
    if (id) {
       const d = gauravDistricts.find(x => x.id === id);
       if (!d) return;
       open(`<div class="detail-body">
         <span class="eyebrow">DISTRICT CONTRIBUTION</span>
         <h2 id="detail-title">${esc(d.id.replace(/-/g,' ').toUpperCase())}</h2>
         <div class="gaurav-detail-list">
           <div class="gaurav-detail-card"><h3>Identity & Heritage</h3><p><strong>Identity:</strong> ${esc(d.identity)}</p><p><strong>Heritage:</strong> ${esc(d.heritage)}</p><p><strong>Culture:</strong> ${esc(d.culture)}</p></div>
           <div class="gaurav-detail-card"><h3>Economy & Connections</h3><p><strong>Economy:</strong> ${esc(d.economy)}</p><p><strong>Connections:</strong> ${esc(d.connections)}</p><p><strong>Geography:</strong> ${esc(d.geography)}</p></div>
           <div class="gaurav-detail-card"><h3>Public Service & Resilience</h3><p><strong>Development:</strong> ${esc(d.development)}</p><p><strong>Resilience:</strong> ${esc(d.resilience)}</p><p><strong>Future:</strong> ${esc(d.future)}</p></div>
           <div class="gaurav-detail-card"><h3>Key Contributions</h3><p><strong>State & Nation:</strong> ${esc(d.contributions)}</p><p><strong>Notable Institutions:</strong> ${esc(d.people)}</p></div>
         </div>
         <button class="primary" onclick="window.dispatchEvent(new CustomEvent('districtselect',{detail:${districts.findIndex(x=>x.name===d.id)}})); document.body.style.overflow=''" style="margin-top:24px">View on 3D Atlas</button>
       </div>`);
    } else {
       open(`<div class="detail-body">
         <span class="eyebrow">GUJARAT GAURAV</span>
         <h2 id="detail-title">District Contributions</h2>
         <p>Select a district to explore its deep heritage, economy, and state contributions.</p>
         <div class="gaurav-district-grid">
           ${gauravDistricts.map(d => `<button class="gaurav-district-btn" data-gaurav="districts" data-id="${esc(d.id)}">${esc(d.id.replace(/-/g,' ').toUpperCase())} →</button>`).join('')}
         </div>
       </div>`);
    }
  } else if (type === 'leadership') {
     open(`<div class="detail-body">
         <span class="eyebrow">GUJARAT GAURAV</span>
         <h2 id="detail-title">Leadership & Public Service</h2>
         <div class="leader-card" style="margin-top:24px; margin-bottom: 32px">
            <img src="/assets/narendra-modi.jpg" class="leader-portrait" alt="Narendra Modi" loading="lazy" />
            <div class="leader-info">
               <h3>Narendra Modi</h3>
               <p>A documented public journey from Vadnagar to Prime Minister.</p>
               <button data-gaurav="modi" class="primary" style="margin-top:16px">Explore Milestones</button>
            </div>
         </div>
         <h3>Council of Ministers</h3>
         <p>Verified current portfolios for the Union and State cabinets.</p>
         <div class="gaurav-district-grid">
           <button class="gaurav-district-btn" data-gaurav="ministers" data-id="union">Union Cabinet →</button>
           <button class="gaurav-district-btn" data-gaurav="ministers" data-id="gujarat">Gujarat Cabinet →</button>
         </div>
       </div>`);
  } else if (type === 'modi') {
     open(`<div class="detail-body">
        <span class="eyebrow">LEADERSHIP JOURNEY</span>
        <h2 id="detail-title">Narendra Modi Milestones</h2>
        <div class="leadership-timeline">
        ${gauravLeadership.map(j => `
          <div class="timeline-event">
            <strong>${esc(j.date||j.period)}: ${esc(j.role||'')}</strong>
            <h4>${esc(j.title)}</h4>
            <p>${esc(j.description)}</p>
          </div>
        `).join('')}
        </div>
     </div>`);
  } else if (type === 'ministers') {
     const list = id === 'union' ? gauravMinisters.union : gauravMinisters.gujarat;
     open(`<div class="detail-body">
        <span class="eyebrow">GOVERNANCE DIRECTORY</span>
        <h2 id="detail-title">${id === 'union' ? 'Union' : 'Gujarat'} Council of Ministers</h2>
        <div class="gaurav-detail-list">
        ${list.map(m => `
          <div class="gaurav-detail-card">
            <strong>${esc(m.name)}</strong>
            <em>${esc(m.role)}</em>
            <p><strong>Portfolios:</strong> ${esc(m.portfolio||m.portfolios)}</p>
            ${m.jurisdiction ? `<p><strong>Jurisdiction:</strong> ${esc(m.jurisdiction)}</p>` : ''}
          </div>
        `).join('')}
        </div>
     </div>`);
  } else if (type === 'development') {
     open(`<div class="detail-body">
         <span class="eyebrow">GUJARAT GAURAV</span>
         <h2 id="detail-title">Development & Resilience</h2>
         <p>Explore thematic initiatives shaping Gujarat.</p>
         <div class="gaurav-detail-list">
         ${gauravSchemes.map((s, idx) => `
           <div class="gaurav-detail-card">
             <h3>${esc(s.theme)}</h3>
             <strong>${esc(s.name)}</strong>
             <p style="margin-top:8px">${esc(s.need).substring(0,100)}...</p>
             <button data-gaurav="scheme" data-id="${idx}" class="text-button" style="margin-top:12px">Read Full Profile →</button>
           </div>
         `).join('')}
         </div>
     </div>`);
  } else if (type === 'scheme') {
     const s = gauravSchemes[parseInt(id)];
     open(`<div class="detail-body">
         <span class="eyebrow">INITIATIVE PROFILE</span>
         <h2 id="detail-title">${esc(s.name)}</h2>
         <span class="story-type-note">Theme: ${esc(s.theme)}</span>
         <div class="gaurav-detail-list">
           <div class="gaurav-detail-card"><h3>The Need & Vision</h3><p><strong>Need:</strong> ${esc(s.need)}</p><p><strong>Vision:</strong> ${esc(s.vision)}</p></div>
           <div class="gaurav-detail-card"><h3>Implementation</h3><p><strong>Policy:</strong> ${esc(s.policy)}</p><p><strong>Work:</strong> ${esc(s.work)}</p><p><strong>Responsibility:</strong> ${esc(s.responsibility)}</p></div>
           <div class="gaurav-detail-card"><h3>Impact</h3><p><strong>Beneficiaries:</strong> ${esc(s.beneficiaries)}</p><p><strong>Evidence:</strong> ${esc(s.evidence)}</p><p><strong>Challenges:</strong> ${esc(s.challenges)}</p></div>
           <div class="gaurav-detail-card"><h3>District Connect</h3><p>${esc(s.district_application)}</p></div>
         </div>
     </div>`);
  }
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-recording],[data-info],[data-region],[data-craft],[data-episode],[data-district],[data-leadership],[data-gaurav]');if(!b)return;if(b.dataset.recording)showRecording(b.dataset.recording,b.dataset.topic);else if(b.dataset.info)details.show(b.dataset.info);else if(b.dataset.region)showRegion(b.dataset.region);else if(b.dataset.craft)showCraft(b.dataset.craft);else if(b.dataset.episode)showEpisode(b.dataset.episode);else if(b.dataset.district!==undefined)showDistrict(+b.dataset.district);else if(b.dataset.leadership)navigate('/leadership/narendra-modi');else if(b.dataset.gaurav)showGaurav(b.dataset.gaurav, b.dataset.id)},{signal});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-info][role=button]')){e.preventDefault();details.show(e.target.dataset.info)}},{signal});
window.addEventListener('routechange',()=>{if(dialog.open)close()},{signal});
const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting&&location.pathname==='/'){$$('.header nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id))}},{threshold:.25});['explore','heritage','wildlife','stories'].forEach(id=>observer.observe($('#'+id)));
// Progressive enhancement: the accessible SVG atlas remains if WebGL cannot load.
import('./atlas.js').then(m=>{if(disposed)return;return m.initAtlas(districts,{showDistrict,episodes,reduced:()=>reduced,signal})}).then(destroy=>{if(!destroy)return;if(disposed)destroy();else atlasCleanup=destroy}).catch(()=>{if(!disposed)document.querySelector('.atlas-bottom>span').textContent='2D atlas · choose a region or browse all districts';});
return ()=>{clearInterval(eraTimer);disposed=true;lifecycle.abort();cleanup();observer.disconnect();atlasCleanup();districtBtn.remove();document.body.style.overflow='';};
}