import { useLayoutEffect, useState, useEffect } from 'react';
import { mountExperience } from './runtime/experience.js';
import { legacyRoutes, normalizePath, resolveRoute } from './routes.js';
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
import {LanguageProvider,LanguageSwitch,TranslationNotice} from './locale/context.js';

export default function App(props){return <LanguageProvider initialLanguage={props.initialLanguage||'en'}><AppContent {...props}/></LanguageProvider>}
function AppContent({initialPath = '/', initialSearch = ''}) {
  const [locationState, setLocationState] = useState({path: normalizePath(initialPath), search: initialSearch, hash: '', action: 'initial'});
  const {path, search, hash, action} = locationState;
  useLayoutEffect(() => mountExperience(), []);
  useEffect(() => {
    const update = (action = 'push') => {
      const old = legacyRoutes[window.location.hash];
      if (old) window.history.replaceState({}, '', old);
      setLocationState({path: normalizePath(window.location.pathname), search: window.location.search, hash: window.location.hash, action});
      window.dispatchEvent(new Event('routechange'));
    };
    const click = event => {
      const anchor = event.target.closest?.('a[href]');
      if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !['http:', 'https:'].includes(url.protocol) || /\.[a-z0-9]+$/i.test(url.pathname)) return;
      event.preventDefault();
      const samePage = url.pathname === window.location.pathname;
      if (url.href !== window.location.href) window.history.pushState({}, '', url.pathname + url.search + url.hash);
      update(samePage && url.search ? 'filter' : 'push');
    };
    const pop = () => update('pop');
    const change = () => update('push');
    document.addEventListener('click', click);
    window.addEventListener('popstate', pop);
    window.addEventListener('hashchange', change);
    window.addEventListener('appnavigate', change);
    update('initial');
    return () => {
      document.removeEventListener('click', click);
      window.removeEventListener('popstate', pop);
      window.removeEventListener('hashchange', change);
      window.removeEventListener('appnavigate', change);
    };
  }, []);
  useEffect(() => {
    // Run after React commits the target page; deep anchors may not exist before it.
    const frame = requestAnimationFrame(() => {
      if (hash) {
        let id; try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
        const target = document.getElementById(id);
        if (target && !target.closest('[hidden]')) {
          target.scrollIntoView({behavior: 'instant'});
          if (id === 'page-content' || id === 'explore') {target.setAttribute('tabindex', '-1'); target.focus({preventScroll: true});}
        }
      } else if (action !== 'pop' && action !== 'filter') {
        window.scrollTo(0, 0);
        document.querySelector('.route-page h1')?.focus({preventScroll: true});
      }
      const title = path === '/' ? 'Gujarat Unveiled' : document.querySelector('.route-page h1')?.textContent;
      document.title = title ? `${title}${path === '/' ? '' : ' · Gujarat Unveiled'}` : 'Gujarat Unveiled';
    });
    return () => cancelAnimationFrame(frame);
  }, [locationState]);
  const route = resolveRoute(path), home = route.type === 'home';
  return <>
    <a className="skip" href={home ? '/#explore' : '#page-content'}>Skip to content</a>
    <Header path={path}/>
    <main id="home-content" hidden={!home}><HeroAtlas/><div className="section-wrap home-reading-controls"><LanguageSwitch/></div><Destinations/><DistrictDirectory/><GujaratGaurav/><Heritage/><Wildlife/><Stories/></main>
    {route.type === 'leadership' && <PersonalitiesPage key={path} id={route.id} search={search}/>}
    {route.type === 'hub' && <ExploreDeeperHub/>}
    {route.type === 'explorer' && <Explorers key={path} route={path} search={search}/>}
    {route.type === 'districts' && <DistrictPage key={path} slug={route.id}/>}
    {route.type === 'development' && <DevelopmentPage key={path} id={route.id}/>}
    {route.type === 'not-found' && <main id="page-content" className="route-page"><h1 tabIndex={-1}>Page not found</h1><p>This address does not match a page in the atlas.</p><a className="primary" href="/">Return to Gujarat</a></main>}
    <Footer/><DetailDialog/>
  </>;
}
