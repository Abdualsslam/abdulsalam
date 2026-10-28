import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowUpLeft,
  FolderOpen,
} from "lucide-react";
import { AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Qualifications from "./components/sections/Qualifications";
import Contact from "./components/sections/Contact";
import VerticalTabs from "./components/layout/VerticalTabs";
import { useNavigation, tabsConfig } from "./hooks/useNavigation";
import { getProjectById } from "./data/projects";
import ProjectDetails from "./components/projects/ProjectDetails";

import AmbientEffects from "./components/common/AmbientEffects";
import { readRoute, readLegacyHash, sectionHref, type PortfolioRoute } from "./lib/routes";
import { applyPageMetadata, getPageMetadata } from "./lib/seo";

export default function App({ initialRoute }: { initialRoute: PortfolioRoute }) {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const effectsEnabled = ready && !reducedMotion;
  const { activeTab, projectId, notFound, openTab, openProject, closeProject } = useNavigation(initialRoute);
  const selectedProject = projectId ? getProjectById(projectId) : undefined;
  useEffect(() => {
    applyPageMetadata(getPageMetadata({ activeTab, projectId, notFound }));
  }, [activeTab, projectId, notFound]);
  const previousProject = useRef<string | null>(null);
  const projectListPosition = useRef(0);
  useLayoutEffect(() => {
    const panel = document.getElementById("panel-projects");
    if (projectId && !previousProject.current && panel) {
      projectListPosition.current = panel.scrollTop;
      panel.scrollTo({ top: panel.scrollTop, behavior: "instant" });
    }
    if (!projectId && previousProject.current && activeTab === "projects") {
      panel?.scrollTo({ top: projectListPosition.current, behavior: "instant" });
      document.getElementById(`project-${previousProject.current}`)?.focus({ preventScroll: true });
    }
    previousProject.current = projectId;
  }, [projectId, activeTab]);
  const handleLocalLink = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
    if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    const route = readLegacyHash(url.hash) ?? (!url.hash && readRoute(url.pathname));
    if (!route || route.notFound) return;
    event.preventDefault();
    if (route.projectId) openProject(route.projectId);
    else openTab(route.activeTab ?? "home");
    anchor.closest("details")?.removeAttribute("open");
  };
  return (
    <MotionConfig reducedMotion={effectsEnabled ? "user" : "always"}>
      <div
        className="portfolio folder-portfolio"
        data-ready={ready}
        data-effects={effectsEnabled ? "on" : "off"}
        onClick={handleLocalLink}
      >
        <AmbientEffects enabled={effectsEnabled} />
        <header className="site-header">
          <div className="header-inner">
            <a
              className="brand"
              href={sectionHref("home")}
              aria-label="عبدالسلام معاد — الغلاف"
            >
              <svg className="brand-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path className="brand-paper" d="M9 20V7h34l12 12v38H9V46M43 7v12h12" />
                <path className="brand-monogram" d="m13 43 8-22 8 22m-13-7h10m7 7V22l8 11 8-11v21" />
                <path className="brand-underline" d="M18 50h24" />
              </svg>
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
                {selectedProject ? "تفاصيل المشروع" : activeTab
                  ? tabsConfig.find((tab) => tab.id === activeTab)?.label
                  : "الغلاف"}
              </b>
            </div>
            <details className="site-index">
              <summary>تصفح الموقع</summary>
              <nav aria-label="صفحات الموقع">
                {tabsConfig.map(tab => <a key={tab.id} href={sectionHref(tab.id)} aria-current={!notFound && !projectId && (activeTab ?? "home") === tab.id ? "page" : undefined}>{tab.label}</a>)}
              </nav>
            </details>
            <a className="header-contact" href={sectionHref("contact")}>
              لنبنِ شيئاً مميزاً <ArrowUpLeft size={17} />
            </a>
          </div>
        </header>
        <div inert={!!selectedProject || notFound} aria-hidden={!!selectedProject || notFound}>
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
            <Hero effectsEnabled={effectsEnabled && activeTab === null && !selectedProject && !notFound} />
          </main>
          <VerticalTabs
            navigationEnabled={!selectedProject && !notFound}
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
        {notFound && <main className="project-detail-page" aria-labelledby="not-found-title"><div className="project-detail-inner section-space"><h1 id="not-found-title">الصفحة غير موجودة</h1><p>قد يكون الرابط غير صحيح أو تغيّر عنوان الصفحة.</p><a className="text-link" href={sectionHref("home")}>العودة إلى الصفحة الرئيسية</a></div></main>}
        <AnimatePresence initial={false}>
          {selectedProject && <ProjectDetails key={selectedProject.id} project={selectedProject} onBack={closeProject} effectsEnabled={effectsEnabled} />}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
