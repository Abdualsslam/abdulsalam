import { useState, useCallback } from 'react'

export type TabId = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'contact'

export interface TabConfig {
    id: TabId
    label: string
    color: string
}

export const tabsConfig: TabConfig[] = [
    { id: 'home', label: 'الرئيسية', color: '#7E66AC' },
    { id: 'about', label: 'عني', color: '#FF6B6B' },
    { id: 'skills', label: 'المهارات', color: '#4ECDC4' },
    { id: 'projects', label: 'المشاريع', color: '#FFE66D' },
    { id: 'experience', label: 'الخبرات', color: '#95E1D3' },
    { id: 'contact', label: 'تواصل', color: '#DDA0DD' },
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
