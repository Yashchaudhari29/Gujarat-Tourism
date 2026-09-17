import {jsx as reactJsx, jsxs as reactJsxs, Fragment} from 'react/jsx-runtime';
import { Children } from 'react';
import {useLanguage,translateText} from './context.js';
export {Fragment};
function LocalizedElement({elementType,elementProps,isStatic}){
 const {language}=useLanguage();const props={...elementProps};
 const translate=value=>Array.isArray(value)?Children.map(value, translate):typeof value==='string'?translateText(value,language):value;
 if(!props['data-no-translate']&&!['script','style','code','pre'].includes(elementType)){
  props.children=translate(props.children);
  for(const key of ['placeholder','title','alt','aria-label'])if(typeof props[key]==='string')props[key]=translateText(props[key],language);
  if(props.lang==='en'||props.lang==='gu')props.lang=language;
 }
 if(elementType==='option'&&props.value===undefined&&typeof elementProps.children==='string')props.value=elementProps.children;
 return (isStatic ? reactJsxs : reactJsx)(elementType,props);
}
export function jsx(type,props,key){return typeof type==='string'?reactJsx(LocalizedElement,{elementType:type,elementProps:props,isStatic:false},key):reactJsx(type,props,key)}
export function jsxs(type,props,key){return typeof type==='string'?reactJsx(LocalizedElement,{elementType:type,elementProps:props,isStatic:true},key):reactJsxs(type,props,key)}
