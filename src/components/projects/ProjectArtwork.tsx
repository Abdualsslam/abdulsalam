import { Smartphone, ShoppingBag, Headphones, Home, Heart, User, MessageSquare, Workflow, Database } from "lucide-react";
import type { PortfolioProject } from "../../data/projects";
import { getProjectCaseStudy } from "../../data/caseStudies";

export default function ProjectArtwork({ project }: { project: PortfolioProject }) {
  const hasCapturedMedia = getProjectCaseStudy(project.id)?.mediaReady;
  return (
    <div className="project-art" aria-hidden="true">
      <span className="art-index">
        0{project.index + 1} / {project.category}
      </span>
      {hasCapturedMedia ? (
        <div className="project-real-preview">
          <img src={project.id === "tagadod" ? "/projects/tagadod/home.webp" : "/projects/tras-phone/browse-poster.webp"} alt="" width="1280" height="2856" loading="lazy" />
          <img src={project.id === "tagadod" ? "/projects/tagadod/catalog.webp" : "/projects/tras-phone/product-tour-poster.webp"} alt="" width="1280" height="2856" loading="lazy" />
        </div>
      ) : project.index < 3 ? (
        <div className="phone-mock">
          <div className="phone-speaker" />
          <div className="phone-header">
            <span>
              {["تجدُّد", "TRAS", "Smart Store"][project.index]}
            </span>
            <ShoppingBag size={15} />
          </div>
          <div className="phone-banner">
            {
              [
                "كل ما تحتاجه،\nفي مكان واحد.",
                "قطع أصلية.\nإمكانيات أكبر.",
                "تقنيتك القادمة\nتبدأ هنا.",
              ][project.index]
            }
            <Smartphone size={42} />
          </div>
          <div className="phone-categories">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="phone-products">
            <div>
              <Smartphone size={30} />
              <span />
            </div>
            <div>
              <Headphones size={30} />
              <span />
            </div>
          </div>
          <div className="phone-nav">
            <Home size={14} />
            <Heart size={14} />
            <ShoppingBag size={14} />
            <User size={14} />
          </div>
        </div>
      ) : project.index < 5 ? (
        <div className="package-art">
          <span>{project.index === 3 ? "{ }" : "< / >"}</span>
          <b>
            {project.index === 3 ? "elastic_sheet" : "frost_nav_bar"}
          </b>
          <small>CRAFTED FOR FLUTTER</small>
          <div className="package-sheet">
            {project.index === 3 ? (
              <>
                <i />
                <i />
                <i />
              </>
            ) : (
              <>
                <Home />
                <Heart />
                <User />
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="workflow-art">
          <div>
            <MessageSquare />
            <small>رسالة جديدة</small>
          </div>
          <span>···</span>
          <div>
            <Workflow />
            <small>n8n</small>
          </div>
          <span>···</span>
          <div>
            <Database />
            <small>بيانات منظمة</small>
          </div>
        </div>
      )}
      <span className="concept-label">{hasCapturedMedia ? "من التطبيق الفعلي" : "تصوّر بصري للمشروع"}</span>
    </div>

  );
}
