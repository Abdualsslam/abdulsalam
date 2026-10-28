import { Fragment, useEffect, useRef } from "react";
import { motion, useIsPresent } from "framer-motion";
import { ArrowRight, ArrowUpLeft } from "lucide-react";
import type { PortfolioProject } from "../../data/projects";
import { getProjectCaseStudy } from "../../data/caseStudies";
import ProjectArtwork from "./ProjectArtwork";
import ProjectExperience from "./ProjectExperience";
import ProjectWebsitePreview from "./ProjectWebsitePreview";
import ProjectAppSuite from "./ProjectAppSuite";
import ProjectScreenshots from "./ProjectScreenshots";
import "./ProjectDetails.css";
import { publicAsset } from "../../lib/publicAsset";
import { sectionHref } from "../../lib/routes";

interface Props {
  project: PortfolioProject;
  onBack: () => void;
  effectsEnabled: boolean;
}

export default function ProjectDetails({ project, onBack, effectsEnabled }: Props) {
  const heading = useRef<HTMLHeadingElement>(null);
  const isPresent = useIsPresent();
  const study = getProjectCaseStudy(project.id);
  const projectIntro = `${project.description.split(". ")[0].replace(/\.$/, "")}.`;

  useEffect(() => {
    if (!isPresent) return;
    heading.current?.focus({ preventScroll: true });
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented && !document.fullscreenElement) onBack();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [project.id, onBack, isPresent]);

  return (
    <motion.main
      className="project-detail-page"
      id="project-detail-page"
      aria-labelledby="project-detail-title"
      aria-hidden={!isPresent}
      inert={!isPresent}
      initial={effectsEnabled ? { opacity: 0, y: 22 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: effectsEnabled ? .32 : 0, ease: [.22, 1, .36, 1] }}
    >
      <div className={`project-detail-inner project-${project.index}`} data-project={project.id}>
        <nav className="project-detail-nav" aria-label="التنقل في تفاصيل المشروع">
          <a href={sectionHref("projects")} onClick={event => { if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); event.stopPropagation(); onBack(); } }}><ArrowRight size={18} aria-hidden="true" />العودة إلى أعمالي</a>
          <span dir="ltr">PROJECT {String(project.index + 1).padStart(2, "0")} / {project.id.toUpperCase()}</span>
        </nav>

        <header className={`project-detail-hero ${study ? "project-detail-hero-video" : ""}`}>
          <div className="project-detail-copy">
            <span className="eyebrow">{project.category} / دراسة مشروع</span>
            <h1 id="project-detail-title" className={study ? `project-detail-brand-title ${study.logo.square ? "project-detail-brand-square" : ""}` : undefined} tabIndex={-1} ref={heading}>{study ? <><img src={publicAsset(`projects/${project.id}/${study.logo.file ?? "logo.png"}`)} alt="" width={study.logo.width} height={study.logo.height} /><span className={study.logo.showName ? "project-detail-brand-name" : "sr-only"}>{project.title}</span></> : project.title}</h1>
            <p className={`project-detail-lead ${study ? "" : "project-detail-lead-generic"}`}>{study ? study.lead : projectIntro}</p>
            {study && <p className="project-detail-summary">{study.summary}</p>}
            <div className="project-detail-tags" dir="ltr">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            {study?.website && <div className="project-website-links">
              {project.demo !== "#" && <a className="project-website-source" href={project.demo} target="_blank" rel="noopener noreferrer">زيارة الموقع <ArrowUpLeft size={16} aria-hidden="true" /></a>}
              <a className="project-website-source" href={project.github} target="_blank" rel="noopener noreferrer">مصدر المشروع <ArrowUpLeft size={16} aria-hidden="true" /></a>
            </div>}
            {study?.showcase && <div className="project-website-links"><a className="project-showcase-link" href={publicAsset(`${study.showcase.path}index.html`)}>معاينة الواجهات في صفحة مستقلة <ArrowUpLeft size={18} aria-hidden="true" /></a></div>}
          </div>
          {!study && <ProjectArtwork project={project} />}
        </header>

        {study ? (
          <>
            {study.appSuite ? <ProjectAppSuite projectId={project.id} apps={study.appSuite.apps} /> : study.website ? <ProjectWebsitePreview projectId={project.id} name={study.name} screenshots={study.website.screenshots} /> : study.screenshots?.length ? <ProjectScreenshots projectId={project.id} name={study.name} screenshots={study.screenshots} /> : study.mediaReady && <ProjectExperience active={isPresent} projectId={project.id} projectName={study.name} clips={study.experiences} />}
            <dl className="project-facts">
              {study.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
            </dl>

            <section className="project-story-section" aria-labelledby={`${project.id}-overview-title`}>
              <div className="project-story-heading"><span className="eyebrow">02 / الفكرة</span><h2 id={`${project.id}-overview-title`}>{study.featuresHeading}</h2></div>
              <div className="project-feature-grid">{study.features.map((feature, index) => (
                <article key={feature.title}><span className="project-note-index" aria-hidden="true">0{index + 1}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>
              ))}</div>
            </section>

            <section className="project-story-section" aria-labelledby={`${project.id}-engineering-title`}>
              <div className="project-story-heading"><span className="eyebrow">03 / خلف الواجهات</span><h2 id={`${project.id}-engineering-title`}>بنية تخدم التجربة.</h2></div>
              <div className="project-engineering-grid">{study.engineering.map((item, index) => <article key={item.title}><span className="project-note-index" aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
              <div className="project-architecture" aria-label="تنظيم المشروع">
                {(study.architectureLayers ?? [
                  { name: "Presentation", description: study.presentationLayer ?? "واجهات + Bloc / Cubit" },
                  { name: "Domain", description: "حالات الاستخدام ومنطق العمل" },
                  { name: "Data", description: study.dataLayer },
                ]).map((layer, index) => <Fragment key={layer.name}>
                  {index > 0 && <span aria-hidden="true">←</span>}
                  <div><b dir="ltr">{layer.name}</b><span>{layer.description}</span></div>
                </Fragment>)}
              </div>
            </section>
          </>
        ) : (
          <section className="project-story-section project-generic-story" aria-labelledby="project-overview-title">
            <div className="project-story-heading"><span className="eyebrow">01 / عن المشروع</span><h2 id="project-overview-title">من الفكرة إلى التنفيذ.</h2></div>
            <p>{project.description}</p>
            <a className="text-link" href={project.demo !== "#" ? project.demo : project.github} target="_blank" rel="noopener noreferrer">{project.demo !== "#" ? "استكشف الحزمة على pub.dev" : "استكشف حسابي على GitHub"}<ArrowUpLeft size={18} aria-hidden="true" /></a>
          </section>
        )}

        <footer className="project-detail-footer"><span>عبدالسلام معاد / {project.title}</span><a href={sectionHref("projects")}>العودة إلى المشاريع <ArrowRight size={18} aria-hidden="true" /></a></footer>
      </div>

    </motion.main>
  );
}
