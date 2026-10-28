import { useState } from "react";
import { ArrowUpLeft } from "lucide-react";
import type { ProjectSuiteApp } from "../../data/caseStudyTypes";
import { publicAsset } from "../../lib/publicAsset";
import "./ProjectAppSuite.css";

export default function ProjectAppSuite({ projectId, apps }: { projectId: string; apps: readonly ProjectSuiteApp[] }) {
  const [selected, setSelected] = useState(0);
  const app = apps[selected];
  return (
    <section className="app-suite" aria-labelledby={`${projectId}-apps-title`}>
      <h2 id={`${projectId}-apps-title`}>كل دور، في تطبيق خاص به.</h2>
      <div className="app-suite-options" role="group" aria-label="تطبيقات المنظومة">
        {apps.map((item, index) => (
          <button key={item.id} type="button" aria-label={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)}>
            <b>{item.name}</b><span>{item.role}</span>
          </button>
        ))}
      </div>
      <div className="app-suite-intro" aria-live="polite">
        <div><h3>{app.role}</h3><p>{app.summary}</p></div>
        <ul>{app.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      </div>
      <p className="app-suite-note">صور من ملفات المشروع؛ تشمل معاينات ببيانات تجريبية. اضغط على أي صورة لتكبيرها.</p>
      <div key={app.id} className="app-suite-screens" tabIndex={0} role="region" aria-label={`صور ${app.name}`}>
        {app.screenshots.map(shot => {
          const source = publicAsset(`projects/${projectId}/${shot.file}`);
          return (
            <figure key={shot.file}>
              <a href={source} target="_blank" rel="noopener noreferrer" aria-label={`تكبير ${shot.title} — ${app.name}`}>
                <img src={source} alt={`${app.name} — ${shot.title}`} width={shot.width} height={shot.height} loading="lazy" />
              </a>
              <figcaption><h4>{shot.title}<ArrowUpLeft size={15} aria-hidden="true" /></h4><p>{shot.description}</p></figcaption>
            </figure>
          );
        })}
      </div>
      <p className="app-suite-swipe">اسحب أفقيًا لاستعراض بقية الصور.</p>
    </section>
  );
}
