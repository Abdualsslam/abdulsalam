import {
  ArrowUpLeft,
  ArrowDown,
  Download,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import PortraitMotion from "../common/PortraitMotion";
import { projectsData } from "../../data/projects";

export default function Hero({
  effectsEnabled = true,
  concealed = false,
}: {
  effectsEnabled?: boolean;
  concealed?: boolean;
}) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid page-width">
        <div className="hero-copy">
          <span className="availability">
            <span /> من الفكرة، إلى تجربة تستحق الاستخدام
          </span>
          <p className="hero-intro">
            أهلاً بك، أنا عبدالسلام معاد <span className="hello-star">✳</span>
          </p>
          <h1>
            أبني لأفكارك
            <br />
            <span>تجارب رقمية</span>
            <br />
            تترك أثراً<span className="title-dot">.</span>
          </h1>
          <p className="hero-description">
            مطور Flutter، محلل نظم، ومهندس أتمتة.
            <br />
            أجمع بين التفكير الهندسي وحسّ التفاصيل لبناء تطبيقات سلسة، وحلول
            تجعل العمل أبسط.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              اكتشف أعمالي <ArrowUpLeft size={20} />
            </a>
            <a className="cv-link" href={`${import.meta.env.BASE_URL}cv.pdf`} download>
              <Download size={18} /> السيرة الذاتية
            </a>
          </div>
          <div className="hero-social">
            <span>لنتواصل</span>
            <a
              href="https://github.com/Abdualsslam"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={19} />
            </a>
            <a
              href="https://www.linkedin.com/in/abdulsalam-muaad/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={19} />
            </a>
            <span className="social-divider" />
            <span>
              <MapPin size={14} /> صنعاء، اليمن
            </span>
          </div>
        </div>
        <figure className="portrait-scene" data-concealed={concealed} aria-label="عبدالسلام معاد — خلف كل تجربة، إنسان">
          <PortraitMotion enabled={effectsEnabled} concealed={concealed} />
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
            [String(projectsData.length), "مشاريع رئيسية"],
            ["2", "حزمة على pub.dev"],
            ["~80", "شاشة في أكبر تطبيق"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong dir="ltr">{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <a className="scroll-cue" href="#about">
          <span>هناك المزيد لتكتشفه</span>
          <ArrowDown size={19} />
        </a>
      </div>
    </section>
  );
}
