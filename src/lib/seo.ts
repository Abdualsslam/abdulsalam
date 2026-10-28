import { getProjectById, projectsData } from "../data/projects";
import { getProjectCaseStudy } from "../data/caseStudies";
import { faqItems, profile } from "../data/profile";
import type { TabId } from "../hooks/useNavigation";

export interface PageLocation {
  activeTab: TabId | null;
  projectId: string | null;
  notFound?: boolean;
}

export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  robots: string;
  structuredData: Record<string, unknown>;
}

const sections: Record<TabId, { title: string; description: string; label: string }> = {
  home: {
    title: `${profile.name} | مطور Flutter ومواقع ويب وخبير أتمتة`,
    description: profile.description,
    label: "الرئيسية",
  },
  about: {
    title: `عن ${profile.name} | تطوير التطبيقات وأتمتة الأعمال`,
    description: "تعرّف على عبدالسلام معاد وخدمات تطوير تطبيقات Flutter وDart، ومواقع الويب، وتحليل النظم، وأتمتة مسارات العمل باستخدام Python وn8n.",
    label: "عني",
  },
  projects: {
    title: `مشاريع ${profile.name} | تطبيقات Flutter ومواقع وحزم مفتوحة المصدر`,
    description: "استعرض مشاريع عبدالسلام معاد ودراسات تطوير تطبيقات Flutter ومواقع الويب، مع تفاصيل المزايا والبنية التقنية وحزم Dart المنشورة على pub.dev.",
    label: "أعمالي",
  },
  skills: {
    title: `المهارات التقنية | ${profile.name}`,
    description: "مهارات عبدالسلام معاد في Flutter وDart، وإدارة الحالة، والمعمارية النظيفة، والتكامل مع الخدمات، وتحليل النظم وأتمتة العمل باستخدام Python وn8n.",
    label: "مهاراتي",
  },
  experience: {
    title: `الخبرة المهنية | ${profile.name}`,
    description: "الخبرات المهنية لعبدالسلام معاد في تطوير التطبيقات والمواقع وتحليل النظم وإدارة المشاريع، مع عرض المحطات والأدوار والمسؤوليات العملية.",
    label: "خبراتي",
  },
  qualifications: {
    title: `المؤهلات والشهادات | ${profile.name}`,
    description: "المؤهلات العلمية والشهادات والدورات واللغات لعبدالسلام معاد، الحاصل على بكالوريوس تقنية المعلومات والمختص بتطوير التطبيقات وتحليل النظم.",
    label: "مؤهلاتي",
  },
  contact: {
    title: `تواصل مع ${profile.name} | ناقش مشروع تطبيق أو موقع`,
    description: "تواصل مع عبدالسلام معاد لمناقشة تطوير تطبيق Flutter أو موقع ويب أو أتمتة مسارات العمل، عبر البريد الإلكتروني والهاتف وروابط التواصل المهنية.",
    label: "تواصل",
  },
};

/** The public website root, including any deployment subpath. No domain is guessed. */
export function normalizeSiteUrl(value?: string): string | undefined {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (!/^https?:$/.test(url.protocol) || url.username || url.password) {
    throw new Error("VITE_SITE_URL must be a public http(s) URL without credentials.");
  }
  url.search = "";
  url.hash = "";
  url.pathname = `${url.pathname.replace(/\/+$/, "")}/`;
  return url.href;
}

