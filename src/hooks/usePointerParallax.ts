import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Tracks the pointer inside `ref`, returning spring-smoothed motion values
 * normalized to roughly -0.5..0.5 (center = 0). Returns zeros and `reduce=true`
 * when the user prefers reduced motion, so callers can skip parallax.
 */
export function usePointerParallax(
  ref: RefObject<HTMLElement | null>,
  enabled = true,
) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 110, damping: 26, mass: 0.6 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reset = () => {
      x.set(0);
      y.set(0);
    };
    const stop = () => {
      reset();
      sx.jump(0);
      sy.jump(0);
    };
    stop();
    if (reduce || !enabled) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !finePointer.matches) return;
      const r = el.getBoundingClientRect();
      x.set(Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5)));
      y.set(Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5)));
    };
    const visibility = () => { if (document.hidden) stop(); };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointercancel", reset);
    window.addEventListener("blur", stop);
    window.addEventListener("resize", stop);
    finePointer.addEventListener("change", stop);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("pointercancel", reset);
      window.removeEventListener("blur", stop);
      window.removeEventListener("resize", stop);
      finePointer.removeEventListener("change", stop);
      document.removeEventListener("visibilitychange", visibility);
      stop();
    };
  }, [ref, reduce, enabled, x, y, sx, sy]);

  return { x: sx, y: sy, reduce };
}
