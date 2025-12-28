import { motion, PanInfo, useDragControls } from 'framer-motion'
import { TabId, tabsConfig } from '../../hooks/useNavigation'
import { Home } from 'lucide-react'
import { ReactNode, useRef, useState, useLayoutEffect, useEffect } from 'react'
import './VerticalTabs.css'

interface VerticalTabsProps {
    activeTab: TabId | null
    onTabChange: (tabId: TabId) => void
    tabContents: Record<TabId, ReactNode>
}

interface TabPageUnitProps {
    tab: TabConfig
    pageContent?: ReactNode
    index: number
    isActive: boolean
    tabIndex: number
    horizontalOffset: number
    totalTabs: number
    onTabChange: (tabId: TabId) => void
}

interface TabConfig {
    id: TabId
    label: string
    color: string
}

function TabPageUnit({ tab, pageContent, index, isActive, tabIndex, horizontalOffset, totalTabs, onTabChange }: TabPageUnitProps) {
    const dragControls = useDragControls()
    const contentRef = useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = useState(0)

    // Measure content height when active
    useLayoutEffect(() => {
        if (isActive && contentRef.current) {
            // Wait for content to render
            const measureHeight = () => {
                if (contentRef.current) {
                    const height = contentRef.current.scrollHeight
                    setContentHeight(height)
                }
            }
            // Measure immediately
            measureHeight()
            // Also measure after a short delay to catch dynamic content
            const timer = setTimeout(measureHeight, 100)
            return () => clearTimeout(timer)
        }
    }, [isActive, pageContent])

    // Recalculate height on window resize
    useEffect(() => {
        if (isActive && contentRef.current) {
            const handleResize = () => {
                if (contentRef.current) {
                    const height = contentRef.current.scrollHeight
                    setContentHeight(height)
                }
            }
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [isActive])

    // Calculate the y position and height based on content height
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800
    const tabHandleHeight = 60 // Base height of the tab handle
    const minTopPadding = 40 // Minimum padding from the top of the screen
    const borderTop = 4 // Border top of tab-page-content
    const heightIncrement = 8 // Increment per tab for staircase effect

    let yPosition = windowHeight - tabHandleHeight
    let dynamicHeight = windowHeight // Default to full height

    if (isActive && contentHeight > 0) {
        // Calculate total height needed for content
        // contentHeight already includes padding (24px + 100px bottom padding)
        const totalContentHeight = contentHeight + tabHandleHeight + borderTop

        if (totalContentHeight >= windowHeight - minTopPadding) {
            // Content is tall enough, use full height minus top padding
            dynamicHeight = windowHeight - minTopPadding
            yPosition = minTopPadding
        } else {
            // Content is shorter, use only the height needed
            dynamicHeight = totalContentHeight
            yPosition = windowHeight - totalContentHeight
            // Ensure minimum is at minTopPadding
            yPosition = Math.max(yPosition, minTopPadding)
            // Adjust height if we hit the minimum padding
            if (yPosition === minTopPadding) {
                dynamicHeight = windowHeight - minTopPadding
            }
        }
    } else if (isActive) {
        // Content not measured yet, use default full height
        dynamicHeight = windowHeight - minTopPadding
        yPosition = minTopPadding
    } else {
        // When not active, show the tab handle with incremental height for staircase effect
        // Reverse order: first tab is tallest, last tab is shortest
        const incrementalHeight = tabHandleHeight + ((totalTabs - 1 - index) * heightIncrement)
        dynamicHeight = incrementalHeight
        yPosition = windowHeight - incrementalHeight
    }

    if (tabIndex !== -1 && index < tabIndex) {
        yPosition = windowHeight
    }

    // Handle drag end
    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const velocity = info.velocity.y
        const offset = info.offset.y

        if (isActive) {
            if (offset > 150 || velocity > 500) {
                onTabChange('home')
            }
        } else {
            if (offset < -80 || velocity < -300) {
                onTabChange(tab.id)
            }
        }
    }

    return (
        <motion.div
            key={tab.id}
            className="tab-page-unit"
            initial={{ y: yPosition }}
            animate={{
                y: yPosition,
                transition: {
                    type: 'spring',
                    damping: 28,
                    stiffness: 180,
                    restDelta: 0.001
                }
            }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{
                top: isActive ? 0 : yPosition - 250,
                bottom: isActive ? 500 : yPosition
            }}
            dragElastic={{
                top: 0.05,
                bottom: isActive ? 0.2 : 0.05
            }}
            dragMomentum={false}
            dragTransition={{
                bounceStiffness: 500,
                bounceDamping: 50,
                power: 0.2
            }}
            onDragEnd={handleDragEnd}
            whileDrag={{
                cursor: 'grabbing',
                scale: 1,
            }}
            style={{
                zIndex: isActive ? 50 : 10 + index,
                '--tab-color': tab.color,
                '--tab-offset': `${horizontalOffset}px`,
                pointerEvents: 'none',
                touchAction: 'none',
                height: `${dynamicHeight}px`,
            } as React.CSSProperties}
        >
            <div
                className="attached-tab"
                onPointerDown={(e) => dragControls.start(e)}
                onClick={(e) => {
                    e.stopPropagation()
                    isActive ? onTabChange('home') : onTabChange(tab.id)
                }}
                style={{
                    backgroundColor: tab.color,
                    transform: `translateX(${horizontalOffset}px)`,
                    pointerEvents: 'auto',
                    zIndex: 100 + index,
                    cursor: 'grab',
                }}
            >
                <span className="attached-tab-label">{tab.label}</span>
            </div>

            {/* The Page Content */}
            <div
                className="tab-page-content"
                style={{
                    borderTopColor: tab.color,
                    backgroundColor: '#1a1a2e',
                    pointerEvents: isActive ? 'auto' : 'none',
                }}
            >
                <div className="tab-scroll-wrapper">
                    <div ref={contentRef} style={{ padding: '24px', paddingBottom: '100px' }}>
                        {pageContent}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}


export default function VerticalTabs({ activeTab, onTabChange, tabContents }: VerticalTabsProps) {
    const tabs = tabsConfig.filter(tab => tab.id !== 'home')
    const totalTabs = tabs.length

    return (
        <div className="tabs-system">
            {/* Fixed Home button */}
            <motion.button
                onClick={() => onTabChange('home')}
                className={`home-button-fixed ${activeTab === null ? 'active' : ''}`}
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Home size={20} />
                <span>الرئيسية</span>
            </motion.button>

            {/* Stacked tab-pages */}
            <div className="stacked-pages">
                {tabs.map((tab, index) => {
                    const isActive = activeTab === tab.id
                    const tabIndex = tabs.findIndex(t => t.id === activeTab)
                    const tabWidth = 100
                    const totalWidth = totalTabs * tabWidth
                    const startOffset = totalWidth / 2 - tabWidth / 2
                    const horizontalOffset = startOffset - (index * tabWidth)

                    return (
                        <TabPageUnit
                            key={tab.id}
                            tab={tab}
                            pageContent={tabContents[tab.id]}
                            index={index}
                            isActive={isActive}
                            tabIndex={tabIndex}
                            horizontalOffset={horizontalOffset}
                            totalTabs={totalTabs}
                            onTabChange={onTabChange}
                        />
                    )
                })}
            </div>
        </div>
    )
}
