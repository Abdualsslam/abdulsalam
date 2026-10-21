import { useState, type MouseEvent } from "react";
import {
  ArrowUpLeft,
  Code2,
  FolderOpen,
  Sparkles,
  Pause,
} from "lucide-react";
import { MotionConfig, useReducedMotion } from "framer-motion";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Qualifications from "./components/sections/Qualifications";
import Contact from "./components/sections/Contact";
import VerticalTabs from "./components/layout/VerticalTabs";
import { useNavigation, tabsConfig } from "./hooks/useNavigation";

import AmbientEffects from "./components/common/AmbientEffects";

export default function App() {
  const reducedMotion = useReducedMotion();
  const [effectsPaused, setEffectsPaused] = useState(false);
  const effectsEnabled = !effectsPaused && !reducedMotion;
  const { activeTab, openTab } = useNavigation();
  const handleLocalLink = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest('a[href^="#"]');
    const id = anchor?.getAttribute("href")?.slice(1);
    const target = tabsConfig.find((tab) => tab.id === id);
    if (target) {
      event.preventDefault();
      openTab(target.id);
    }
  };
  return (
    <MotionConfig reducedMotion={effectsEnabled ? "user" : "always"}>
      <div
        className="portfolio folder-portfolio"
        data-effects={effectsEnabled ? "on" : "off"}
        onClick={handleLocalLink}
      >
        <AmbientEffects enabled={effectsEnabled} />
        <header className="site-header">
          <div className="header-inner">
            <a
              className="brand"
              href="#home"
              aria-label="عبدالسلام معاد — الغلاف"
            >
              <span className="brand-icon">
                <Code2 size={23} />
              </span>
              <span>
                عبدالسلام<span className="brand-dot">.</span>
                <small>ABDULSALAM MUAAD</small>
              </span>
            </a>
            <div className="file-breadcrumb">
              <FolderOpen size={17} />
              <span>الملف الشخصي</span>
              <span>/</span>
              <b>
                {activeTab
                  ? tabsConfig.find((tab) => tab.id === activeTab)?.label
                  : "الغلاف"}
              </b>
            </div>
            <div className="header-actions">
              <button
                className="effects-toggle"
                type="button"
                disabled={!!reducedMotion}
                onClick={() => setEffectsPaused(!effectsPaused)}
                aria-pressed={effectsPaused || !!reducedMotion}
                aria-label={
                  reducedMotion
                    ? "الحركة متوقفة وفق إعدادات جهازك"
                    : effectsPaused
                    ? "تشغيل المؤثرات الحركية"
                    : "تهدئة المؤثرات الحركية"
                }
                title={reducedMotion ? "الحركة مخففة وفق إعدادات جهازك" : effectsPaused ? "تشغيل المؤثرات" : "تهدئة الحركة"}
              >
                {effectsEnabled ? <Sparkles size={17} /> : <Pause size={17} />}
              </button>
              <a className="header-contact" href="#contact">
                لنبنِ شيئاً مميزاً <ArrowUpLeft size={17} />
              </a>
            </div>
          </div>
        </header>
        <main
          id="main"
          className="folder-cover"
          inert={activeTab !== null}
          aria-hidden={activeTab !== null}
        >
          <div className="cover-file-label page-width">
            <span dir="ltr">PORTFOLIO / PERSONAL FILE</span>
            <span>أفكار، أعمال، وما بينهما.</span>
          </div>
          <Hero effectsEnabled={effectsEnabled} concealed={activeTab !== null} />
        </main>
        <VerticalTabs
          effectsEnabled={effectsEnabled}
          activeTab={activeTab}
          onTabChange={openTab}
          tabContents={{
            home: null,
            about: <About />,
            projects: <Projects />,
            skills: <Skills />,
            experience: <Experience />,
            qualifications: <Qualifications />,
            contact: <Contact />,
          }}
        />
      </div>
    </MotionConfig>
  );
}
