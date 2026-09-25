import { useEffect, useState } from 'react';
export default function BackToTop(){const [show,setShow]=useState(false);useEffect(()=>{const fn=()=>setShow(window.scrollY>900);fn();window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[]);return show?<a className="back-to-top" href="#hero" aria-label="Back to top">↑</a>:null}