export function getPageMetadata(
  location: PageLocation,
  siteUrl: string | undefined = import.meta.env.VITE_SITE_URL,
): PageMetadata {
  const site = normalizeSiteUrl(siteUrl);
  const absolute = (path = "") => site ? new URL(path, site).href : undefined;
  const tab = location.activeTab ?? "home";
  const project = location.projectId ? getProjectById(location.projectId) : undefined;
  const notFound = location.notFound || (!!location.projectId && !project);
  const study = project ? getProjectCaseStudy(project.id) : undefined;
  const path = project ? `projects/${project.id}/` : tab === "home" ? "" : `${tab}/`;
  const canonical = notFound ? undefined : absolute(path);
  const image = absolute("portrait-video/loops/idle.webp");
  const title = notFound ? `الصفحة غير موجودة | ${profile.name}` : project
    ? `${project.title} | دراسة مشروع — ${profile.name}`
    : sections[tab].title;
  const description = notFound ? "الصفحة المطلوبة غير موجودة. يمكنك العودة إلى الملف الشخصي واستعراض المشاريع ووسائل التواصل."
    : project ? (study?.summary ?? project.description) : sections[tab].description;
  const robots = notFound || import.meta.env.VITE_NOINDEX === "true"
    ? "noindex, follow"
    : "index, follow, max-image-preview:large";

  if (notFound) return { title, description, robots, structuredData: { "@context": "https://schema.org", "@graph": [] } };

  const person = {
    "@type": "Person",
    ...(site && { "@id": `${site}#person`, url: site }),
    name: profile.name,
    alternateName: profile.alternateName,
    jobTitle: profile.jobTitle,
    description: profile.description,
    email: `mailto:${profile.email}`,
    telephone: profile.telephone,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.address.locality,
      addressCountry: profile.address.countryCode,
    },
    sameAs: Object.values(profile.sameAs),
    ...(image && { image }),
  };
  const personRef = site ? { "@id": `${site}#person` } : person;
  const website = {
    "@type": "WebSite",
    ...(site && { "@id": `${site}#website`, url: site }),
    name: `${profile.name} — الملف الشخصي`,
    alternateName: profile.alternateName,
    inLanguage: "ar",
    publisher: personRef,
  };
  const webpage: Record<string, unknown> = {
    "@type": project ? "WebPage" : tab === "home" || tab === "about" ? "ProfilePage"
      : tab === "contact" ? "ContactPage" : tab === "projects" ? "CollectionPage" : "WebPage",
    ...(canonical && { "@id": `${canonical}#webpage`, url: canonical }),
    ...(site && { isPartOf: { "@id": `${site}#website` } }),
    name: title,
    description,
    inLanguage: "ar",
    ...(tab === "home" || tab === "about" ? { mainEntity: personRef } : { about: personRef }),
  };
  const graph: Record<string, unknown>[] = [person, website, webpage];

  if (canonical && tab !== "home") {
    const crumbs = [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: site },
      ...(project ? [{ "@type": "ListItem", position: 2, name: "أعمالي", item: absolute("projects/") }] : []),
      { "@type": "ListItem", position: project ? 3 : 2, name: project?.title ?? sections[tab].label, item: canonical },
    ];
    graph.push({ "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, itemListElement: crumbs });
    webpage.breadcrumb = { "@id": `${canonical}#breadcrumb` };
  }

  if (project) {
    const work = {
      "@type": "CreativeWork",
      ...(canonical && { "@id": `${canonical}#case-study`, url: canonical }),
      name: `دراسة مشروع: ${project.title}`,
      description,
      inLanguage: "ar",
      author: personRef,
      keywords: project.tags.join(", "),
      genre: project.category,
    };
    graph.push(work);
    webpage.mainEntity = canonical ? { "@id": `${canonical}#case-study` } : work;
  } else if (tab === "projects") {
    webpage.mainEntity = {
      "@type": "ItemList",
      numberOfItems: projectsData.length,
      itemListElement: projectsData.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        ...(site && { url: absolute(`projects/${item.id}/`) }),
      })),
    };
  } else if (tab === "about") {
    graph.push({
      "@type": "FAQPage",
      ...(canonical && { "@id": `${canonical}#faq`, isPartOf: { "@id": `${canonical}#webpage` } }),
      inLanguage: "ar",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return { title, description, canonical, image, robots, structuredData: { "@context": "https://schema.org", "@graph": graph } };
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]!);

/** Prevent a content value from terminating the JSON-LD script element. */
export const serializeStructuredData = (value: Record<string, unknown>) =>
  JSON.stringify(value).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

/** Replaces the template's SEO marker at build time. */
export function renderMetaTags(metadata: PageMetadata): string {
  const tag = (key: string, value: string, property = false) =>
    `<meta ${property ? "property" : "name"}="${key}" content="${escapeHtml(value)}" />`;
  return [
    `<title>${escapeHtml(metadata.title)}</title>`,
    tag("description", metadata.description),
    tag("author", profile.name),
    tag("robots", metadata.robots),
    tag("og:type", "website", true),
    tag("og:locale", "ar_YE", true),
    tag("og:site_name", profile.name, true),
    tag("og:title", metadata.title, true),
    tag("og:description", metadata.description, true),
    tag("twitter:card", "summary"),
    tag("twitter:title", metadata.title),
    tag("twitter:description", metadata.description),
    ...(metadata.canonical ? [
      `<link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`,
      tag("og:url", metadata.canonical, true),
    ] : []),
    ...(metadata.image ? [
      tag("og:image", metadata.image, true),
      tag("og:image:alt", profile.name, true),
      tag("twitter:image", metadata.image),
      tag("twitter:image:alt", profile.name),
    ] : []),
    `<script id="page-structured-data" type="application/ld+json">${serializeStructuredData(metadata.structuredData)}</script>`,
  ].join("\n    ");
}

/** Keeps client navigation consistent with the independently crawlable HTML pages. */
export function applyPageMetadata(metadata: PageMetadata): void {
  document.title = metadata.title;
  const setMeta = (key: string, value: string | undefined, property = false) => {
    const attribute = property ? "property" : "name";
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (value === undefined) { element?.remove(); return; }
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, key);
      document.head.append(element);
    }
    element.content = value;
  };
  setMeta("description", metadata.description);
  setMeta("author", profile.name);
  setMeta("robots", metadata.robots);
  setMeta("og:type", "website", true);
  setMeta("og:locale", "ar_YE", true);
  setMeta("og:site_name", profile.name, true);
  setMeta("og:title", metadata.title, true);
  setMeta("og:description", metadata.description, true);
  setMeta("og:url", metadata.canonical, true);
  setMeta("og:image", metadata.image, true);
  setMeta("og:image:alt", metadata.image ? profile.name : undefined, true);
  setMeta("twitter:card", "summary");
  setMeta("twitter:title", metadata.title);
  setMeta("twitter:description", metadata.description);
  setMeta("twitter:image", metadata.image);
  setMeta("twitter:image:alt", metadata.image ? profile.name : undefined);
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!metadata.canonical) canonical?.remove();
  else {
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = metadata.canonical;
  }
  let data = document.getElementById("page-structured-data");
  if (!data) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "page-structured-data";
    document.head.append(script);
    data = script;
  }
  data.textContent = serializeStructuredData(metadata.structuredData);
}
