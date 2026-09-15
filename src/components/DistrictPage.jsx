import {useState} from 'react';
import districtPhotos from '../data/district-photos.json';
import {LanguageSwitch} from '../locale/context.js';
import {districtBySlug,localStories} from '../data/districts.js';
import contributions from '../data/gaurav-districts-data.json';
import texts from '../data/district-texts.json';
import recordings from '../data/district-recordings.json';
import {episodes} from '../data/content.js';
// Preserve source wording while giving standalone Markdown headings their own anchors.
export function parseDistrictChapters(text='') {
 const chapters=[];
 for(const block of text.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean)){
  const match=block.match(/^\*\*([^\n]+)\*\*$/)||block.match(/^#{1,6}\s+([^\n]+)$/);
  if(match){chapters.push({id:`district-chapter-${chapters.length+1}`,title:match[1],paragraphs:[]});}
  else {if(!chapters.length)chapters.push({id:'district-chapter-1',title:'જિલ્લાની ઓળખ',paragraphs:[]});chapters[chapters.length-1].paragraphs.push(block);}
 }
 return chapters;
}
function NarrativeBlock({text}) {
 const lines=text.split('\n');
 if(lines.every(line=>/^[-*]\s+/.test(line.trim())))return <ul lang="gu" className="gujarati-text">{lines.map((line,i)=><li key={i}>{line.replace(/^[-*]\s+/,'').replace(/\*\*/g,'')}</li>)}</ul>;
 return <p lang="gu" className="gujarati-text">{text.replace(/\*\*/g,'')}</p>;
}
export default function DistrictPage({slug}){
 const [query,setQuery]=useState('');const d=districtBySlug[slug],profile=contributions.find(p=>p.id===slug);const sections=parseDistrictChapters(texts[slug]||'');
 if(!slug)return <main className="route-page" id="page-content"><LanguageSwitch/><span className="eyebrow">DISTRICT ATLAS</span><h1 tabIndex={-1}>34 districts.<br/><em>Many ways to understand Gujarat.</em></h1><div className="directory-controls"><label>Find a district<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="English or ગુજરાતી"/></label></div><div className="district-route-grid">{Object.entries(districtBySlug).filter(([s,d])=>(d.name+d.gu).toLowerCase().includes(query.toLowerCase())).map(([s,d])=><a className="related-card" key={s} href={'/districts/'+s}>{districtPhotos[s]&&<img className="district-card-photo" src={districtPhotos[s].src} alt={districtPhotos[s].caption} loading="lazy"/>}<span className="eyebrow">{d.region} Gujarat</span><h2 lang="gu">{d.gu}</h2><strong>{d.name}</strong><p>{d.teaser}</p></a>)}</div></main>;
 if(!d)return <main id="page-content" className="route-page"><h1 tabIndex={-1}>District not found</h1><a href="/districts">All districts</a></main>;
 return <main className="route-page" id="page-content"><nav className="breadcrumbs"><a href="/districts">All districts</a><span>/</span><span>{d.name}</span></nav><header className="directory-heading"><span className="eyebrow">{d.region} GUJARAT</span><h1 tabIndex={-1} lang="gu">{d.gu}</h1><p>{d.teaser}</p></header><LanguageSwitch/>{districtPhotos[slug]&&<figure className="district-photo"><img src={districtPhotos[slug].src} alt={districtPhotos[slug].caption}/><figcaption>{districtPhotos[slug].caption} · <a href={districtPhotos[slug].source} target="_blank" rel="noreferrer">Image source ↗</a></figcaption></figure>}<div className="tag-list"><a href="#district-story">ગુજરાતી વાર્તા</a><a href="#district-context">District context</a><a href="#local-stories">Related subjects</a><button onClick={()=>window.print()}>Print reading view</button></div><div className="reading-layout"><aside className="chapter-nav"><h2>Explore this district</h2><a href="#district-story">District narrative</a>{sections.map(chapter=><a key={chapter.id} href={'#'+chapter.id} lang="gu">{chapter.title}</a>)}{profile&&Object.keys(profile).filter(k=>k!=='id'&&typeof profile[k]==='string').map(k=><a key={k} href={'#district-'+k}>{k.replace(/_/g,' ')}</a>)}<a href={d.site} target="_blank" rel="noopener noreferrer">District administration ↗</a></aside><article className="reading-body"><section id="district-story"><h2 lang="gu">જિલ્લાની સફર</h2>{recordings[slug]?<button data-recording={slug} className="primary">Play district narration</button>:<p className="evidence-note" lang="gu">જિલ્લાની અલગ રેકોર્ડિંગ ઉપલબ્ધ થયા પછી અહીં સાંભળી શકશો. હાલ સંપૂર્ણ લખાણ વાંચો.</p>}{sections.length?sections.map(chapter=><section id={chapter.id} key={chapter.id}><h3 lang="gu">{chapter.title}</h3>{chapter.paragraphs.map((text,i)=><NarrativeBlock key={i} text={text}/>)}</section>):<p lang="gu">આ જિલ્લાનું વિસ્તૃત લખાણ હજી ઉપલબ્ધ નથી.</p>}</section><section id="district-context"><h2>District context</h2><p>{d.teaser}</p>{!profile&&<p>Additional district context is being prepared.</p>}</section>{profile&&Object.entries(profile).filter(([k,v])=>k!=='id'&&typeof v==='string').map(([k,v])=><section id={'district-'+k} key={k}><h2>{k.replace(/_/g,' ')}</h2><p>{v}</p></section>)}<section id="local-stories"><h2>Explore a subject</h2><div className="tag-list">{(localStories[d.id]||[]).filter(id=>episodes[id]).map(id=><button key={id} data-info={id}>{episodes[id].title}</button>)}</div></section><section><h2>Sources and context</h2><a href={d.site} target="_blank" rel="noopener noreferrer">Official district information ↗</a><p className="evidence-note">District boundaries and data periods can differ between historical sources. The original supplied narrative is retained; a complete claim-by-claim editorial review remains necessary.</p></section></article></div></main>
}
