import { useState } from "react";
import { ArrowUpLeft, Monitor, Smartphone } from "lucide-react";
import type { ProjectWebsiteScreenshot } from "../../data/caseStudyTypes";
import { publicAsset } from "../../lib/publicAsset";
import "./ProjectWebsitePreview.css";

export default function ProjectWebsitePreview({ projectId, name, screenshots }: {
  projectId: string;
  name: string;
  screenshots: readonly ProjectWebsiteScreenshot[];
}) {
  const [selected, setSelected] = useState(0);
  const screenshot = screenshots[selected];
  const source = publicAsset(`projects/${projectId}/${screenshot.file}`);
  return (
    <section className="website-preview" aria-labelledby={`${projectId}-preview-title`}>
      <div className="website-preview-heading">
        <h2 id={`${projectId}-preview-title`}>من الصفحة الفعلية.</h2>
        <span>الكمبيوتر والجوال</span>
      </div>
      <div className="website-preview-options" role="group" aria-label={`اختر واجهة من ${name}`}>
        {screenshots.map((item, index) => (
          <button key={item.file} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index}>
            {item.mobile ? <Smartphone size={17} aria-hidden="true" /> : <Monitor size={17} aria-hidden="true" />}
            {item.title}
          </button>
        ))}
      </div>
      <figure className={`website-capture ${screenshot.mobile ? "website-capture-mobile" : ""}`}>
        <a href={source} target="_blank" rel="noopener noreferrer" aria-label={`فتح لقطة ${screenshot.title} من ${name} بالحجم الكامل`}>
          <img key={screenshot.file} src={source} alt={`${name} — ${screenshot.title}`} width={screenshot.width} height={screenshot.height} />
        </a>
        <figcaption aria-live="polite">
          <p>{screenshot.description}</p>
          <a href={source} target="_blank" rel="noopener noreferrer">عرض الصورة كاملة <ArrowUpLeft size={16} aria-hidden="true" /></a>
        </figcaption>
      </figure>
    </section>
  );
}
