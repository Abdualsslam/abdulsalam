import { sectionHref } from "../../lib/routes";
import {
  ArrowUpLeft,
  ArrowDown,
  Download,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import PortraitMotion from "../common/PortraitMotion";
import PortraitProjects from "../common/PortraitProjects";
import PaperTape from "../common/PaperTape";
import { projectsData } from "../../data/projects";
import { profile } from "../../data/profile";

export default function Hero({
  effectsEnabled = true,
}: {
  effectsEnabled?: boolean;
}) {
  return (
    <section id="home" className="hero-section hero-section--identity hero-section--scraps"
      aria-labelledby="hero-name">
      <div className="hero-grid page-width">
        <div className="hero-copy">
          <div className="hero-scrap hero-scrap--name">
            <PaperTape className="hero-name-tape" />
            <h1 id="hero-name" className="hero-name">
              {profile.name}<span className="title-dot" aria-hidden="true">.</span>
            </h1>
          </div>
          <div className="hero-scrap hero-scrap--role">
            <p className="hero-role">مطوّر Flutter ومواقع ويب، ومحلّل نظم</p>
          </div>
          <div className="hero-scrap hero-scrap--description">
            <PaperTape className="hero-description-tape" />
            <p className="hero-description">
              أبني تطبيقات متعددة المنصات بـ Flutter وDart، ومواقع ويب،
              وأنظمة أتمتة بـ Python وn8n تختصر العمل المتكرر.
            </p>
          </div>
          <div className="hero-actions">
            <a className="btn btn-primary" href={sectionHref("projects")}>
              شاهد أعمالي <ArrowUpLeft size={20} aria-hidden="true" />
            </a>
            <a className="cv-link" href={`${import.meta.env.BASE_URL}cv.pdf`} download>
              <Download size={18} aria-hidden="true" /> تحميل السيرة الذاتية
            </a>
          </div>
          <div className="hero-social">
            <span className="hero-social-label">تجدني أيضًا على</span>
            <a
              href={profile.sameAs.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={19} aria-hidden="true" />
            </a>
            <a
              href={profile.sameAs.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={19} aria-hidden="true" />
            </a>
            <span className="hero-location">
              <MapPin size={14} aria-hidden="true" /> {profile.address.locality}، {profile.address.countryName}
            </span>
          </div>
        </div>
        <figure className="portrait-scene" aria-label="عبدالسلام معاد — خلف كل تجربة، إنسان">
          <PortraitMotion enabled={effectsEnabled} />
          <PortraitProjects />
          <figcaption className="portrait-figure-caption">
            <span dir="ltr">CRAFTED WITH INTENT</span>
            <span>خلف كل تجربة، إنسان.</span>
          </figcaption>
        </figure>
      </div>
      <div className="hero-bottom page-width">
        <div className="hero-stats">
          {[
            ["+5", "سنوات من الخبرة"],
            [String(projectsData.length), "مشاريع في المعرض"],
            ["2", "حزمة على pub.dev"],
          ].map(([value, label]) => (
            <div key={label} className="hero-scrap hero-scrap--stat">
              <strong dir="ltr">{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <a className="scroll-cue" href={sectionHref("about")}>
          <span>هناك المزيد لتكتشفه</span>
          <ArrowDown size={19} />
        </a>
      </div>
    </section>
  );
}
