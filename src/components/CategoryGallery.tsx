import { useState } from 'react';
import type { GalleryCategory } from '../data/siteData';
import { thumbnail } from '../lib/media';
import MediaDialog from './MediaDialog';
export default function CategoryGallery({categories}:{categories:GalleryCategory[]}){
 const [active,setActive]=useState<string|null>(null),[limit,setLimit]=useState(18),[selected,setSelected]=useState<number|null>(null);
 const category=categories.find(c=>c.id===active);
 const choose=(id:string|null)=>{setActive(id);setLimit(18);setSelected(null)};
 return <><div className="category-tabs" aria-label="Filter gallery"><button className={!active?'active':''} aria-pressed={!active} onClick={()=>choose(null)}>All spaces</button>{categories.map(c=><button key={c.id} className={active===c.id?'active':''} aria-pressed={active===c.id} onClick={()=>choose(c.id)}>{c.name}</button>)}</div>
 {!category?<div className="category-grid">{categories.map((c,i)=><button className="category-card" key={c.id} onClick={()=>choose(c.id)}><div className="category-image"><img src={thumbnail(c.cover)} width="480" height="480" alt={c.name} loading="lazy" decoding="async"/><span aria-hidden="true">↗</span></div><div className="category-info"><h3>{c.name}</h3><p>{String(i+1).padStart(2,'0')} / {c.images.length} images</p></div></button>)}</div>:<div className="category-results"><div className="gallery-summary"><h3>{category.name}</h3><p>{category.images.length} images</p></div><div className="project-grid">{category.images.slice(0,limit).map((src,i)=><button className="project-image" key={src} onClick={()=>setSelected(i)} aria-label={`Open ${category.name} image ${i+1}`}><img src={thumbnail(src)} width="480" height="480" loading="lazy" decoding="async" alt={`${category.name} design ${i+1}`}/><span aria-hidden="true">↗</span></button>)}</div>{limit<category.images.length&&<div className="collection-bottom"><p>Showing {limit} of {category.images.length} images</p><button className="button button-outline" onClick={()=>setLimit(limit+18)}>Explore more +</button></div>}</div>}
 {selected!==null&&category&&<MediaDialog items={category.images.map((src,i)=>({src,title:`${category.name} · ${i+1}`}))} index={selected} setIndex={setSelected} onClose={()=>setSelected(null)}/>}</>;
}
