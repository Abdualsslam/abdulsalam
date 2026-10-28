import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { projectsData } from "./data/projects";
import { getProjectCaseStudy } from "./data/caseStudies";
import { profile } from "./data/profile";
import { projectHref, readRoute, sectionHref, sectionIds } from "./lib/routes";
import { getPageMetadata, normalizeSiteUrl, renderMetaTags } from "./lib/seo";

export const pagePaths = [sectionHref("home"), ...sectionIds.map(sectionHref), ...projectsData.map(project => projectHref(project.id))];
export const noindex = import.meta.env.VITE_NOINDEX === "true";
export const siteUrl = import.meta.env.VITE_SITE_URL;

// These are independent static documents, with no portfolio React shell.
export const showcasePages = projectsData.flatMap(project => {
  const study = getProjectCaseStudy(project.id);
  const showcase = study?.showcase;
  if (!showcase) return [];
  const site = normalizeSiteUrl(siteUrl);
  const canonical = site ? new URL(showcase.path, site).href : undefined;
  const title = `${project.title} | معرض الواجهات — ${profile.name}`;
  const metadata = getPageMetadata({ activeTab: "projects", projectId: project.id, notFound: false });
  return [{
    path: showcase.path,
    canonical,
    headHtml: renderMetaTags({
      ...metadata,
      title,
      description: showcase.summary,
      canonical,
      image: site && study.screenshots?.[0] ? new URL(`projects/${project.id}/${study.screenshots[0].file}`, site).href : undefined,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: title,
        description: showcase.summary,
        inLanguage: "ar",
        ...(canonical && { url: canonical }),
        author: { "@type": "Person", name: profile.name },
      },
    }),
  }];
});

export function renderPage(path: string) {
  const route = readRoute(path);
  const metadata = getPageMetadata(route);
  return {
    appHtml: renderToString(<StrictMode><App initialRoute={route} /></StrictMode>),
    headHtml: renderMetaTags(metadata),
    canonical: metadata.canonical,
  };
}

export const llmsText = () => {
  const absolute = (path: string) => new URL(path.slice(import.meta.env.BASE_URL.length), siteUrl).href;
  return `# ${profile.name} | ${profile.alternateName}\n\n> ${profile.description}\n\nهذا الملف دليل اختياري للمحتوى العام. المعلومات التفصيلية متاحة في الصفحات التالية.\n\n## الملف الشخصي\n\n${sectionIds.map(id => `- [${id}](${absolute(sectionHref(id))})`).join("\n")}\n\n## المشاريع\n\n${projectsData.map(project => `- [${project.title}](${absolute(projectHref(project.id))}): ${project.description}`).join("\n")}\n\n## التواصل\n\n- البريد: ${profile.email}\n- GitHub: ${profile.sameAs.github}\n- LinkedIn: ${profile.sameAs.linkedin}\n`;
};
