import { ShoppingBag } from "lucide-react";
import type { CSSProperties } from "react";
import { projectsData } from "../../data/projects";
import { projectHref } from "../../lib/routes";
import { publicAsset } from "../../lib/publicAsset";
import PaperTape from "./PaperTape";

const projectLabels: Record<string, string> = {
  talentgate: "TalentGate",
  qit3ati: "قطعتي",
  "shoot-live": "شوت لايف",
  "tras-phone": "TRAS Phone",
  tagadod: "تجدُّد",
  wamadat: "ومضات",
  nirab: "نيراب كلين",
  "smart-store": "Smart Store",
  kuraimi: "الكريمي",
};
const iconProjects = new Set(["talentgate", "qit3ati", "shoot-live", "tras-phone", "tagadod", "wamadat", "nirab", "kuraimi"]);
const applicationProjects = projectsData.filter((project) => project.category === "تطبيقات");

/** Application marks, taped outside the portrait as small paper labels. */
export default function PortraitProjects() {
  return (
    <nav className="portrait-projects" aria-label="تطبيقاتي حول الصورة" style={{
      "--project-rows": Math.ceil(applicationProjects.length / 2),
      "--project-mobile-columns": applicationProjects.length > 8 ? 3 : 4,
    } as CSSProperties}>
      {applicationProjects.map((project) => {
        const { id } = project;
        return (
          <a key={id} className="portrait-project" data-project={id}
            href={projectHref(id)} aria-label={`عرض مشروع ${project.title}`} title={project.title}>
            <PaperTape className="portrait-project-tape portrait-project-tape--left" />
            <PaperTape className="portrait-project-tape portrait-project-tape--right" />
            <span className="portrait-project-mark">
              {iconProjects.has(id) ? (
                <img src={publicAsset(`projects/${id}/portrait-icon.webp`)}
                  width={44} height={44} alt="" decoding="async" />
              ) : <ShoppingBag size={28} strokeWidth={1.6} aria-hidden="true" />}
            </span>
            <span className="portrait-project-name" dir="auto">{projectLabels[id] ?? project.title}</span>
          </a>
        );
      })}
    </nav>
  );
}
