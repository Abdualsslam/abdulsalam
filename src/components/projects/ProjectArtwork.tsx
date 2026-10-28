import { Smartphone, ShoppingBag, Headphones, Home, Heart, User, MessageSquare, Workflow, Database } from "lucide-react";
import type { PortfolioProject } from "../../data/projects";
import { getProjectCaseStudy } from "../../data/caseStudies";
import { getPackageCover } from "../../data/packageCovers";
import { publicAsset } from "../../lib/publicAsset";
import "./ProjectWebsitePreview.css";
import "./ProjectAppSuite.css";

export default function ProjectArtwork({ project }: { project: PortfolioProject }) {
  const study = getProjectCaseStudy(project.id);
  const hasCapturedMedia = study?.mediaReady;
  const packageCover = getPackageCover(project.id);
  return (
    <div className="project-art" aria-hidden="true">
      <span className="art-index">
        {String(project.index + 1).padStart(2, "0")} / {project.category}
      </span>
      {study?.appSuite ? (
        <div className="project-suite-preview">
          {study.appSuite.apps.map(app => <img key={app.id} src={publicAsset(`projects/${project.id}/${app.screenshots[0].file}`)} alt="" width={app.screenshots[0].width} height={app.screenshots[0].height} loading="lazy" />)}
        </div>
      ) : study?.website ? (
        <div className="project-website-preview">
          <img src={publicAsset(`projects/${project.id}/${study.website.screenshots[0].file}`)} alt="" width={study.website.screenshots[0].width} height={study.website.screenshots[0].height} loading="lazy" />
        </div>
      ) : study?.screenshots?.length ? (
        <div className="project-real-preview">
          {study.screenshots.slice(0, 2).map(shot => <img key={shot.file} src={publicAsset(`projects/${project.id}/${shot.file}`)} alt="" width={shot.width} height={shot.height} loading="lazy" decoding="async" />)}
        </div>
      ) : hasCapturedMedia ? (
        <div className="project-real-preview">
          <img src={publicAsset(project.id === "tagadod" ? "projects/tagadod/home.webp" : `projects/${project.id}/${study.experiences[0].file}-poster.webp`)} alt="" width="1280" height="2856" loading="lazy" />
          <img src={publicAsset(project.id === "tagadod" ? "projects/tagadod/catalog.webp" : `projects/${project.id}/${study.experiences[1]?.file ?? study.experiences[0].file}-poster.webp`)} alt="" width="1280" height="2856" loading="lazy" />
        </div>
      ) : study ? (
        <div className="project-logo-preview">
          <img src={publicAsset(`projects/${project.id}/${study.logo.file ?? "logo.png"}`)} alt="" width={study.logo.width} height={study.logo.height} loading="lazy" />
          <b>{study.name}</b>
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
      ) : packageCover ? (
        <div className={`package-source-preview package-source-${packageCover.layout}`}>
          {packageCover.images.map((image) => (
            <img key={image.file} src={publicAsset(`projects/${project.id}/${image.file}`)} alt="" width={image.width} height={image.height} loading="lazy" />
          ))}
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
      <span className="concept-label">{study?.appSuite ? "واجهات التطبيقات الثلاثة" : study?.website ? "من الموقع الفعلي" : study?.screenshots?.length || hasCapturedMedia ? "من التطبيق الفعلي" : packageCover ? "من أمثلة الحزمة الفعلية" : study ? "شعار التطبيق" : "تصوّر بصري للمشروع"}</span>
    </div>

  );
}
