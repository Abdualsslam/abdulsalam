import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Interactive pointer effect that replaces the old radial spotlight.
 *
 * Three layers trail the cursor with different spring tensions, giving a
 * layered, comet-like feel:
 *   1. a soft ambient glow blob (the light "behind" the cursor),
 *   2. a lagging ring that expands when hovering interactive elements,
 *   3. a precise dot that snaps to the exact pointer position.
 *
 * Fine-pointer / desktop only, and fully disabled under prefers-reduced-motion.
 * Always pointer-events-none, so it never intercepts clicks.
 */
export default function CursorGlow() {
    const x = useMotionValue(-200)
    const y = useMotionValue(-200)

    // Increasing spring tension = less lag (blob trails most, dot snaps).
    const blobX = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 })
    const blobY = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 })
    const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 })
    const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 })
    const dotX = useSpring(x, { stiffness: 700, damping: 35 })
    const dotY = useSpring(y, { stiffness: 700, damping: 35 })

    const [enabled, setEnabled] = useState(false)
    const [hovering, setHovering] = useState(false)
    const [pressed, setPressed] = useState(false)

    useEffect(() => {
        const fine = window.matchMedia('(pointer: fine)')
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (!fine.matches || reduce.matches) return
        setEnabled(true)

        const move = (e: PointerEvent) => {
            x.set(e.clientX)
            y.set(e.clientY)
            const t = e.target as Element | null
            setHovering(!!t?.closest('a, button, [role="tab"], input, textarea, label, select'))
        }
        const down = () => setPressed(true)
        const up = () => setPressed(false)

        window.addEventListener('pointermove', move)
        window.addEventListener('pointerdown', down)
        window.addEventListener('pointerup', up)
        return () => {
            window.removeEventListener('pointermove', move)
            window.removeEventListener('pointerdown', down)
            window.removeEventListener('pointerup', up)
        }
    }, [x, y])

    if (!enabled) return null

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden="true">
            {/* Ambient glow blob — the light that trails behind the cursor */}
            <motion.div style={{ x: blobX, y: blobY }} className="absolute top-0 left-0">
                <motion.div
                    animate={{ scale: hovering ? 1.6 : 1, opacity: hovering ? 0.5 : 0.3 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className="rounded-full"
                    style={{
                        width: 260,
                        height: 260,
                        marginLeft: -130,
                        marginTop: -130,
                        background:
                            'radial-gradient(circle, rgba(143,0,255,0.35) 0%, rgba(126,102,172,0.18) 35%, transparent 70%)',
                        filter: 'blur(8px)',
                    }}
                />
            </motion.div>

            {/* Lagging ring — expands and fills over interactive elements */}
            <motion.div style={{ x: ringX, y: ringY }} className="absolute top-0 left-0">
                <motion.div
                    animate={{
                        scale: (hovering ? 2.1 : 1) * (pressed ? 0.82 : 1),
                        opacity: hovering ? 1 : 0.8,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="rounded-full border"
                    style={{
                        width: 34,
                        height: 34,
                        marginLeft: -17,
                        marginTop: -17,
                        borderColor: 'rgba(155,133,196,0.9)',
                        background: hovering ? 'rgba(143,0,255,0.12)' : 'transparent',
                        boxShadow: '0 0 18px rgba(143,0,255,0.45)',
                    }}
                />
            </motion.div>

            {/* Precise dot — hides over interactive elements (ring takes over) */}
            <motion.div style={{ x: dotX, y: dotY }} className="absolute top-0 left-0">
                <motion.div
                    animate={{ scale: hovering ? 0 : pressed ? 0.6 : 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="rounded-full"
                    style={{
                        width: 7,
                        height: 7,
                        marginLeft: -3.5,
                        marginTop: -3.5,
                        background: '#8F00FF',
                        boxShadow: '0 0 12px rgba(143,0,255,0.9)',
                    }}
                />
            </motion.div>
        </div>
    )
}
