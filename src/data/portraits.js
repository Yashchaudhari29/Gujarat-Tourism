import manifest from './portrait-manifest.json';
const titles = {
  'Sardar Vallabhbhai Patel':'Vallabhbhai Patel',
  'Bhikhaiji Cama':'Bhikaiji Cama',
  'Ila Bhatt':'Ela Bhatt',
  'Morarji V Desai':'Morarji Desai',
  'Dhumketu':'Dhumketu (writer)',
  'K. M. Munshi':'Kanaiyalal Maneklal Munshi',
  'Hansa Mehta':'Hansa Jivraj Mehta',
  'Tribhuvandas Patel':'Tribhuvandas Kishibhai Patel'
};
export const portraitFor = person => manifest[person.wikiTitle || titles[person.name] || person.name];
