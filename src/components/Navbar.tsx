import { useEffect, useRef, useState } from 'react';
export default function Navbar() {
 const [open,setOpen]=useState(false);
 const button=useRef<HTMLButtonElement>(null);
 const menu=useRef<HTMLDivElement>(null);
 const links=[['Collection','#products'],['Our work','#gallery'],['Recently done','#recent-work'],['Our story','#about']];
 useEffect(()=>{
  if(!open)return;
  const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);button.current?.focus();}};
  window.addEventListener('keydown',onKey);
  const mq=window.matchMedia('(min-width: 901px)');
  const reset=()=>{if(mq.matches)setOpen(false)};
  mq.addEventListener('change',reset);
  return()=>{window.removeEventListener('keydown',onKey);mq.removeEventListener('change',reset)};
 },[open]);
 return <header className="site-header"><nav className="shell nav-inner" aria-label="Main navigation">
  <a className="brand" href="#hero" onClick={()=>setOpen(false)}><img src="/assets/editorial/logo.webp" width="40" height="40" alt=""/><span>WHITE WOLF<small>F U R N I T U R E</small></span></a>
  <div className="desktop-links">{links.map(([label,href])=><a key={href} href={href}>{label}</a>)}</div>
  <a className="nav-contact" href="#contact">Start a project <span aria-hidden="true">↗</span></a>
  <button ref={button} className="menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?'✕':'☰'}</button>
  <div ref={menu} id="mobile-menu" className="mobile-menu" hidden={!open}>{[...links,['Start a project','#contact']].map(([label,href],i)=><a key={href} href={href} onClick={()=>setOpen(false)}><small>0{i+1}</small>{label}<span aria-hidden="true">↗</span></a>)}</div>
 </nav></header>;
}
