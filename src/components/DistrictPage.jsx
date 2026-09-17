import {useState} from 'react';
import districtPhotos from '../data/district-photos.json';
import {LanguageSwitch,useLanguage} from '../locale/context.js';
import {districtBySlug,localStories} from '../data/districts.js';
import contributions from '../data/gaurav-districts-data.json';
import texts from '../data/district-texts.json';
import recordings from '../data/district-recordings.json';
import deepData from '../data/district-deep.json';
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

/* Progressive disclosure toggle — matches existing design */
function Expandable({label,labelExpanded,children}){
 const [open,setOpen]=useState(false);
 return <div className="expandable-section">
  <button className="expand-toggle" onClick={()=>setOpen(!open)} aria-expanded={open}>
   {open?(labelExpanded||'Close'):(label||'Read the full story')} <span aria-hidden="true">{open?'▲':'▼'}</span>
  </button>
  {open&&<div className="expand-content">{children}</div>}
 </div>;
}

/* Bilingual text block — shows content in current language */
function BilingualText({data,field}){
 const {language}=useLanguage();
 if(!data||!data[field])return null;
 const content=data[field];
 if(typeof content==='string')return <p>{content}</p>;
 return <p lang={language==='gu'?'gu':'en'} className={language==='gu'?'gujarati-text':''}>{content[language]||content.en}</p>;
}

/* Timeline component */
function Timeline({items}){
 if(!items||!items.length)return null;
 const {language}=useLanguage();
 return <div className="district-timeline">
  {items.map((item,i)=><div key={i} className="timeline-entry">
   <span className="timeline-period">{item.period}</span>
   <div className="timeline-content">
    <strong>{item.event}</strong>
    <p lang={language==='gu'?'gu':'en'} className={language==='gu'?'gujarati-text':''}>{item[language]||item.en}</p>
   </div>
  </div>)}
 </div>;
}

/* Heritage sites list */
function HeritageSites({sites}){
 if(!sites||!sites.length)return null;
 return <div className="heritage-sites-list">
  {sites.map((site,i)=><article key={i} className="heritage-site-entry">
   <h3>{site.name} {site.gujaratiName&&<span lang="gu" className="gujarati-text"> · {site.gujaratiName}</span>}</h3>
   {site.period&&<span className="eyebrow">{site.period}</span>}
   <p>{site.description}</p>
  </article>)}
 </div>;
}

/* Sources list */
function SourceLinks({sources,books}){
 if((!sources||!sources.length)&&(!books||!books.length))return null;
 return <div className="deep-sources">
  {sources&&sources.length>0&&<ul className="source-list">
   {sources.map((s,i)=><li key={i}>{s.url?<a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} ↗</a>:s.title||s}</li>)}
  </ul>}
  {books&&books.length>0&&<><h3>Recommended reading</h3><ul className="source-list">{books.map((b,i)=><li key={i}>{b}</li>)}</ul></>}
 </div>;
}

/* SEO structured data */
function DistrictStructuredData({d,slug,deep}){
 const data={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
  {"@type":"ListItem","position":1,"name":"Gujarat Unveiled","item":"https://gujarat-unveiled.com/"},
  {"@type":"ListItem","position":2,"name":"Districts","item":"https://gujarat-unveiled.com/districts"},
  {"@type":"ListItem","position":3,"name":d.name,"item":`https://gujarat-unveiled.com/districts/${slug}`}
 ]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/>;
}

