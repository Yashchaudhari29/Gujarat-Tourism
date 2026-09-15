import {jsx as reactJsx,Fragment} from 'react/jsx-runtime';
import {useLanguage,translateText} from './context.js';
export {Fragment};
function LocalizedElement({elementType,elementProps}){
 const {language}=useLanguage();const props={...elementProps};
 const translate=value=>Array.isArray(value)?value.map(translate):typeof value==='string'?translateText(value,language):value;
 if(!props['data-no-translate']&&!['script','style','code','pre'].includes(elementType)){
  props.children=translate(props.children);
  for(const key of ['placeholder','title','alt','aria-label'])if(typeof props[key]==='string')props[key]=translateText(props[key],language);
  if(props.lang==='en'||props.lang==='gu')props.lang=language;
 }
 if(elementType==='option'&&props.value===undefined&&typeof elementProps.children==='string')props.value=elementProps.children;
 return reactJsx(elementType,props);
}
export function jsx(type,props,key){return typeof type==='string'?reactJsx(LocalizedElement,{elementType:type,elementProps:props},key):reactJsx(type,props,key)}
export const jsxs=jsx;
