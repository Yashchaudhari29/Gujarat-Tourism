export const legacyRoutes = {'#personalities':'/leadership','#people-explorer':'/leadership','#explore-deeper':'/explore-deeper','#atlas-explorer':'/explore/history','#connections-explorer':'/explore/connections','#objects-explorer':'/explore/objects','#environment-explorer':'/explore/environment'};
export const normalizePath = path => path.replace(/\/+$/, '') || '/';
export function navigate(path){if(typeof window==='undefined')return;history.pushState({},'',path);window.dispatchEvent(new Event('appnavigate'));}
export const personPath=id=>`/leadership/${encodeURIComponent(id)}`;
