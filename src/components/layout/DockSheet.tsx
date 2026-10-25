import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import type { TabId } from "../../hooks/useNavigation";

interface Props {
  id: TabId; label: string; index: number; active: boolean; enabled: boolean;
  content: ReactNode; onSelect: () => void; onClose: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

/** One persistent sheet: its original head, outline and content travel together. */
export default function DockSheet({id, label, index, active, enabled, content, onSelect, onClose, onKeyDown}: Props) {
  const lift = useMotionValue(0);
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const limit = useRef(450);
  const gesture = useRef<{y: number; start: number; distance: number; pointerId: number} | null>(null);
  const suppressClick = useRef(false);
  const [revealed, setRevealed] = useState(active);
  const left = (5 - index) * 200 + 13;
  const right = left + 172;
  const top = 188 + index * 3;
  const settle = useCallback((value: number) => {
    lift.stop();
    if (enabled) {
      void animate(lift, value, {type: "tween", duration: .3, ease: [.22, 1, .36, 1]});
    } else {
      lift.jump(value);
    }
  }, [enabled, lift]);
  useEffect(() => {
    const measure = () => {
      if (!root.current) return;
      const header = document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 78;
      limit.current = Math.max(120, root.current.getBoundingClientRect().top + top + lift.get() - header - 18);
      if (active && !gesture.current) {
        settle(limit.current);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active, lift, settle, top]);
  useEffect(() => {
    if (active) setRevealed(true);
    settle(active ? limit.current : 0);
    return () => lift.stop();
  }, [active, lift, settle]);
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
    <motion.div className="sheet-content" style={{top:top+54,opacity:visibility}} inert={!active} aria-hidden={!active}>
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
