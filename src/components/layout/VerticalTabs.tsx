import { motion, PanInfo, useDragControls } from 'framer-motion'
import { TabId, tabsConfig } from '../../hooks/useNavigation'
import { Home } from 'lucide-react'
import { ReactNode } from 'react'
import './VerticalTabs.css'

interface VerticalTabsProps {
    activeTab: TabId | null
    onTabChange: (tabId: TabId) => void
    children?: ReactNode
}

interface TabPageUnitProps {
    tab: TabConfig
    index: number
    isActive: boolean
    tabIndex: number
    horizontalOffset: number
    onTabChange: (tabId: TabId) => void
    children?: ReactNode
}

interface TabConfig {
    id: TabId
    label: string
    color: string
}

function TabPageUnit({ tab, index, isActive, tabIndex, horizontalOffset, onTabChange, children }: TabPageUnitProps) {
    const dragControls = useDragControls()

    // Calculate the y position
    let yPosition = window.innerHeight - 60

    if (isActive) {
        yPosition = 0
    } else if (tabIndex !== -1 && index < tabIndex) {
        yPosition = window.innerHeight
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
                {isActive && children}
            </div>
        </motion.div>
    )
}


export default function VerticalTabs({ activeTab, onTabChange, children }: VerticalTabsProps) {
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
                            index={index}
                            isActive={isActive}
                            tabIndex={tabIndex}
                            horizontalOffset={horizontalOffset}
                            onTabChange={onTabChange}
                        >
                            {isActive && children}
                        </TabPageUnit>
                    )
                })}
            </div>
        </div>
    )
}
