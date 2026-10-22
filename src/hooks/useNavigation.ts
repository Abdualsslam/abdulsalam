import { useCallback, useEffect, useState } from "react";
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
const readHash = (): TabId | null => {
  const id = window.location.hash.slice(1);
  return tabsConfig.some((tab) => tab.id === id && id !== "home")
    ? (id as TabId)
    : null;
};
export function useNavigation() {
  const [activeTab, setActiveTab] = useState<TabId | null>(readHash);
  useEffect(() => {
    const sync = () => setActiveTab(readHash());
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);
  const openTab = useCallback((id: TabId) => {
    if (window.location.hash !== `#${id}`)
      window.history.pushState(null, "", `#${id}`);
    setActiveTab(id === "home" ? null : id);
  }, []);
  return { activeTab, openTab };
}
