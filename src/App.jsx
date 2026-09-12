import { useLayoutEffect, useState, useEffect } from 'react';
import { mountExperience } from './runtime/experience.js';
import {legacyRoutes,normalizePath} from './routes.js';
import Header from './components/Header.jsx';
import HeroAtlas from './components/HeroAtlas.jsx';
import Destinations from './components/Destinations.jsx';
import DistrictDirectory from './components/DistrictDirectory.jsx';
import GujaratGaurav from './components/GujaratGaurav.jsx';
import Heritage from './components/Heritage.jsx';
import Wildlife from './components/Wildlife.jsx';
import Stories from './components/Stories.jsx';
import Footer from './components/Footer.jsx';
import DetailDialog from './components/DetailDialog.jsx';
import PersonalitiesPage from './components/PersonalitiesPage.jsx';
import ExploreDeeperHub from './components/ExploreDeeperHub.jsx';
import Explorers from './components/Explorers.jsx';
import DistrictPage from './components/DistrictPage.jsx';
import DevelopmentPage from './components/DevelopmentPage.jsx';
export default function App({initialPath='/'}) {
 const [path,setPath]=useState(initialPath);
 useLayoutEffect(()=>mountExperience(),[]);
 useEffect(()=>{
  const update=()=>{const old=legacyRoutes[location.hash];if(old)history.replaceState({},'',old);setPath(normalizePath(location.pathname));window.dispatchEvent(new Event('routechange'));requestAnimationFrame(()=>{if(location.hash){document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant'})}else{window.scrollTo(0,0);document.querySelector('.route-page h1')?.focus({preventScroll:true})}})};
  const click=e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download'))return;const url=new URL(a.href,location.href);if(url.origin!==location.origin||/\.[a-z0-9]+$/i.test(url.pathname))return;e.preventDefault();history.pushState({},'',url.pathname+url.search+url.hash);update()};
  document.addEventListener('click',click);window.addEventListener('popstate',update);window.addEventListener('hashchange',update);window.addEventListener('appnavigate',update);update();
  return()=>{document.removeEventListener('click',click);for(const x of ['popstate','hashchange','appnavigate'])window.removeEventListener(x,update)};
 },[]);
 const home=path==='/';
 return <><a className="skip" href={home?'/#explore':'#page-content'}>Skip to content</a><Header path={path}/><main id="home-content" hidden={!home}>
 <HeroAtlas/><Destinations/><DistrictDirectory/><GujaratGaurav/><Heritage/><Wildlife/><Stories/>
 </main>
 {path.startsWith('/leadership')&&<PersonalitiesPage key={path} id={path.split('/')[2]}/>}
 {path==='/explore-deeper'&&<ExploreDeeperHub/>}
 {path.startsWith('/explore/')&&<Explorers route={path}/>}
 {path.startsWith('/districts')&&<DistrictPage slug={path.split('/')[2]}/>}
 {path.startsWith('/development')&&<DevelopmentPage id={path.split('/')[2]}/>}
 {!home&&!/^\/(leadership|explore-deeper|explore|districts|development)(\/|$)/.test(path)&&<section className="route-page"><h1 tabIndex={-1}>Page not found</h1><a className="primary" href="/">Return to Gujarat</a></section>}
 <Footer/><DetailDialog/></>;
}
