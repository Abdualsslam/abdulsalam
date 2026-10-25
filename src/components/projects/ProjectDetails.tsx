import { useEffect, useRef } from "react";
import { motion, useIsPresent } from "framer-motion";
import { ArrowRight, ArrowUpLeft } from "lucide-react";
import type { PortfolioProject } from "../../data/projects";
import { getProjectCaseStudy } from "../../data/caseStudies";
import ProjectArtwork from "./ProjectArtwork";
import ProjectExperience from "./ProjectExperience";
import "./ProjectDetails.css";

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
      <div className={`project-detail-inner project-${project.index}`}>
        <nav className="project-detail-nav" aria-label="التنقل في تفاصيل المشروع">
          <button onClick={onBack}><ArrowRight size={18} aria-hidden="true" />العودة إلى أعمالي</button>
          <span dir="ltr">PROJECT 0{project.index + 1} / {project.id.toUpperCase()}</span>
        </nav>

        <header className={`project-detail-hero ${study ? "project-detail-hero-video" : ""}`}>
          <div className="project-detail-copy">
            <span className="eyebrow">{project.category} / دراسة مشروع</span>
            <h1 id="project-detail-title" className={study ? `project-detail-brand-title ${study.logo.square ? "project-detail-brand-square" : ""}` : undefined} tabIndex={-1} ref={heading}>{study ? <><img src={`/projects/${project.id}/logo.png`} alt={study.logo.showName ? "" : study.name} width={study.logo.width} height={study.logo.height} />{study.logo.showName && <span className="project-detail-brand-name">{study.name}</span>}</> : project.title}</h1>
            <p className={`project-detail-lead ${study ? "" : "project-detail-lead-generic"}`}>{study ? study.lead : projectIntro}</p>
            {study && <p className="project-detail-summary">{study.summary}</p>}
            <div className="project-detail-tags" dir="ltr">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
          {!study && <ProjectArtwork project={project} />}
        </header>

        {study ? (
          <>
            {study.mediaReady && <ProjectExperience active={isPresent} projectId={project.id} projectName={study.name} clips={study.experiences} />}
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
              <div className="project-architecture" aria-label="طبقات التطبيق: العرض وإدارة الحالة، منطق العمل، البيانات والخدمات">
                <div><b dir="ltr">Presentation</b><span>{study.presentationLayer ?? "واجهات + Bloc / Cubit"}</span></div><span aria-hidden="true">←</span>
                <div><b dir="ltr">Domain</b><span>حالات الاستخدام ومنطق العمل</span></div><span aria-hidden="true">←</span>
                <div><b dir="ltr">Data</b><span>{study.dataLayer}</span></div>
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

        <footer className="project-detail-footer"><span>عبدالسلام معاد / {project.title}</span><button onClick={onBack}>العودة إلى المشاريع <ArrowRight size={18} aria-hidden="true" /></button></footer>
      </div>

    </motion.main>
  );
}
