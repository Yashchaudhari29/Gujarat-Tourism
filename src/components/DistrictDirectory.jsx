import { memo, useMemo, useState } from 'react';
import { districts } from '../data/content.js';
import { districtSlug } from '../data/districts.js';

export default memo(function DistrictDirectory(){
 const [query,setQuery]=useState(''),[region,setRegion]=useState('all');
 const visible=useMemo(()=>{const q=query.trim().toLowerCase();return districts.filter(d=>(d.name.toLowerCase().includes(q)||d.gu.includes(q))&&(region==='all'||region===d.region))},[query,region]);
 return <section id="districts" className="district-section section-wrap">
 <div className="section-heading"><div><span className="eyebrow">THE DISTRICT ATLAS</span><h2>34 districts. Countless beginnings.</h2></div><a className="text-button" href="/#explore">Back to the 3D map ↑</a></div>
 <div className="district-toolbar"><label className="district-search"><span>⌕</span><input id="district-search" placeholder="Find a district · જિલ્લો શોધો" aria-label="Search districts by English or Gujarati name" value={query} onChange={e=>setQuery(e.target.value)}/></label><label>Region <select id="district-filter" value={region} onChange={e=>setRegion(e.target.value)}><option value="all">All Gujarat</option><option value="kutch">Kutch</option><option value="north">North Gujarat</option><option value="central">Central Gujarat</option><option value="saurashtra">Saurashtra</option><option value="south">South Gujarat</option></select></label><span id="district-count" aria-live="polite">{visible.length} districts</span></div>
 <div className="district-grid" id="district-grid">{visible.length?visible.map(d=><a className="district-item" href={'/districts/'+districtSlug(d.name)} key={d.id}><span lang="gu">{d.gu}</span><span>{d.name} <b>↗</b></span></a>):<p>No matching districts. Try another name or region.</p>}</div>
 <p className="atlas-disclaimer">District locations are approximate reference points, not administrative boundaries. The directory includes Vav-Tharad. Linked regional stories may be outside the selected district.</p>
 </section>;
});
