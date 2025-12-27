import { AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import TabBar from './components/layout/TabBar'
import PaperPage from './components/layout/PaperPage'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import { useNavigation, TabId } from './hooks/useNavigation'

function App() {
    const { activeTab, openTab, closeTab } = useNavigation()

    const pages: { id: TabId; component: ReactNode }[] = [
        { id: 'about', component: <About /> },
        { id: 'skills', component: <Skills /> },
        { id: 'projects', component: <Projects /> },
        { id: 'experience', component: <Experience /> },
        { id: 'contact', component: <Contact /> },
    ]

    return (
        <div className="app min-h-screen overflow-hidden relative">
            {/* Hero stays fixed as background */}
            <div className="fixed inset-0 z-0">
                <Hero />
            </div>

            {/* Paper Pages */}
            <AnimatePresence>
                {pages.map((page, index) => (
                    <PaperPage
                        key={page.id}
                        tabId={page.id}
                        isActive={activeTab === page.id}
                        onClose={closeTab}
                        zIndex={50 + index}
                    >
                        {page.component}
                    </PaperPage>
                ))}
            </AnimatePresence>

            {/* Tab Bar at bottom */}
            <TabBar activeTab={activeTab} onTabChange={openTab} />
        </div>
    )
}

export default App
