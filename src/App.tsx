import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import { useNavigation, TabId } from './hooks/useNavigation'
import VerticalTabs from './components/layout/VerticalTabs'
import { ReactNode } from 'react'

function App() {
    const { activeTab, openTab } = useNavigation()

    // Map tab IDs to their components
    const getPageContent = (tabId: TabId | null): ReactNode => {
        switch (tabId) {
            case 'about':
                return <About />
            case 'skills':
                return <Skills />
            case 'projects':
                return <Projects />
            case 'experience':
                return <Experience />
            case 'contact':
                return <Contact />
            default:
                return null
        }
    }

    return (
        <div className="app min-h-screen overflow-hidden relative">
            {/* Hero stays fixed as background */}
            <div className="fixed inset-0 z-0">
                <Hero />
            </div>

            {/* Vertical Tabs with sliding pages */}
            <VerticalTabs activeTab={activeTab} onTabChange={openTab}>
                {getPageContent(activeTab)}
            </VerticalTabs>
        </div>
    )
}

export default App
