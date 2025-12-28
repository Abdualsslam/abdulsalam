import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import { useNavigation } from './hooks/useNavigation'
import VerticalTabs from './components/layout/VerticalTabs'

function App() {
    const { activeTab, openTab } = useNavigation()

    return (
        <div className="app min-h-screen overflow-hidden relative">
            {/* Hero stays fixed as background */}
            <div className="fixed inset-0 z-0">
                <Hero />
            </div>

            {/* Vertical Tabs with sliding pages */}
            <VerticalTabs
                activeTab={activeTab}
                onTabChange={openTab}
                tabContents={{
                    home: null,
                    about: <About />,
                    skills: <Skills />,
                    projects: <Projects />,
                    experience: <Experience />,
                    contact: <Contact />
                }}
            />
        </div>
    )
}

export default App
