import { getProjectById } from "../data/projects";
import type { TabId } from "../hooks/useNavigation";

export interface PortfolioRoute {
  activeTab: TabId | null;
  projectId: string | null;
  notFound: boolean;
}

export const sectionIds = ["about", "projects", "skills", "experience", "qualifications", "contact"] as const;
export const sectionHref = (id: TabId) => `${import.meta.env.BASE_URL}${id === "home" ? "" : `${id}/`}`;
export const projectHref = (id: string) => `${sectionHref("projects")}${id}/`;

export function readRoute(pathname: string): PortfolioRoute {
  const base = import.meta.env.BASE_URL;
  const path = pathname === base.slice(0, -1) ? "" : pathname.startsWith(base)
    ? pathname.slice(base.length).replace(/\/+$/, "").replace(/\/index\.html$/, "")
    : null;
  if (path === "" || path === "index.html") return { activeTab: null, projectId: null, notFound: false };
  if (path && sectionIds.includes(path as typeof sectionIds[number])) {
    return { activeTab: path as TabId, projectId: null, notFound: false };
  }
  if (path?.startsWith("projects/") && getProjectById(path.slice(9))) {
    return { activeTab: "projects", projectId: path.slice(9), notFound: false };
  }
  return { activeTab: null, projectId: null, notFound: true };
}

/** Preserve old shared fragment links while giving every page a crawlable URL. */
export function readLegacyHash(hash: string): PortfolioRoute | null {
  const id = hash.replace(/^#/, "");
  if (id === "home") return { activeTab: null, projectId: null, notFound: false };
  if (sectionIds.includes(id as typeof sectionIds[number])) {
    return { activeTab: id as TabId, projectId: null, notFound: false };
  }
  if (id.startsWith("projects/") && getProjectById(id.slice(9))) {
    return { activeTab: "projects", projectId: id.slice(9), notFound: false };
  }
  return null;
}

export const routeHref = (route: PortfolioRoute) => route.projectId
  ? projectHref(route.projectId)
  : sectionHref(route.activeTab ?? "home");
