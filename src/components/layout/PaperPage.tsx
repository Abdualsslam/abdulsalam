import { motion, PanInfo, useAnimation } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import { TabId, tabsConfig } from '../../hooks/useNavigation'

interface PaperPageProps {
    tabId: TabId
    isActive: boolean
    onClose: () => void
    children: ReactNode
    zIndex: number
}

export default function PaperPage({ tabId, isActive, onClose, children, zIndex }: PaperPageProps) {
    const controls = useAnimation()
    const tabConfig = tabsConfig.find(t => t.id === tabId)
    const color = tabConfig?.color || '#7E66AC'

    useEffect(() => {
        if (isActive) {
            controls.start('visible')
        } else {
            controls.start('hidden')
        }
    }, [isActive, controls])

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        // If dragged down more than 150px, close the page
        if (info.offset.y > 150 || info.velocity.y > 500) {
            onClose()
        } else {
            // Snap back to position
            controls.start('visible')
        }
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
        // Only close if clicking the backdrop itself, not the content
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <>
            {/* Backdrop overlay */}
            <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleBackdropClick}
                style={{
                    pointerEvents: isActive ? 'auto' : 'none',
                    zIndex: zIndex - 1
                }}
            />

            {/* Paper page */}
            <motion.div
                className="fixed inset-x-0 top-0 bottom-20 z-40 overflow-hidden touch-none"
                style={{ zIndex, pointerEvents: isActive ? 'auto' : 'none' }}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: {
                        y: '100%',
                        transition: {
                            type: 'spring',
                            damping: 30,
                            stiffness: 200
                        }
                    },
                    visible: {
                        y: 0,
                        transition: {
                            type: 'spring',
                            damping: 25,
                            stiffness: 120
                        }
                    }
                }}
                drag={isActive ? "y" : false}
                dragConstraints={{ top: 0 }}
                dragElastic={{ top: 0, bottom: 0.8 }}
                onDragEnd={handleDragEnd}
            >
                {/* Paper with colored edge */}
                <div
                    className="relative w-full h-full rounded-t-3xl overflow-hidden shadow-2xl"
                    style={{
                        boxShadow: `0 -10px 50px ${color}30, 0 -5px 20px rgba(0,0,0,0.3)`
                    }}
                >
                    {/* Colored top edge (like folder tab) */}
                    <div
                        className="absolute top-0 left-0 right-0 h-2"
                        style={{ backgroundColor: color }}
                    />

                    {/* Drag handle */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-white/30 cursor-grab active:cursor-grabbing" />

                    {/* Content area */}
                    <div className="w-full h-full bg-dark overflow-y-auto pt-8">
                        {children}
                    </div>

                    {/* Bottom gradient fade (to blend with tabs) */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
                </div>
            </motion.div>
        </>
    )
}
