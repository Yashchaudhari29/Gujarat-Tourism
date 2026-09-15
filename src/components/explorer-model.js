export const explorerNames = {history:'Historical Atlas',connections:'Connections: Why Here?',objects:'Story Discovery',people:'Documentary Profiles',environment:'Seasonal Gujarat'};
export const explorerPath = (kind, id) => `/explore/${kind}${id ? `/${encodeURIComponent(id)}` : ''}`;
export function parseExplorerRoute(route) {
  const bits = route.replace(/\/+$/, '').split('/');
  if (bits[1] !== 'explore' || !explorerNames[bits[2]] || bits.length > 4) return null;
  try { return {kind:bits[2], id:bits[3] ? decodeURIComponent(bits[3]) : null}; } catch { return null; }
}
export function seasonalObservations(data, seasonId, regionId='all') {
  return data.observations.filter(item => item.season_id === seasonId && (regionId === 'all' || item.region_id === regionId));
}
// Curated subject relationships; these connect records, not reconstructed trade routes.
const groups = [
  [['history','site_lothal'],['connections','lothal-maritime-trade'],['objects','art-001']],
  [['history','site_dholavira'],['objects','art-002']],
  [['history','site_junagadh'],['objects','art-003'],['objects','art-004']],
  [['history','site_vallabhi'],['objects','art-005'],['objects','art-006']],
  [['history','site_patan'],['objects','art-007']],
  [['history','site_surkotada'],['objects','art-008']],
  [['history','site_surat'],['connections','surat-diamond-polishing']],
];
export function relatedRecords(kind,id,collections) {
  const matches=groups.filter(group=>group.some(([k,i])=>k===kind&&i===id)).flat();
  return [...new Map(matches.filter(([k,i])=>k!==kind||i!==id).map(([k,i])=>[`${k}/${i}`,{kind:k,record:collections[k]?.find(record=>record.id===i)}])).values()].filter(item=>item.record);
}
