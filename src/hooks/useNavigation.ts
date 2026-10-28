import { useCallback, useEffect, useState } from "react";
import { getProjectById } from "../data/projects";
import { projectHref, readLegacyHash, readRoute, routeHref, sectionHref, type PortfolioRoute } from "../lib/routes";
export type TabId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "qualifications"
  | "contact";
export interface TabConfig {
  id: TabId;
  label: string;
  color: string;
}
export const tabsConfig: TabConfig[] = [
  { id: "home", label: "الغلاف", color: "var(--paper-accent)" },
  { id: "about", label: "عني", color: "var(--paper-accent)" },
  { id: "projects", label: "أعمالي", color: "var(--paper-accent)" },
  { id: "skills", label: "مهاراتي", color: "var(--paper-accent)" },
  { id: "experience", label: "خبراتي", color: "var(--paper-accent)" },
  { id: "qualifications", label: "مؤهلاتي", color: "var(--paper-accent)" },
  { id: "contact", label: "تواصل", color: "var(--paper-accent)" },
];
export function useNavigation(initialRoute: PortfolioRoute) {
  const [{ activeTab, projectId, notFound }, setLocation] = useState(initialRoute);
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const sync = () => {
      const legacy = readLegacyHash(window.location.hash);
      if (legacy) window.history.replaceState(null, "", routeHref(legacy));
      setLocation(legacy ?? readRoute(window.location.pathname));
    };
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.history.scrollRestoration = previousRestoration;
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);
  const openTab = useCallback((id: TabId) => {
    const href = sectionHref(id);
    if (window.location.pathname !== href || window.location.hash)
      window.history.pushState(null, "", href);
    setLocation({ activeTab: id === "home" ? null : id, projectId: null, notFound: false });
  }, []);
  const openProject = useCallback((id: string) => {
    if (!getProjectById(id)) return;
    const href = projectHref(id);
    if (window.location.pathname !== href) {
      window.history.pushState({ portfolioProject: true }, "", href);
    }
    setLocation({ activeTab: "projects", projectId: id, notFound: false });
  }, []);
  const closeProject = useCallback(() => {
    if (window.history.state?.portfolioProject) window.history.back();
    else openTab("projects");
  }, [openTab]);
  return { activeTab, projectId, notFound, openTab, openProject, closeProject };
}
