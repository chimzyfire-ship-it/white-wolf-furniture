import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
export interface MediaItem { src:string; title:string; description?:string; price?:string; }
export default function MediaDialog({items,index,setIndex,onClose}:{items:MediaItem[];index:number;setIndex:(i:number)=>void;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);
 const touch=useRef<number|null>(null);
 const item=items[index];
 useEffect(()=>{const el=dialog.current;const previous=document.activeElement as HTMLElement;const overflow=document.body.style.overflow;el?.showModal();document.body.style.overflow='hidden';return()=>{el?.close();document.body.style.overflow=overflow;previous?.focus()}},[]);
 const next=(n:number)=>setIndex((index+n+items.length)%items.length);
 return createPortal(<dialog ref={dialog} className="media-dialog" aria-labelledby="media-title" onCancel={e=>{e.preventDefault();onClose()}} onClick={e=>{if(e.target===e.currentTarget)onClose()}} onKeyDown={e=>{if(e.key==='ArrowRight')next(1);if(e.key==='ArrowLeft')next(-1)}}>
  <button className="dialog-close" onClick={onClose} aria-label="Close image">✕</button>
  <div className="dialog-stage" onTouchStart={e=>{touch.current=e.touches[0].clientX}} onTouchEnd={e=>{if(touch.current!==null){const d=touch.current-e.changedTouches[0].clientX;if(Math.abs(d)>60)next(d>0?1:-1)}touch.current=null}}>
   <img src={item.src} alt={item.title}/>
  </div>
  <div className="dialog-caption"><div><h2 id="media-title">{item.title}</h2>{item.price&&<p className="dialog-price">{item.price}</p>}{item.description&&<p>{item.description}</p>}</div><span>{index+1} / {items.length}</span></div>
  <button className="dialog-prev" aria-label="Previous image" onClick={()=>next(-1)}>←</button><button className="dialog-next" aria-label="Next image" onClick={()=>next(1)}>→</button>
 </dialog>,document.body);
}