export default function DistrictPage({slug}){
 const [query,setQuery]=useState('');
 const {language}=useLanguage();
 const d=districtBySlug[slug],profile=contributions.find(p=>p.id===slug);
 const sections=parseDistrictChapters(texts[slug]||'');
 const deep=deepData[slug]||null;

 // Directory view
 if(!slug)return <main className="route-page" id="page-content"><LanguageSwitch/><span className="eyebrow">DISTRICT ATLAS</span><h1 tabIndex={-1}>34 districts.<br/><em>Many ways to understand Gujarat.</em></h1><div className="directory-controls"><label>Find a district<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="English or ગુજરાતી"/></label></div><div className="district-route-grid">{Object.entries(districtBySlug).filter(([s,d])=>(d.name+d.gu).toLowerCase().includes(query.toLowerCase())).map(([s,d])=><a className="related-card" key={s} href={'/districts/'+s}>{districtPhotos[s]&&<img className="district-card-photo" src={districtPhotos[s].src} alt={districtPhotos[s].caption} loading="lazy"/>}<span className="eyebrow">{d.region} Gujarat</span><h2 lang="gu">{d.gu}</h2><strong>{d.name}</strong><p>{d.teaser}</p></a>)}</div></main>;

 if(!d)return <main id="page-content" className="route-page"><h1 tabIndex={-1}>District not found</h1><a href="/districts">All districts</a></main>;

 return <main className="route-page" id="page-content">
  <DistrictStructuredData d={d} slug={slug} deep={deep}/>
  <nav className="breadcrumbs"><a href="/districts">All districts</a><span>/</span><span>{d.name}</span></nav>
  <header className="directory-heading">
   <span className="eyebrow">{d.region} GUJARAT</span>
   <h1 tabIndex={-1} lang="gu">{d.gu}</h1>
   <p>{d.teaser}</p>
  </header>
  <LanguageSwitch/>

  {districtPhotos[slug]&&<figure className="district-photo"><img src={districtPhotos[slug].src} alt={districtPhotos[slug].caption}/><figcaption>{districtPhotos[slug].caption} · <a href={districtPhotos[slug].source} target="_blank" rel="noreferrer">Image source ↗</a></figcaption></figure>}

  {/* Deep introduction — shown above the reading layout when available */}
  {deep&&deep.introduction&&<section className="district-intro-deep">
   <BilingualText data={deep} field="introduction"/>
  </section>}

  <div className="tag-list">
   <a href="#district-story">ગુજરાતી વાર્તા</a>
   <a href="#district-context">District context</a>
   {deep&&<a href="#district-deep-dive">Deep dive</a>}
   <a href="#local-stories">Related subjects</a>
   <button onClick={()=>window.print()}>Print reading view</button>
  </div>

  <div className="reading-layout">
   <aside className="chapter-nav">
    <h2>Explore this district</h2>
    <a href="#district-story">District narrative</a>
    {sections.map(chapter=><a key={chapter.id} href={'#'+chapter.id} lang="gu">{chapter.title}</a>)}
    {deep&&<>
     <a href="#district-deep-dive">Deep dive</a>
     {deep.whyItMatters&&<a href="#why-it-matters">Why it matters</a>}
     {deep.whatToNotice&&<a href="#what-to-notice">What to notice</a>}
     {deep.timeline&&<a href="#district-timeline">Timeline</a>}
     {deep.heritageSites&&<a href="#heritage-sites">Heritage sites</a>}
     {deep.ecology&&<a href="#ecology">Ecology</a>}
     {deep.craftsAndTextiles&&<a href="#crafts">Crafts & textiles</a>}
     {deep.storyArc&&<a href="#documentary-arc">Documentary arc</a>}
     {deep.sources&&<a href="#deep-sources">Sources & references</a>}
    </>}
    {profile&&Object.keys(profile).filter(k=>k!=='id'&&typeof profile[k]==='string').map(k=><a key={k} href={'#district-'+k}>{k.replace(/_/g,' ')}</a>)}
    <a href={d.site} target="_blank" rel="noopener noreferrer">District administration ↗</a>
   </aside>

   <article className="reading-body">
    {/* Section 1: Gujarati narrative (existing) */}
    <section id="district-story">
     <h2 lang="gu">જિલ્લાની સફર</h2>
     {recordings[slug]?<button data-recording={slug} className="primary">Play district narration</button>:<p className="evidence-note" lang="gu">જિલ્લાની અલગ રેકોર્ડિંગ ઉપલબ્ધ થયા પછી અહીં સાંભળી શકશો. હાલ સંપૂર્ણ લખાણ વાંચો.</p>}
     {sections.length?sections.map(chapter=><section id={chapter.id} key={chapter.id}><h3 lang="gu">{chapter.title}</h3>{chapter.paragraphs.map((text,i)=><NarrativeBlock key={i} text={text}/>)}</section>):<p lang="gu">આ જિલ્લાનું વિસ્તૃત લખાણ હજી ઉપલબ્ધ નથી.</p>}
    </section>

    {/* Section 2: District context (existing) */}
    <section id="district-context">
     <h2>District context</h2>
     <p>{d.teaser}</p>
     {!profile&&!deep&&<p>Additional district context is being prepared.</p>}
    </section>

    {/* Section 3: Deep dive (NEW — progressive disclosure) */}
    {deep&&<section id="district-deep-dive">
     <h2>Deep dive · {deep.name||d.name}</h2>

     {deep.detailedDescription&&<Expandable label="Read the full story" labelExpanded="Collapse detailed overview">
      <BilingualText data={deep} field="detailedDescription"/>
     </Expandable>}

     {deep.whyItMatters&&<section id="why-it-matters">
      <h3>Why it matters</h3>
      <BilingualText data={deep} field="whyItMatters"/>
     </section>}

     {deep.whatToNotice&&<section id="what-to-notice">
      <h3>What to notice</h3>
      <BilingualText data={deep} field="whatToNotice"/>
     </section>}

     {deep.timeline&&<section id="district-timeline">
      <h3>Historical timeline</h3>
      <Expandable label="View the full timeline" labelExpanded="Collapse timeline">
       <Timeline items={deep.timeline}/>
      </Expandable>
     </section>}

     {deep.heritageSites&&<section id="heritage-sites">
      <h3>Heritage sites</h3>
      <Expandable label={`Explore ${deep.heritageSites.length} heritage sites`} labelExpanded="Collapse sites">
       <HeritageSites sites={deep.heritageSites}/>
      </Expandable>
     </section>}

     {deep.ecology&&<section id="ecology">
      <h3>Ecology and landscape</h3>
      <BilingualText data={deep} field="ecology"/>
     </section>}

     {deep.craftsAndTextiles&&<section id="crafts">
      <h3>Crafts and textiles</h3>
      <BilingualText data={deep} field="craftsAndTextiles"/>
     </section>}

     {deep.storyArc&&<section id="documentary-arc">
      <h3>Documentary arc</h3>
      <p className="evidence-note">An original educational story structured in three chapters. Based on the linked sources below.</p>
      <Expandable label="Read the three-chapter story" labelExpanded="Collapse story">
       {['chapter1','chapter2','chapter3'].filter(k=>deep.storyArc[k]).map(k=>{
        const ch=deep.storyArc[k];
        return <div key={k} className="story-chapter-block">
         <h4>{ch.title[language]||ch.title.en}</h4>
         <p lang={language==='gu'?'gu':'en'} className={language==='gu'?'gujarati-text':''}>{ch.narration[language]||ch.narration.en}</p>
         {ch.sceneDescription&&<p className="scene-note"><em>Scene: {ch.sceneDescription}</em></p>}
         {ch.ambientSound&&<p className="scene-note"><em>Sound: {ch.ambientSound}</em></p>}
        </div>;
       })}
      </Expandable>
     </section>}

     {deep.sources&&<section id="deep-sources">
      <h3>Sources and references</h3>
      <SourceLinks sources={deep.sources} books={deep.books}/>
      {deep.editorialStatus&&<p className="evidence-note">Editorial status: {deep.editorialStatus==='pilot_complete'?'Content reviewed for this pilot profile.':'Under preparation.'} {deep.lastResearched&&` · Last researched: ${deep.lastResearched}`}</p>}
     </section>}
    </section>}

    {/* Section 4: Profile dimensions (existing gaurav data) */}
    {profile&&Object.entries(profile).filter(([k,v])=>k!=='id'&&typeof v==='string').map(([k,v])=><section id={'district-'+k} key={k}><h2>{k.replace(/_/g,' ')}</h2><p>{v}</p></section>)}

    {/* Section 5: Related subjects (existing) */}
    <section id="local-stories">
     <h2>Explore a subject</h2>
     <div className="tag-list">{(localStories[d.id]||[]).filter(id=>episodes[id]).map(id=><button key={id} data-info={id}>{episodes[id].title}</button>)}</div>
    </section>

    {/* Section 6: Sources (existing) */}
    <section>
     <h2>Sources and context</h2>
     <a href={d.site} target="_blank" rel="noopener noreferrer">Official district information ↗</a>
     <p className="evidence-note">District boundaries and data periods can differ between historical sources. The original supplied narrative is retained; a complete claim-by-claim editorial review remains necessary.</p>
    </section>
   </article>
  </div>
 </main>
}
