const image = name => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}`;
const detail = (work, legacy) => ({
  contributions_gujarat: work,
  contributions_india: `${legacy} Their work also travelled beyond Gujarat through institutions, public writing, enterprise or cultural practice.`,
  contributions_international: `The wider significance of this work lies in how a regional experience can become a shared intellectual, cultural or institutional resource.`,
  roles: `Their career joined public responsibility with specialised knowledge and sustained institution-building.`,
  vision: `The central vision was to make knowledge, opportunity or cultural expression more accessible and durable.`,
  lessons: `This profile is best read through specific actions, institutions and the people who carried the work forward, rather than through a single heroic claim.`
});
export const additionalPersonalities = [
  ['Morarji Desai','1896','Bhadeli, Gujarat','Public leadership','India’s first non-Congress Prime Minister, born in Gujarat.','Morarji Desai.jpg'],
  ['Ila Bhatt','1933','Ahmedabad, Gujarat','Social reform','Founder of SEWA, she helped organise self-employed women workers.','Ila Bhatt.jpg'],
  ['Karsanbhai Patel','1945','Mehsana, Gujarat','Enterprise','Founder of Nirma, whose low-cost consumer products changed access to household goods.','Karsanbhai Patel.jpg'],
  ['Mallika Sarabhai','1954','Ahmedabad, Gujarat','Performing arts','Dancer, actor and cultural organiser who used performance for social dialogue.','Mallika Sarabhai.jpg'],
  ['Asha Parekh','1942','Mumbai, India','Cinema','Actor and producer with a long connection to Gujarati cultural life and Indian cinema.','Asha Parekh.jpg'],
  ['Paresh Rawal','1950','Mumbai, India','Cinema','Actor and theatre practitioner known for work across Gujarati and Hindi performance traditions.','Paresh Rawal.jpg'],
  ['Pankaj Udhas','1951','Jetpur, Gujarat','Music','Ghazal singer who carried Gujarati-rooted musical sensibilities to a wide audience.','Pankaj Udhas.jpg'],
  ['Falguni Pathak','1969','Vadodara, Gujarat','Music','Singer and performer associated with the popularisation of Gujarati folk-inflected pop.','Falguni Pathak.jpg'],
  ['Dhumketu','1892','Virpur, Gujarat','Literature','Pen name of Gaurishankar Govardhanram Joshi, a major Gujarati short-story writer.','Dhumketu.jpg'],
  ['Umashankar Joshi','1911','Bamuna, Gujarat','Literature','Poet, writer and Jnanpith awardee who shaped modern Gujarati literature.','Umashankar Joshi.jpg'],
  ['K. M. Munshi','1887','Bharuch, Gujarat','Literature & public life','Writer, institution-builder and founder of Bharatiya Vidya Bhavan.','Kanhaiyalal Maneklal Munshi.jpg'],
  ['Morarji V Desai','1896','Bhadeli, Gujarat','Governance','A Gujarati public figure whose career linked provincial administration and national office.','Morarji Desai.jpg'],
  ['Hansa Mehta','1897','Surat, Gujarat','Education & rights','Educator and public representative who advocated women’s education and equal citizenship.','Hansa Jivraj Mehta.jpg'],
  ['Har Gobind Khorana','1922','Raipur, India','Science','Nobel laureate in physiology or medicine who worked on the genetic code.','Har Gobind Khorana.jpg'],
  ['Prafulla Chandra Ray','1861','Khulna, Bengal','Science & industry','Chemist and institution-builder whose example influenced scientific education in western India.','Prafulla Chandra Ray.jpg'],
  ['Tribhuvandas Patel','1903','Anand, Gujarat','Cooperatives','Cooperative leader whose work helped build the institutional foundations of Amul.','Tribhuvandas Patel.jpg'],
  ['Manilal Gandhi','1892','South Africa','Public life','A member of the Gandhi family who carried forward work in journalism and public service.','Manilal Gandhi.jpg'],
  ['Ravishankar Raval','1892','Bhavnagar, Gujarat','Visual art','Painter and art educator who helped define modern Gujarati visual culture.','Ravishankar Raval.jpg'],
  ['Gulabdas Broker','1909','Limbdi, Gujarat','Literature','Gujarati writer whose fiction explored social life, relationships and changing values.','Gulabdas Broker.jpg'],
  ['Dhirubhai Ambani','1932','Chorwad, Gujarat','Enterprise','Entrepreneur from Saurashtra who built a major Indian business group.','Dhirubhai Ambani.jpg']
].map(([name,born,place,tag,relevance,file],i)=>({
  id:`additional-${i}-${name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,
  name,born,place,tags:[tag],relevance,image:image(file),details:detail(relevance,`Their contribution remains part of Gujarat’s wider story of ${tag.toLowerCase()}.`),sources:[],editorialNote:'Editorial profile assembled as an introductory guide; consult the linked institutional and archival sources for a full scholarly account.'
}));
