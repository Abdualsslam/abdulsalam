import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface MagneticButtonProps {
    children: ReactNode
    href: string
    className?: string
    download?: boolean
    strength?: number
    onClick?: (e: React.MouseEvent) => void
}

/**
 * Anchor that eases toward the cursor while hovered, snapping back on leave.
 * Falls back to a static anchor when reduced motion is requested.
 */
export default function MagneticButton({
    children,
    href,
    className,
    download = false,
    strength = 0.35,
    onClick,
}: MagneticButtonProps) {
    const reduce = useReducedMotion()
    const ref = useRef<HTMLAnchorElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
    const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

    const handleMove = (e: React.MouseEvent) => {
        if (reduce || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const reset = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.a
            ref={ref}
            href={href}
            download={download}
            className={className}
            style={{ x: sx, y: sy }}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            onClick={onClick}
        >
            {children}
        </motion.a>
    )
}
