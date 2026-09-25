import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = 'public';
const data = await fs.readFile('src/data/siteData.ts', 'utf8');
const products = [...data.matchAll(/image: "([^"]+)"/g)].map(m => m[1]);
const dirs = ['public/assets/real-photos', ...(await fs.readdir('public/assets/categories')).filter(n=>!n.startsWith('.')).map(n=>'public/assets/categories/'+n)];
let created = 0;
for (const dir of dirs) {
 await fs.mkdir(dir.includes('real-photos')?'public/assets/thumbs':dir+'/thumbs',{recursive:true});
 for (const name of await fs.readdir(dir)) {
  if (!/\.(jpe?g|png)$/i.test(name)) continue;
  const src = path.join(dir,name), stem = path.parse(name).name;
  const dest = dir.includes('real-photos')?'public/assets/thumbs':dir+'/thumbs';
  const thumb = dest+'/'+stem+'.webp';
  try { await fs.access(thumb); } catch { await sharp(src).rotate().resize(480,null,{withoutEnlargement:true}).webp({quality:76}).toFile(thumb); created++; }
  if(products.includes('/'+src.slice(7))) {
   const medium=dest+'/'+stem+'-960.webp';
   try { await fs.access(medium); } catch { await sharp(src).rotate().resize(960,null,{withoutEnlargement:true}).webp({quality:80}).toFile(medium); created++; }
  }
 }
}
await fs.mkdir('public/assets/editorial',{recursive:true});
for(const width of [640,1280]) await sharp('public/assets/categories/sofas-and-sets/3bba8d97-fcf5-455c-9645-045ff2c29ad2.JPG').rotate().resize(width).webp({quality:82}).toFile(`public/assets/editorial/hero-${width}.webp`);
await sharp('public/assets/mr-friday.jpg').rotate().resize(720,null,{withoutEnlargement:true}).webp({quality:80}).toFile('public/assets/editorial/artisan.webp');
await sharp('public/logo.png').resize(96).webp({quality:85}).toFile('public/assets/editorial/logo.webp');
console.log(`Created ${created} gallery/product variants and editorial images.`);
