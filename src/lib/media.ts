export function thumbnail(src:string, large=false){
 const name=src.split('/').pop()!.replace(/\.[^.]+$/, '');
 const dir=src.includes('/categories/')?src.slice(0,src.lastIndexOf('/'))+'/thumbs':'/assets/thumbs';
 return `${dir}/${name}${large?'-960':''}.webp`;
}
