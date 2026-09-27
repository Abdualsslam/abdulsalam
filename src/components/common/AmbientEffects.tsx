import { useEffect, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

/** A single compositor-driven light and a small, deterministic particle field. */
export default function AmbientEffects({ enabled }: { enabled: boolean }) {
  const pointerX = useMotionValue(-500);
  const pointerY = useMotionValue(-500);
  const x = useSpring(pointerX, { stiffness: 65, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 65, damping: 24 });
  const light = useMotionTemplate`radial-gradient(430px circle at ${x}px ${y}px, rgba(143,0,255,.12), transparent 72%)`;
  useEffect(() => {
    if (!enabled || !window.matchMedia("(pointer:fine)").matches) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };
    const leave = () => {
      pointerX.set(-500);
      pointerY.set(-500);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      leave();
    };
  }, [enabled, pointerX, pointerY]);
  return (
    <div className="ambient-effects" aria-hidden="true">
      <div className="ambient-orb orb-violet" />
      <div className="ambient-orb orb-cyan" />
      <div className="ambient-grid" />
      {enabled && (
        <motion.div className="pointer-light" style={{ background: light }} />
      )}
      <div className="ambient-particles">
        {Array.from({ length: 14 }, (_, index) => (
          <i
            key={index}
            style={
              {
                "--particle-x": `${(index * 31 + 7) % 100}%`,
                "--particle-y": `${(index * 17 + 13) % 100}%`,
                "--particle-delay": `${-index * 1.7}s`,
                "--particle-duration": `${12 + (index % 5) * 3}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
