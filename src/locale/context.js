import {createContext,createElement,useContext,useEffect,useState} from 'react';
import gu from './gu.json';
import en from './en.json';
import uiGu from './ui-gu.json';
import {fullTranslationReady} from './status.js';
let translationReporter=null;
export const setTranslationReporter=reporter=>{translationReporter=reporter};
export function translateText(value,language){if(typeof value!=='string'||!value.trim())return value;const key=value.trim();const translated=language==='gu'?(uiGu[key]||gu[key]):en[key];if(!translated&&((language==='gu'&&/[A-Za-z]/.test(key)&&!/[\u0A80-\u0AFF]/.test(key))||(language==='en'&&/[\u0A80-\u0AFF]/.test(key))))translationReporter?.(key,language);return translated?value.replace(key,translated):value;}
const LanguageContext=createContext({language:'en',setLanguage:()=>{}});
export const useLanguage=()=>useContext(LanguageContext);
export function TranslationNotice(){const {language}=useLanguage();if(fullTranslationReady)return null;return createElement('p',{className:'translation-notice','data-no-translate':true,lang:language},language==='gu'?'ગુજરાતી અનુવાદનું કામ ચાલુ છે. હાલમાં મેનુ અને મુખ્ય શીર્ષકો બદલાય છે; જે લખાણનો અનુવાદ તૈયાર નથી તે મૂળ ભાષામાં દેખાય છે.':'Bilingual edition in progress: controls and headings are translated; unfinished passages remain in their original language.');}
export function LanguageProvider({children,initialLanguage='en'}){
 const [language,setLanguage]=useState(initialLanguage);
 useEffect(()=>{const saved=localStorage.getItem('gujarat-language');if(saved==='gu')setLanguage(saved);},[]);
 useEffect(()=>{document.documentElement.lang=language;window.dispatchEvent(new CustomEvent('languagechange',{detail:language}));},[language]);
 const choose=value=>{setLanguage(value);localStorage.setItem('gujarat-language',value)};
 return createElement(LanguageContext.Provider,{value:{language,setLanguage:choose}},children);
}
function LanguageButtons(){const {language,setLanguage}=useLanguage();return createElement('div',{className:'language-switch',role:'group','aria-label':'Reading language'},...['en','gu'].map(value=>createElement('button',{key:value,type:'button','aria-pressed':language===value,className:language===value?'active':'',onClick:()=>setLanguage(value),'data-no-translate':true},value==='en'?'English':'ગુજરાતી')));}
export function LanguageSwitch(){return createElement('div',{className:'reading-language-controls'},createElement(LanguageButtons),createElement(TranslationNotice));}
