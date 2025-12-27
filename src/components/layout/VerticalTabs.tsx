import { motion } from 'framer-motion'
import { TabId, tabsConfig } from '../../hooks/useNavigation'
import { Home } from 'lucide-react'
import './VerticalTabs.css'

interface VerticalTabsProps {
    activeTab: TabId | null
    onTabChange: (tabId: TabId) => void
}

export default function VerticalTabs({ activeTab, onTabChange }: VerticalTabsProps) {
    // Filter out 'home' from tabs as it will be handled separately or shown differently
    const tabs = tabsConfig.filter(tab => tab.id !== 'home')

    return (
        <motion.nav
            className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        >
            <div className="vertical-tabs-container pointer-events-auto">
                {/* Home button - separate from the skewed tabs */}
                <motion.button
                    onClick={() => onTabChange('home')}
                    className={`home-tab ${activeTab === null ? 'active' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        backgroundColor: activeTab === null ? '#7E66AC' : 'rgba(126, 102, 172, 0.4)',
                    }}
                >
                    <Home size={20} />
                    <span>الرئيسية</span>
                </motion.button>

                {/* Skewed tabs container */}
                <div className="tabbed skin-graphite round">
                    <ul>
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id

                            return (
                                <li
                                    key={tab.id}
                                    className={isActive ? 'active' : ''}
                                    onClick={() => onTabChange(tab.id)}
                                    style={{
                                        '--tab-color': tab.color,
                                        '--tab-color-light': `${tab.color}CC`,
                                        '--tab-color-dark': tab.color,
                                    } as React.CSSProperties}
                                >
                                    {tab.label}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </motion.nav>
    )
}
