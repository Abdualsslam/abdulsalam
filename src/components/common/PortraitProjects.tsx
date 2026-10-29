import { ShoppingBag } from "lucide-react";
import { projectsData } from "../../data/projects";
import { projectHref } from "../../lib/routes";
import { publicAsset } from "../../lib/publicAsset";

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
const stripOrder = new Map([
  "tagadod", "talentgate", "wamadat", "nirab", "shoot-live",
  "tras-phone", "qit3ati", "smart-store", "kuraimi",
].map((id, index) => [id, index] as const));
const applicationProjects = projectsData
  .filter((project) => project.category === "تطبيقات")
  .sort((a, b) => (stripOrder.get(a.id) ?? stripOrder.size) - (stripOrder.get(b.id) ?? stripOrder.size));

/** A quiet vertical tear beside the portrait reveals the applications beneath. */
export default function PortraitProjects({ animated = true }: { animated?: boolean }) {
  return (
    <nav className={`portrait-projects${animated ? " portrait-projects--reveal" : ""}`} aria-label="تطبيقاتي">
      <span className="paper-slit-material" aria-hidden="true">
        <img src={publicAsset("paper-textures/torn-opening-photographic-v1.webp")}
          width={2172} height={724} alt="" decoding="async" />
      </span>
      {applicationProjects.map((project) => {
        const { id } = project;
        return (
          <a key={id} className="portrait-project" data-project={id}
            href={projectHref(id)} aria-label={`عرض مشروع ${project.title}`} title={project.title}>
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
