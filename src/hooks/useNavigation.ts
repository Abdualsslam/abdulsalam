import { useState, useCallback } from 'react'

export type TabId = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'contact'

export interface TabConfig {
    id: TabId
    label: string
    color: string
}

export const tabsConfig: TabConfig[] = [
    { id: 'home', label: 'الرئيسية', color: '#9b59b6' },
    { id: 'about', label: 'عني', color: '#b073d0' },
    { id: 'skills', label: 'المهارات', color: '#a566c3' },
    { id: 'projects', label: 'المشاريع', color: '#9b59b6' },
    { id: 'experience', label: 'الخبرات', color: '#8e44ad' },
    { id: 'contact', label: 'تواصل', color: '#7d3c98' },
]

export function useNavigation() {
    const [activeTab, setActiveTab] = useState<TabId | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)

    const openTab = useCallback((tabId: TabId) => {
        if (tabId === 'home') {
            setActiveTab(null)
            return
        }
        if (isAnimating) return
        setIsAnimating(true)
        setActiveTab(tabId)
        setTimeout(() => setIsAnimating(false), 500)
    }, [isAnimating])

    const closeTab = useCallback(() => {
        if (isAnimating) return
        setIsAnimating(true)
        setActiveTab(null)
        setTimeout(() => setIsAnimating(false), 500)
    }, [isAnimating])

    const getTabConfig = useCallback((tabId: TabId) => {
        return tabsConfig.find(tab => tab.id === tabId)
    }, [])

    return {
        activeTab,
        isAnimating,
        openTab,
        closeTab,
        getTabConfig,
        tabsConfig,
    }
}
