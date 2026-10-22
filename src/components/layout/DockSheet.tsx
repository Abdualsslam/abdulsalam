import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import type { TabId } from "../../hooks/useNavigation";

interface Props {
  id: TabId; label: string; index: number; active: boolean; enabled: boolean;
  content: ReactNode; onSelect: () => void; onClose: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

/** One persistent sheet: its original head, outline and content travel together. */
export default function DockSheet({id, label, index, active, enabled, content, onSelect, onClose, onKeyDown}: Props) {
  const lift = useSpring(0, {stiffness: 260, damping: 30, mass: .85});
  const ripple = useSpring(0, {stiffness: 165, damping: 11, mass: .8});
  const rippleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const limit = useRef(450);
  const gesture = useRef<{y: number; start: number; distance: number; pointerId: number} | null>(null);
  const suppressClick = useRef(false);
  const [revealed, setRevealed] = useState(active);
  const left = (5 - index) * 200 + 13;
  const right = left + 172;
  const top = 188 + index * 3;
  const settle = (value: number) => enabled ? lift.set(value) : lift.jump(value);
  useEffect(() => {
    const measure = () => {
      if (!root.current) return;
      const header = document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 78;
      limit.current = Math.max(120, root.current.getBoundingClientRect().top + top + lift.get() - header - 18);
      if (active && !gesture.current) {
        if (enabled) lift.set(limit.current); else lift.jump(limit.current);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active, enabled, lift, top]);
  useEffect(() => {
    if (active) setRevealed(true);
    if (enabled) lift.set(active ? limit.current : 0);
    else lift.jump(active ? limit.current : 0);
  }, [active, enabled, lift]);
  useEffect(() => {
    if (!active) return;
    // Links on the cover become inert when a sheet opens. Move focus into the
    // newly visible section so keyboard and screen-reader navigation can continue.
    const content = panel.current;
    if (content) {
      content.scrollTop = 0;
      content.focus({ preventScroll: true });
    }
  }, [active]);
  useEffect(() => {
    let last = lift.get();
    let time = performance.now();
    if (!enabled) ripple.jump(0);
    const unsubscribe = lift.on("change", value => {
      const now = performance.now();
      const distance = value - last;
      const elapsed = Math.max(12, now - time);
      last = value;
      time = now;
      if (!enabled || Math.abs(distance) < .15) return;
      // Movement loads the paper; stopping releases a damped flex, even while held.
      ripple.set(Math.max(-10, Math.min(10, distance / elapsed * 7)));
      if (rippleTimer.current) clearTimeout(rippleTimer.current);
      rippleTimer.current = setTimeout(() => ripple.set(0), 75);
    });
    return () => {
      unsubscribe();
      if (rippleTimer.current) clearTimeout(rippleTimer.current);
    };
  }, [enabled, lift, ripple]);
  const rippleScale = useTransform(ripple, n => n * 2);
  const rippleFilter = useTransform(ripple, n => Math.abs(n) > .025 ? `url(#paper-flex-${id})` : 'none');
  const rippleLight = useTransform(ripple, n => Math.min(.2, Math.abs(n) * .019));
  const rippleShift = useTransform(ripple, n => `${50 + n * 2}%`);
  // Neutral displacement at both ends keeps the head and binding attached.
  const displacementMap = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="256"><defs><linearGradient id="wave" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(128,128,128)"/><stop offset=".12" stop-color="rgb(128,128,128)"/><stop offset=".32" stop-color="rgb(220,145,128)"/><stop offset=".57" stop-color="rgb(35,110,128)"/><stop offset=".8" stop-color="rgb(180,140,128)"/><stop offset="1" stop-color="rgb(128,128,128)"/></linearGradient></defs><rect width="32" height="256" fill="url(#wave)"/></svg>`);
  const height = useTransform(lift, n => 300 + n);
  const viewBox = useTransform(lift, n => `0 0 1200 ${300 + n}`);
  const visibility = useTransform(lift, n => Math.min(1, Math.max(0, (n - 12) / 55)));
  const path = useTransform(lift, value => {
    const bottom = 300 + value;
    const edge = top + 54;
    const shoulderLeft = Math.max(14, left - 18);
    const shoulderRight = Math.min(1184, right + 18);
    // Flat crown and soft, symmetric shoulders stay part of the same sheet.
    return `M2 ${bottom} L2 ${edge + 9} Q2 ${edge} 14 ${edge}
      L${shoulderLeft} ${edge}
      C${Math.max(shoulderLeft,left-6)} ${edge} ${Math.max(shoulderLeft,left-4)} ${top+48} ${left+2} ${top+28}
      C${left+6} ${top+10} ${left+12} ${top+4} ${left+30} ${top+4}
      L${right-30} ${top+4}
      C${right-12} ${top+4} ${right-6} ${top+10} ${right-2} ${top+28}
      C${Math.min(shoulderRight,right+4)} ${top+48} ${Math.min(shoulderRight,right+6)} ${edge} ${shoulderRight} ${edge}
      L1184 ${edge} Q1198 ${edge} 1198 ${edge+9} L1198 ${bottom} Z`;
  });
  const finish = (event: PointerEvent<HTMLButtonElement>, cancelled = false) => {
    const drag = gesture.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    gesture.current = null;
    suppressClick.current = Math.abs(drag.distance) > 7 || cancelled;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (cancelled) {settle(active ? limit.current : 0); return;}
    if (!active && drag.distance > 56) onSelect();
    else if (active && drag.distance < -75) onClose();
    else settle(active ? limit.current : 0);
  };
  // Preserve physical stack order throughout dragging, opening and closing.
  return <motion.div ref={root} className={`dock-sheet continuous-sheet ${active ? 'is-selected' : ''}`} style={{height,zIndex: index+1}}>
    <motion.svg className="bound-sheet" viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id={`paper-flex-${id}`} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feImage href={displacementMap} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="paperWave"/>
          <motion.feDisplacementMap in="SourceGraphic" in2="paperWave" scale={rippleScale} xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <linearGradient id={`sheet-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1={top} x2="0" y2={top+110}>
          <stop offset="0" stopColor="var(--paper-raised)"/><stop offset=".48" stopColor="var(--paper-muted)"/>
          <stop offset=".5" stopColor="var(--paper-surface)"/><stop offset="1" stopColor="var(--paper-surface)"/>
        </linearGradient>
      </defs>
      <motion.path d={path} fill={`url(#sheet-${id})`} stroke="var(--paper-edge)" strokeWidth="1"/>
    </motion.svg>
    <motion.button className="sheet-head" id={`tab-${id}`} type="button" aria-expanded={active}
      aria-controls={`panel-${id}`} style={{left:`${left/12}%`,width:`${172/12}%`,top}}
      onKeyDown={onKeyDown}
      onPointerEnter={() => {if(enabled && !active && !gesture.current) lift.set(8);}}
      onPointerLeave={() => {if(!active && !gesture.current) settle(0);}}
      onPointerDown={event => {
        if(event.button!==0 || !event.isPrimary || gesture.current) return;
        suppressClick.current=false; setRevealed(true);
        gesture.current={y:event.clientY,start:lift.get(),distance:0,pointerId:event.pointerId};
        lift.jump(lift.get());
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={event => {
        const drag=gesture.current;
        if(!drag || drag.pointerId!==event.pointerId) return;
        drag.distance=drag.y-event.clientY;
        // Follow the finger directly, then continue from this exact position on release.
        lift.jump(Math.max(0,Math.min(limit.current,drag.start+drag.distance)));
      }}
      onPointerUp={event=>finish(event)} onPointerCancel={event=>finish(event,true)}
      onLostPointerCapture={event=>finish(event,true)}
      onClick={event=>{if(event.detail===0 || !suppressClick.current) onSelect(); suppressClick.current=false;}}
    >
      <span className="sheet-head-print"><small>0{index+1}</small><span>{label}</span></span>
      <span className="sheet-head-grain" aria-hidden="true"/>
    </motion.button>
    <motion.div className="sheet-content" style={{top:top+54,opacity:visibility,filter:rippleFilter}} inert={!active} aria-hidden={!active}>
      <motion.div className="paper-flex-light" aria-hidden="true" style={{opacity:rippleLight,backgroundPositionY:rippleShift}}/>
      <div className="paper-toolbar">
        <span className="paper-reference">FILE 0{index+1} / 06</span>
        <span className="sheet-return-hint">اسحب رأس الورقة للأسفل لإعادتها</span>
        <button className="paper-close" onClick={onClose} aria-label="إعادة الورقة إلى الملف"><X size={17}/></button>
      </div>
      <div ref={panel} className="paper-scroll" role="region" id={`panel-${id}`} aria-labelledby={`tab-${id}`} tabIndex={active?0:-1}>
        {revealed && content}
        <footer className="paper-footer"><span>عبدالسلام معاد · {label}</span><button onClick={onClose}>إلى غلاف الملف</button></footer>
      </div>
    </motion.div>
  </motion.div>;
}
