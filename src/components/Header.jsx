import {memo,useState,useEffect} from 'react';
export default memo(function Header({path='/'}){
 const [expanded,setExpanded]=useState(false);
 useEffect(()=>setExpanded(false),[path]);
 const links=[['/#explore','Explore'],['/#gaurav','ગુજરાત ગૌરવ'],['/leadership','Leadership'],['/explore-deeper','Explore deeper'],['/#heritage','Heritage & art'],['/#wildlife','Wildlife'],['/#stories','Stories']];
 return <header className={`header ${path!=='/'?'header-inner':''}`}><a className="brand" href="/" aria-label="Gujarat Unveiled home"><span className="brand-icon">✳</span><span>GUJARAT <em>UNVEILED</em></span></a><button className="menu-toggle" aria-controls="main-nav" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>Menu</button><nav id="main-nav" className={expanded?'nav-open':''} aria-label="Main navigation" onKeyDown={e=>{if(e.key==='Escape'){setExpanded(false);document.querySelector('.menu-toggle')?.focus()}}}>{links.map(([href,text])=><a key={href} href={href} onClick={()=>setExpanded(false)} aria-current={href===path?'page':undefined} className={href===path?'active':''}>{text}</a>)}</nav><div className="preferences"><button id="motion" aria-pressed="false" title="Reduce motion"><span aria-hidden="true">◌</span><span className="pref-label">Reduce motion</span></button></div></header>
});
