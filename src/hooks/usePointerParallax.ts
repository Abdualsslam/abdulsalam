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
  const springConfig = { stiffness: 120, damping: 20, mass: 0.4 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  useEffect(() => {
    if (reduce || !enabled || !window.matchMedia("(pointer: fine)").matches) {
      x.set(0);
      y.set(0);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      x.set((e.clientX - r.left) / r.width - 0.5);
      y.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, reduce, enabled, x, y]);

  return { x: sx, y: sy, reduce };
}
