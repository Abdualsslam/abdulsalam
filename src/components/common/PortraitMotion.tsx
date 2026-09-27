import { useEffect, useRef, useState, type RefObject } from 'react';

interface Props { enabled: boolean; sceneRef: RefObject<HTMLElement | null>; }
const ROOT='/portrait-gaze/';
const ASSET_VERSION='torso-aligned-v2';
const directions=['right','down-right','down','down-left','left','up-left','up','up-right'];
const controls=[['up-left','↖','أعلى اليسار'],['up','↑','أعلى'],['up-right','↗','أعلى اليمين'],['left','←','يسار'],['neutral','·','الأمام'],['right','→','يمين'],['down-left','↙','أسفل اليسار'],['down','↓','أسفل'],['down-right','↘','أسفل اليمين']];
type Manifest={width:number;height:number;directions:Record<string,string[]>};

export default function PortraitMotion({enabled,sceneRef}:Props){
 const canvas=useRef<HTMLCanvasElement>(null);
 const request=useRef({direction:'neutral',level:0});
 const manualBlink=useRef(false);
 const [ready,setReady]=useState(false),[failed,setFailed]=useState(false);
 const [selected,setSelected]=useState('neutral');
 useEffect(()=>{
  const controller=new AbortController(); let disposed=false,raf=0;
  const cache=new Map<string,HTMLImageElement>();
  let manifest:Manifest;
  let current='neutral',level=0,lastDraw='',lastStep=0;
  let blinkStart=0,nextBlink=performance.now()+4500;
  const draw=(file:string)=>{
   if(file===lastDraw)return;
   const img=cache.get(file),ctx=canvas.current?.getContext('2d');
   if(!img||!ctx)return;
   ctx.clearRect(0,0,450,800);ctx.drawImage(img,0,0,450,800);
   if(canvas.current)canvas.current.dataset.pose=file;
   lastDraw=file;
  };
  const load=async()=>{
   try{
    const response=await fetch(`${ROOT}manifest.json?v=${ASSET_VERSION}`,{signal:controller.signal});
    if(!response.ok)throw new Error('Missing portrait frames');
    manifest=await response.json();
    await Promise.all(Object.values(manifest.directions).flat().map(file=>new Promise<void>((resolve,reject)=>{
     const img=new Image();img.onload=()=>{cache.set(file,img);resolve();};img.onerror=()=>reject(new Error(file));img.src=`${ROOT}${file}?v=${ASSET_VERSION}`;
    })));
    if(disposed)return;
    setReady(true);setFailed(false);draw(manifest.directions.neutral[0]);
    const step=(time:number)=>{
     if(disposed)return;
     if(document.hidden){lastStep=time;raf=requestAnimationFrame(step);return;}
     const target=enabled?request.current:{direction:'neutral',level:0};
     if(manualBlink.current){manualBlink.current=false;request.current={direction:'neutral',level:0};nextBlink=time;}
     // Retract to the shared neutral pose before changing direction, avoiding double faces.
     const desired=current===target.direction?target.level:0;
     if(time-lastStep>55){
      level+=Math.sign(desired-level)*Math.min(Math.abs(desired-level),1);
      if(level===0&&current!==target.direction)current=target.direction;
      lastStep=time;
     }
     if(enabled&&target.level===0&&level===0&&time>=nextBlink&&!blinkStart)blinkStart=time;
     if(!enabled||target.level>0)blinkStart=0;
     if(blinkStart){
      const frames=manifest.directions.blink;const i=Math.floor((time-blinkStart)/42);
      if(i<frames.length)draw(frames[i]);else{blinkStart=0;nextBlink=time+4200+Math.random()*3200;draw(manifest.directions.neutral[0]);}
     }else draw(level===0?manifest.directions.neutral[0]:manifest.directions[current][Math.max(0,Math.min(4,level-1))]);
     raf=requestAnimationFrame(step);
    };
    raf=requestAnimationFrame(step);
   }catch(error){if(!disposed && !(error instanceof DOMException&&error.name==='AbortError')){console.error('Portrait frames unavailable',error);setFailed(true);}}
  };
  load();
  return()=>{disposed=true;controller.abort();cancelAnimationFrame(raf);cache.clear();};
 },[enabled]);
 useEffect(()=>{
  if(!enabled)return;
  let idleTimer:ReturnType<typeof setTimeout>|null=null;
  const reset=()=>{
   if(idleTimer)clearTimeout(idleTimer);
   idleTimer=null;
   request.current={direction:'neutral',level:0};
   setSelected('neutral');
  };
  const returnToNeutralAfterPause=()=>{
   if(idleTimer)clearTimeout(idleTimer);
   idleTimer=setTimeout(reset,2000);
  };
  const move=(e:PointerEvent)=>{
   if(e.pointerType==='touch'||(e.target as HTMLElement).closest('.gaze-controls'))return;
   const r=canvas.current?.getBoundingClientRect();if(!r)return;
   const x=(e.clientX-r.left-r.width*.5)/Math.max(180,window.innerWidth*.28);
   const y=(e.clientY-r.top-r.height*.17)/Math.max(160,window.innerHeight*.32);
   const radius=Math.hypot(x,y);
   const direction=radius<.18?'neutral':directions[(Math.round(Math.atan2(y,x)/(Math.PI/4))+8)%8];
   request.current={direction,level:direction==='neutral'?0:Math.max(1,Math.min(5,Math.round(radius*5)))};
   setSelected(direction);
   returnToNeutralAfterPause();
  };
  window.addEventListener('pointermove',move);document.documentElement.addEventListener('pointerleave',reset);
  window.addEventListener('blur',reset);
  return()=>{
   if(idleTimer)clearTimeout(idleTimer);
   window.removeEventListener('pointermove',move);
   document.documentElement.removeEventListener('pointerleave',reset);
   window.removeEventListener('blur',reset);
  };
 },[enabled,sceneRef]);
 return <>
  <img className="portrait-cutout" src={`${ROOT}neutral-00.webp?v=${ASSET_VERSION}`} alt="عبدالسلام معاد ببدلة رمادية" style={{visibility:ready?'hidden':'visible'}}/>
  <canvas ref={canvas} width={450} height={800} className={`portrait-frame-canvas ${ready?'is-visible':''}`} role="img" aria-label="صورة عبدالسلام تتفاعل باتجاه النظر مع المؤشر"/>
  <div className="gaze-controls">
   <div className="gaze-direction-pad" role="group" aria-label="اتجاه النظر">
    {controls.map(([direction,arrow,label])=><button key={direction} aria-label={`النظر إلى ${label}`} aria-pressed={selected===direction} disabled={!ready||!enabled} onClick={()=>{request.current={direction,level:direction==='neutral'?0:5};setSelected(direction);}}>{arrow}</button>)}
   </div>
   <div className="gaze-control-copy"><span>حرّك المؤشر، وسأتبع اتجاهه</span><button disabled={!ready||!enabled} onClick={()=>{manualBlink.current=true;setSelected('neutral');}}>رمشة عين</button></div>
   {failed&&<span role="status">تعذر تحميل الحركة؛ تظهر الصورة الثابتة.</span>}
  </div>
 </>;
}
