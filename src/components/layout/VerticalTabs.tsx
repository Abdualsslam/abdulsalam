import { motion } from 'framer-motion'
import { TabId, tabsConfig } from '../../hooks/useNavigation'
import { Home } from 'lucide-react'
import { ReactNode } from 'react'
import './VerticalTabs.css'

interface VerticalTabsProps {
    activeTab: TabId | null
    onTabChange: (tabId: TabId) => void
    children?: ReactNode
}

export default function VerticalTabs({ activeTab, onTabChange, children }: VerticalTabsProps) {
    // Filter out 'home' from tabs - these are the tabs that have associated pages
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

            {/* Stacked tab-pages - each tab is attached to its page */}
            <div className="stacked-pages">
                {tabs.map((tab, index) => {
                    const isActive = activeTab === tab.id
                    const tabIndex = tabs.findIndex(t => t.id === activeTab)

                    // Calculate the y position based on whether this tab is active
                    // When active: slide up to show full page
                    // When inactive: stack at bottom, showing only the tab
                    let yPosition = 'calc(100vh - 60px)' // Default: at bottom showing tab

                    if (isActive) {
                        yPosition = '0px' // Active: full page visible
                    } else if (tabIndex !== -1 && index < tabIndex) {
                        // Tabs before active tab: hidden below
                        yPosition = '100vh'
                    }

                    // Calculate horizontal offset for each tab (spread them out horizontally)
                    // This creates the side-by-side effect
                    const tabWidth = 100 // Width of each tab in pixels
                    const totalWidth = totalTabs * tabWidth
                    const startOffset = totalWidth / 2 - tabWidth / 2
                    const horizontalOffset = startOffset - (index * tabWidth)

                    return (
                        <motion.div
                            key={tab.id}
                            className="tab-page-unit"
                            initial={{ y: 'calc(100vh - 60px)' }}
                            animate={{ y: yPosition }}
                            transition={{
                                type: 'spring',
                                damping: 28,
                                stiffness: 180
                            }}
                            style={{
                                zIndex: isActive ? 50 : 10 + index,
                                '--tab-color': tab.color,
                                '--tab-offset': `${horizontalOffset}px`,
                                pointerEvents: isActive ? 'auto' : 'none',
                            } as React.CSSProperties}
                        >
                            <div
                                className="attached-tab"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    isActive ? onTabChange('home') : onTabChange(tab.id)
                                }}
                                style={{
                                    backgroundColor: tab.color,
                                    transform: `translateX(${horizontalOffset}px)`,
                                    pointerEvents: 'auto',
                                    zIndex: 100 + index,
                                }}
                            >
                                <span className="attached-tab-label">{tab.label}</span>
                            </div>

                            {/* The Page Content */}
                            <div
                                className="tab-page-content"
                                style={{
                                    borderTopColor: tab.color,
                                    backgroundColor: '#1a1a2e'
                                }}
                            >
                                {isActive && children}
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
