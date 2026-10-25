import { useCallback, useEffect, useState } from "react";
import { getProjectById } from "../data/projects";
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
const readLocation = (): { activeTab: TabId | null; projectId: string | null } => {
  const id = window.location.hash.slice(1);
  if (id.startsWith("projects/")) {
    const projectId = id.slice("projects/".length);
    return { activeTab: "projects", projectId: getProjectById(projectId) ? projectId : null };
  }
  const activeTab = tabsConfig.some((tab) => tab.id === id && id !== "home")
    ? (id as TabId)
    : null;
  return { activeTab, projectId: null };
};
export function useNavigation() {
  const [{ activeTab, projectId }, setLocation] = useState(readLocation);
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const sync = () => setLocation(readLocation());
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.history.scrollRestoration = previousRestoration;
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);
  const openTab = useCallback((id: TabId) => {
    if (window.location.hash !== `#${id}`)
      window.history.pushState(null, "", `#${id}`);
    setLocation({ activeTab: id === "home" ? null : id, projectId: null });
  }, []);
  const openProject = useCallback((id: string) => {
    if (!getProjectById(id)) return;
    if (window.location.hash !== `#projects/${id}`) {
      window.history.pushState({ portfolioProject: true }, "", `#projects/${id}`);
    }
    setLocation({ activeTab: "projects", projectId: id });
  }, []);
  const closeProject = useCallback(() => {
    if (window.history.state?.portfolioProject) window.history.back();
    else openTab("projects");
  }, [openTab]);
  return { activeTab, projectId, openTab, openProject, closeProject };
}
