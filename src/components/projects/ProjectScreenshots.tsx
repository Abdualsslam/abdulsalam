import { ArrowUpLeft } from "lucide-react";
import type { ProjectWebsiteScreenshot } from "../../data/caseStudyTypes";
import { publicAsset } from "../../lib/publicAsset";
import "./ProjectScreenshots.css";

export default function ProjectScreenshots({ projectId, name, screenshots }: {
  projectId: string;
  name: string;
  screenshots: readonly ProjectWebsiteScreenshot[];
}) {
  if (!screenshots.length) return null;

  return (
    <section className="project-screenshots" aria-labelledby={`${projectId}-screenshots-title`}>
      <div className="project-screenshots-heading">
        <h2 id={`${projectId}-screenshots-title`}>من داخل التطبيق.</h2>
        <p>لقطات فعلية من النموذج ببيانات تجريبية. افتح أي صورة لمشاهدة تفاصيلها.</p>
      </div>
      <div className="project-screenshots-grid" tabIndex={0} role="region" aria-label={`صور ${name}`}>
        {screenshots.map(shot => (
          <figure key={shot.file}>
            <a className="project-screenshot-open" href={publicAsset(`projects/${projectId}/${shot.file}`)} target="_blank" rel="noopener noreferrer" aria-label={`تكبير ${shot.title} من ${name} — يفتح في تبويب جديد`}>
              <img src={publicAsset(`projects/${projectId}/${shot.file}`)} alt={`${name} — ${shot.title}`} width={shot.width} height={shot.height} loading="lazy" decoding="async" />
              <span>تكبير الصورة <ArrowUpLeft size={16} aria-hidden="true" /></span>
            </a>
            <figcaption>
              <h3>{shot.title}</h3>
              <p>{shot.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="project-screenshots-swipe">اسحب أفقيًا لاستعراض بقية الواجهات.</p>
    </section>
  );
}
