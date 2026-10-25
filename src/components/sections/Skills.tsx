import { ArrowUpLeft, Braces, Layers3, Workflow } from "lucide-react";
import "./Skills.css";

const mobileSkills = [
  { label: "بنية التطبيق", tools: "Clean Architecture" },
  { label: "إدارة الحالة", tools: "Bloc / Cubit · GetX" },
  { label: "تجربة بلغتين", tools: "AR/EN Localization" },
];
const automationSkills = ["Python Scripting", "n8n Workflows", "Systems Analysis", "User Flows & Data Entities"];
const integrationSkills = [
  { label: "ربط الخدمات", tools: "Dio & REST APIs · Socket.IO" },
  { label: "الأمان", tools: "JWT Auth & Refresh Tokens" },
  { label: "البيانات", tools: "Hive & Firestore" },
  { label: "الإشعارات والموقع", tools: "FCM · Google Maps · Geolocator" },
  { label: "إدارة الإصدارات", tools: "Git / GitHub" },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-title">
      <div className="skills-page mx-auto">
        <header className="skills-intro">
          <div>
            <span className="eyebrow">03 / المهارات والأدوات</span>
            <h2 id="skills-title">تفكير منظّم.<br /><span>تنفيذ متقن.</span></h2>
          </div>
          <p>من فهم النظام إلى بناء التطبيق وربط خدماته؛ هذه الأدوات التي أحوّل بها الأفكار إلى تجربة تعمل.</p>
        </header>

        <div className="skills-editorial-grid">
          <article className="skill-mobile" aria-labelledby="skill-mobile-title">
            <div className="skill-panel-top">
              <span className="skill-index" dir="ltr">01 / MOBILE</span>
              <span className="skill-specialty">تخصصي الأساسي</span>
            </div>
            <div className="skill-mobile-hero">
              <div>
                <p className="skill-tech-name" dir="ltr">Flutter<span>& Dart</span></p>
                <h3 id="skill-mobile-title">تطبيق واحد.<br />تجربة متكاملة.</h3>
              </div>
              <svg className="skill-phone-drawing" viewBox="0 0 112 144" fill="none" aria-hidden="true">
                <path className="skill-draft-line" d="M2 15h108M2 131h108M15 2v140M97 2v140" />
                <rect x="22" y="9" width="68" height="126" rx="12" stroke="currentColor" strokeWidth="1.5" />
                <path d="M46 17h20M48 126h16" stroke="currentColor" strokeWidth="2" />
                <path d="m32 52 24-13 24 13-24 13-24-13Zm0 16 24 13 24-13m-48 16 24 13 24-13" stroke="var(--paper-accent)" strokeWidth="2" />
                <path className="skill-draft-line" d="M7 9h9M11 5v8M97 135h9M102 131v8" />
              </svg>
            </div>
            <p className="skill-description">تطوير تطبيقات متعددة المنصات، ببنية واضحة وواجهات تراعي تفاصيل الاستخدام.</p>
            <dl className="skill-detail-list skill-mobile-details">
              {mobileSkills.map((skill) => (
                <div key={skill.label}><dt>{skill.label}</dt><dd dir="ltr">{skill.tools}</dd></div>
              ))}
            </dl>
            <div className="skill-mobile-note"><Layers3 size={16} aria-hidden="true" /><span>واجهة مدروسة، منطق منظّم، وبيانات مترابطة.</span></div>
          </article>

          <article className="skill-panel skill-automation" aria-labelledby="skill-automation-title">
            <div className="skill-panel-top"><span className="skill-index" dir="ltr">02 / AUTOMATION</span><Workflow size={22} strokeWidth={1.5} aria-hidden="true" /></div>
            <h3 id="skill-automation-title">الأتمتة وتحليل النظم</h3>
            <p className="skill-description">أحلّل تدفقات العمل وأربط خطواتها لأختصر المهام المتكررة.</p>
            <ul className="skill-tool-tags" aria-label="أدوات الأتمتة وتحليل النظم">
              {automationSkills.map((skill) => <li key={skill} dir="ltr">{skill}</li>)}
            </ul>
          </article>

          <article className="skill-panel skill-integrations" aria-labelledby="skill-integrations-title">
            <div className="skill-panel-top"><span className="skill-index" dir="ltr">03 / INTEGRATIONS</span><Braces size={22} strokeWidth={1.5} aria-hidden="true" /></div>
            <h3 id="skill-integrations-title">التكاملات والأدوات</h3>
            <dl className="skill-detail-list">
              {integrationSkills.map((skill) => (
                <div key={skill.label}><dt>{skill.label}</dt><dd dir="ltr">{skill.tools}</dd></div>
              ))}
            </dl>
          </article>
        </div>

        <div className="skills-closing">
          <p><span aria-hidden="true">✳</span> الأدوات وسيلة. والنتيجة تجربة تستحق الاستخدام.</p>
          <a href="#projects">شاهدها في أعمالي <ArrowUpLeft size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
