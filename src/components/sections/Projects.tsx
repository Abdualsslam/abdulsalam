import { useState } from "react";
import { ArrowUpLeft } from "lucide-react";
import { projectsData } from "../../data/projects";
import ProjectArtwork from "../projects/ProjectArtwork";
import { getProjectCaseStudy } from "../../data/caseStudies";
import { publicAsset } from "../../lib/publicAsset";
import { projectHref } from "../../lib/routes";
import "../projects/ProjectDetails.css";
export default function Projects() {
  const [filter, setFilter] = useState("الكل");
  const visibleProjects = projectsData.filter((project) => filter === "الكل" || project.category === filter);
  return (
    <section id="projects" className="projects-section section-space">
      <div className="page-width">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / أعمال مختارة</span>
            <h2>
              أفكار خرجت <span>إلى النور.</span>
            </h2>
          </div>
          <p>
            كل مشروع تحدٍ جديد،
            <br />
            وفرصة لصناعة تجربة أفضل.
          </p>
        </div>
        <div
          className="project-filters"
          role="group"
          aria-label="تصفية المشاريع"
        >
          {["الكل", ...new Set(projectsData.map((project) => project.category))].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={filter === category ? "selected" : ""}
            >
              {category}
              {category === "الكل" && <span>{String(projectsData.length).padStart(2, "0")}</span>}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          عرض {visibleProjects.length} مشاريع
        </p>
        <div className="project-grid">
          {visibleProjects.map((project) => {
            const study = getProjectCaseStudy(project.id);
            return (
            <article
              className={`project-card project-${project.index}${study?.showcase ? " project-card-with-showcase" : ""}`}
              data-project={project.id}
              key={project.title}
            >
              <a className="project-card-open" id={`project-${project.id}`} href={projectHref(project.id)} aria-label={`عرض تفاصيل ${project.title}`}>
              <ProjectArtwork project={project} />
              <div className="project-content">
                <div className="project-card-meta">
                  <span className="project-category">{project.category}</span>
                  {study && <img className={`project-card-logo ${study.logo.square ? "project-card-logo-square" : ""}`} src={publicAsset(`projects/${project.id}/${study.logo.file ?? "logo.png"}`)} alt={`شعار ${study.name}`} width={study.logo.width} height={study.logo.height} loading="lazy" />}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags" dir="ltr">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <span className="project-link">تفاصيل المشروع <ArrowUpLeft size={19} aria-hidden="true" /></span>
              </div>
              </a>
              {study?.showcase && <a className="project-card-showcase" href={publicAsset(`${study.showcase.path}index.html`)}>معاينة الواجهات في صفحة مستقلة <ArrowUpLeft size={18} aria-hidden="true" /></a>}
            </article>
          );})}
        </div>
      </div>
    </section>
  );
}
