import {districts} from './content.js';
export const districtSlug=name=>name.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const localStories={0:['rann','dholavira'],1:['ahmedabad','lothal','sabarmati'],14:['somnath','gir'],15:['marine'],16:['gir'],18:['modhera'],24:['stepwell','patola']};
export const districtBySlug=Object.fromEntries(districts.map(d=>[districtSlug(d.name),d]));
