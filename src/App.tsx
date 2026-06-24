import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Qualifications from './components/sections/Qualifications'
import Contact from './components/sections/Contact'
import { useNavigation } from './hooks/useNavigation'
import VerticalTabs from './components/layout/VerticalTabs'
import CursorGlow from './components/common/CursorGlow'

function App() {
    const { activeTab, openTab } = useNavigation()

    return (
        <div className="app min-h-screen overflow-hidden relative">
            {/* Interactive cursor effect (desktop, motion-safe) */}
            <CursorGlow />

            {/* Hero stays fixed as background */}
            <div className="fixed inset-0 z-0">
                <Hero onOpenContact={() => openTab('contact')} />
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
                    qualifications: <Qualifications />,
                    contact: <Contact />
                }}
            />
        </div>
    )
}

export default App
