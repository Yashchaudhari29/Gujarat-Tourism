export const legacyRoutes = {
  '#personalities': '/leadership',
  '#people-explorer': '/explore/people',
  '#explore-deeper': '/explore-deeper',
  '#atlas-explorer': '/explore/history',
  '#connections-explorer': '/explore/connections',
  '#objects-explorer': '/explore/objects',
  '#environment-explorer': '/explore/environment',
};
export const normalizePath = path => (path || '/').replace(/\/+$/, '') || '/';
export const personPath = id => `/leadership/${encodeURIComponent(id)}`;
export function resolveRoute(path) {
  path = normalizePath(path);
  if (path === '/') return {type: 'home'};
  if (path === '/explore-deeper') return {type: 'hub'};
  const match = path.match(/^\/(leadership|districts|development)(?:\/([^/]+))?$/);
  if (match) {
    try { return {type: match[1], id: match[2] ? decodeURIComponent(match[2]) : undefined}; }
    catch { return {type: 'not-found'}; }
  }
  if (/^\/explore\/(history|connections|objects|people|environment)(?:\/[^/]+)?$/.test(path)) return {type: 'explorer'};
  return {type: 'not-found'};
}
export function navigate(path) {
  if (typeof window === 'undefined') return;
  const url = new URL(path, window.location.href);
  if (url.origin !== window.location.origin) return;
  window.history.pushState({}, '', url.pathname + url.search + url.hash);
  window.dispatchEvent(new Event('appnavigate'));
}
