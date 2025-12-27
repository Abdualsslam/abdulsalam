import { motion } from 'framer-motion'
import { TabId, tabsConfig } from '../../hooks/useNavigation'
import { Home } from 'lucide-react'

interface TabBarProps {
    activeTab: TabId | null
    onTabChange: (tabId: TabId) => void
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
    return (
        <motion.nav
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-end pb-4 px-4 pointer-events-none"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        >
            <div className="flex gap-1 pointer-events-auto">
                {tabsConfig.map((tab, index) => {
                    const isActive = activeTab === tab.id || (tab.id === 'home' && activeTab === null)
                    const isHome = tab.id === 'home'

                    return (
                        <motion.button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                                relative px-4 py-3 rounded-t-xl font-semibold text-sm
                                transition-all duration-300 cursor-pointer border-none
                                ${isActive ? 'text-dark' : 'text-white/80 hover:text-white'}
                            `}
                            style={{
                                backgroundColor: isActive ? tab.color : `${tab.color}40`,
                                boxShadow: isActive
                                    ? `0 -4px 20px ${tab.color}50, 0 -2px 10px ${tab.color}30`
                                    : 'none',
                                zIndex: isActive ? 10 : tabsConfig.length - index,
                            }}
                            whileHover={{
                                y: -5,
                                backgroundColor: tab.color,
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Tab notch/fold effect */}
                            <div
                                className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full opacity-50"
                                style={{ backgroundColor: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }}
                            />

                            <span className="flex items-center gap-2">
                                {isHome && <Home size={16} />}
                                {tab.label}
                            </span>

                            {/* Active indicator dot */}
                            {isActive && !isHome && (
                                <motion.div
                                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white"
                                    layoutId="activeIndicator"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    )
                })}
            </div>
        </motion.nav>
    )
}
