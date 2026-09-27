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
  { id: "home", label: "الغلاف", color: "#b98fd6" },
  { id: "about", label: "عني", color: "#b98fd6" },
  { id: "projects", label: "أعمالي", color: "#b48be4" },
  { id: "skills", label: "مهاراتي", color: "#a878c9" },
  { id: "experience", label: "خبراتي", color: "#c19ae7" },
  { id: "qualifications", label: "مؤهلاتي", color: "#ad8dd4" },
  { id: "contact", label: "تواصل", color: "#d0a8ed" },
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
