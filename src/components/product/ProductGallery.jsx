"use client";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductGallery({images=[],videos=[]}) {
  const media=[...images.map(item=>({...item,type:'image'})),...videos.map(item=>({...item,type:'video'}))];
  const [active,setActive]=useState(0); const current=media[active];
  return <div><div className="relative aspect-square overflow-hidden rounded-3xl bg-paper-warm shadow-sm">
    {current?.type==='video'?<video key={current.url} src={current.url} controls autoPlay playsInline className="h-full w-full object-contain bg-black"/>:current&&<Image src={current.url} alt={current.altText||'Product image'} fill priority className="object-cover" sizes="(min-width:1024px) 50vw,100vw"/>}
    {!current&&<div className="flex h-full items-center justify-center text-sm text-ink/35">Media coming soon</div>}
  </div>{media.length>1&&<div className="scroll-thin mt-4 flex gap-3 overflow-x-auto pb-2">{media.map((item,index)=><button key={`${item.type}-${item.id||item.url}`} onClick={()=>setActive(index)} className={cn("relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-paper-warm",active===index?'ring-2 ring-rust':'ring-1 ring-walnut/15')}>
    {item.type==='image'?<Image src={item.url} alt="" fill className="object-cover" sizes="80px"/>:<><video src={item.url} muted preload="metadata" className="h-full w-full object-cover"/><span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white"><Play size={20} fill="currentColor"/></span></>}
  </button>)}</div>}</div>;
}
