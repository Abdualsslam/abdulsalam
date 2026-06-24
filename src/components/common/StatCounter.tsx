import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { SlotText } from 'slot-text/react'
import 'slot-text/style.css'

interface StatCounterProps {
    value: number
    prefix?: string
    label: string
    /** ms before the count-up starts */
    delay?: number
}

/**
 * Achievement stat with a rolling count-up powered by slot-text.
 * Counts from 0 to `value`; each changed digit rolls into place.
 * Honors prefers-reduced-motion by showing the final value instantly.
 */
export default function StatCounter({ value, prefix = '', label, delay = 0 }: StatCounterProps) {
    const reduce = useReducedMotion()
    const [count, setCount] = useState(reduce ? value : 0)

    useEffect(() => {
        if (reduce) {
            setCount(value)
            return
        }
        let intervalId: number | undefined
        const startTimer = window.setTimeout(() => {
            const totalSteps = 36
            const step = Math.max(1, Math.ceil(value / totalSteps))
            intervalId = window.setInterval(() => {
                setCount((prev) => {
                    const next = prev + step
                    if (next >= value) {
                        if (intervalId) clearInterval(intervalId)
                        return value
                    }
                    return next
                })
            }, 45)
        }, delay)

        return () => {
            clearTimeout(startTimer)
            if (intervalId) clearInterval(intervalId)
        }
    }, [value, reduce, delay])

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-3 text-center">
            <div
                dir="ltr"
                className="flex items-center justify-center text-2xl md:text-3xl font-extrabold leading-none"
                style={{ color: '#b98fd6', fontVariantNumeric: 'tabular-nums' }}
            >
                {prefix && <span>{prefix}</span>}
                <SlotText
                    text={String(count)}
                    options={{ direction: 'up', stagger: 30, duration: 280, bounce: 0.4, skipUnchanged: true }}
                />
            </div>
            <div className="text-[11px] md:text-xs text-gray-400 mt-1.5 leading-tight">{label}</div>
        </div>
    )
}
