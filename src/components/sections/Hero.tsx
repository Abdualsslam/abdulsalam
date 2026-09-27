import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { usePointerParallax } from "../../hooks/usePointerParallax";
import {
  ArrowUpLeft,
  ArrowDown,
  Download,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import PortraitMotion from "../common/PortraitMotion";

export default function Hero({
  effectsEnabled = true,
}: {
  effectsEnabled?: boolean;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const { x, y } = usePointerParallax(heroRef, effectsEnabled);
  const lightX = useTransform(x, (value) => value * -65);
  const lightY = useTransform(y, (value) => value * -35);
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid page-width">
        <div className="hero-copy">
          <span className="availability">
            <span /> أفكار جديدة، وإمكانيات بلا حدود
          </span>
          <p className="hero-intro">
            أهلاً بك، أنا عبدالسلام معاد <span className="hello-star">✳</span>
          </p>
          <h1>
            أحوّل أفكارك إلى
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
            <a className="cv-link" href="/cv.pdf" download>
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
        <figure
          ref={heroRef}
          className="portrait-scene"
          aria-label="صورة عبدالسلام التفاعلية"
        >
          <motion.div
            className="scene-backlight"
            style={{ x: lightX, y: lightY }}
            aria-hidden="true"
          />
          <span className="scene-caption-top" dir="ltr">
            A LITTLE MORE HUMAN.
          </span>
          <div className="portrait-stage has-real-motion has-gaze-motion">
            <PortraitMotion
              enabled={effectsEnabled}
              sceneRef={heroRef}
            />

          </div>
          <figcaption className="scene-caption">
            <span /> نحو تجارب أقرب للإنسان.
          </figcaption>
          <span className="portrait-interaction-hint">
            حرّك المؤشر لتوجيه الرأس والعينين.
          </span>
        </figure>
      </div>
      <div className="hero-bottom page-width">
        <div className="hero-stats">
          {[
            ["+5", "سنوات من الخبرة"],
            ["6", "مشاريع رئيسية"],
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
