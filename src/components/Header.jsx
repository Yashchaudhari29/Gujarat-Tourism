import {memo,useState,useEffect} from 'react';
export default memo(function Header({path='/'}){
  const [expanded,setExpanded]=useState(false);
  useEffect(()=>setExpanded(false),[path]);
  useEffect(()=>{
    if(!expanded)return;
    const click=e=>{if(!e.target.closest('#main-nav')&&!e.target.closest('.menu-toggle'))setExpanded(false)};
    document.addEventListener('click',click);
    return ()=>document.removeEventListener('click',click);
  },[expanded]);
  const links=[['/#explore','Explore'],['/leadership','Leadership'],['/explore-deeper','Explore deeper'],['/development','Development'],['/districts','Districts'],['/#stories','Stories']];
  return <header className={`header ${path!=='/'?'header-inner':''}`}><a className="brand" href="/" aria-label="Gujarat Unveiled home"><span className="brand-icon">✳</span><span>GUJARAT <em>UNVEILED</em></span></a><button className="menu-toggle" aria-label="Menu" aria-controls="main-nav" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{expanded?<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>:<><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></>}</svg></button><nav id="main-nav" className={expanded?'nav-open':''} aria-label="Main navigation" onKeyDown={e=>{if(e.key==='Escape'){setExpanded(false);document.querySelector('.menu-toggle')?.focus()}}}>{links.map(([href,text])=><a key={href} href={href} onClick={()=>setExpanded(false)} aria-current={href===path?'page':undefined} className={href===path?'active':''}>{text}</a>)}</nav><div className="preferences"><button id="motion" aria-pressed="false" title="Reduce motion"><span aria-hidden="true">◌</span><span className="pref-label">Reduce motion</span></button></div></header>
});
