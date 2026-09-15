import {readFile,writeFile} from 'node:fs/promises';
const photos=JSON.parse(await readFile('src/data/district-photos.json','utf8'));
const replacements=[
 ['anand','Sardar Patel memorial, Karamsad','https://anand.nic.in/places-of-interest/','https://cdn.s3waas.gov.in/s3d86ea612dec96096c5e0fcc8dd42ab6d/uploads/2018/08/2018080980.jpg'],
 ['amreli','Shiyalbet island','https://amreli.nic.in/gu/','https://cdn.s3waas.gov.in/s3b056eb1587586b71e2da9acfe4fbd19e/uploads/2018/07/2018071024.jpg'],
 ['mahisagar','Kadana Dam','https://mahisagar.nic.in/home2/','https://cdn.s3waas.gov.in/s3ce78d1da254c0843eb23951ae077ff5f/uploads/2018/12/2018122686.jpg'],
 ['bhavnagar','Takhteshwar Temple','https://gtbooking.gujarattourism.com/saurashtra/bhavnagar/takhteshwar-temple.html','https://gtbooking.gujarattourism.com/content/dam/gujrattourism/images/religious-sites/takhteshwar-temple/Takhteshwar-Temple-Banner.jpg']
];
for(const [slug,caption,source,original] of replacements){const r=await fetch(original);if(!r.ok||!r.headers.get('content-type')?.startsWith('image/'))throw Error(slug+': '+r.status);const src='/assets/districts/'+slug+'.jpg';await writeFile('public'+src,new Uint8Array(await r.arrayBuffer()));photos[slug]={src,caption,title:caption,source,original};console.log(slug,caption);}
await writeFile('src/data/district-photos.json',JSON.stringify(photos,null,2));
