import { useState } from 'react';
import MediaDialog from './MediaDialog';
import { thumbnail } from '../lib/media';
interface Product {name:string;price:string;description:string;image:string}
export default function ProductGallery({products}:{products:Product[]}){
 const [limit,setLimit]=useState(8),[selected,setSelected]=useState<number|null>(null);
 const items=products.map(p=>({src:p.image,title:p.name,price:p.price,description:p.description}));
 return <><div className="product-grid">{products.slice(0,limit).map((p,i)=><button type="button" className="product-card" key={p.image} onClick={()=>setSelected(i)} aria-label={`View ${p.name}, ${p.price}`}>
 <div className="product-image"><img src={thumbnail(p.image)} srcSet={`${thumbnail(p.image)} 480w, ${thumbnail(p.image,true)} 960w`} sizes="(max-width: 600px) 46vw, (max-width: 1000px) 30vw, 23vw" width="480" height="540" alt={p.name} loading="lazy" decoding="async"/><span className="image-open" aria-hidden="true">↗</span></div>
 <div className="product-info"><h3>{p.name}</h3><p>{p.price}</p><span>View details <span aria-hidden="true">↗</span></span></div>
 </button>)}</div><div className="collection-bottom"><p>Showing {Math.min(limit,products.length)} of {products.length} pieces</p>{limit<products.length&&<button className="button button-outline" onClick={()=>setLimit(limit+8)}>More to love <span aria-hidden="true">+</span></button>}</div>
 {selected!==null&&<MediaDialog items={items} index={selected} setIndex={setSelected} onClose={()=>setSelected(null)}/>}</>;
}
