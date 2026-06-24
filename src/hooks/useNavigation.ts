import { useState, useCallback } from 'react'

export type TabId = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'qualifications' | 'contact'

export interface TabConfig {
    id: TabId
    label: string
    color: string
}

export const tabsConfig: TabConfig[] = [
    { id: 'home', label: 'الرئيسية', color: '#9b59b6' },
    { id: 'about', label: 'عني', color: '#b98fd6' },
    { id: 'skills', label: 'المهارات', color: '#a878c9' },
    { id: 'projects', label: 'المشاريع', color: '#9a63bd' },
    { id: 'experience', label: 'الخبرات', color: '#8a4fae' },
    { id: 'qualifications', label: 'المؤهلات', color: '#7a429e' },
    { id: 'contact', label: 'تواصل', color: '#6a3590' },
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
