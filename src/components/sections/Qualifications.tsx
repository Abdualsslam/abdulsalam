import { sectionHref } from "../../lib/routes";
import { ArrowUpLeft, GraduationCap, Languages } from "lucide-react";
import "./Qualifications.css";

const certifications = [
  { name: "دورة Flutter و Dart الشاملة", issuer: "Udemy", year: "2025" },
  { name: "Google IT Automation", issuer: "Coursera", year: "2022" },
  { name: "Google IT Support", issuer: "Coursera", year: "2021 – 2022" },
  { name: "دبلوم اللغة الإنجليزية", issuer: "English Diploma", year: "2021 – 2022" },
  { name: "التسويق الرقمي من Google", issuer: "Google", year: "2020 – 2021" },
];

const languages = [
  { name: "العربية", code: "AR", level: "اللغة الأم", note: "" },
  { name: "الإنجليزية", code: "EN", level: "جيد جداً", note: "قراءة / كتابة / تحدّث" },
];

export default function Qualifications() {
  return (
    <section id="qualifications" className="qualifications-section" aria-labelledby="qualifications-title">
      <div className="qualifications-page mx-auto">
        <header className="qualifications-intro">
          <div>
            <span className="eyebrow">05 / المؤهلات والشهادات</span>
            <h2 id="qualifications-title">
              أساس أكاديمي.<br /><span>وتعلّم مستمر.</span>
            </h2>
          </div>
          <p>من دراسة تقنية المعلومات إلى تطوير التطبيقات والأتمتة؛ معرفة تتّسع مع كل تجربة جديدة.</p>
        </header>

        <div className="qualifications-layout">
          <article className="qualification-degree" aria-labelledby="degree-title">
            <div className="qualification-meta">
              <span dir="ltr">01 / EDUCATION</span>
              <GraduationCap size={24} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div className="qualification-degree-body">
              <span className="qualification-label">المؤهل الأكاديمي</span>
              <h3 id="degree-title">بكالوريوس<br />تقنية المعلومات</h3>
              <p>الجامعة الوطنية — اليمن</p>
            </div>
            <div className="qualification-graduation">
              <div><span>سنة التخرج</span><time dateTime="2021">2021</time></div>
              <svg viewBox="0 0 82 82" fill="none" aria-hidden="true">
                <path className="qualification-drafting" d="M3 14h76M3 67h76M14 3v76M67 3v76" />
                <path d="M24 18h29l9 9v37H24V18Zm29 0v10h9M32 36h21M32 43h21M32 50h13" stroke="currentColor" strokeWidth="1.5" />
                <path d="m42 63 5-7 5 7-5 7-5-7Z" stroke="var(--paper-accent)" strokeWidth="1.5" />
              </svg>
            </div>
          </article>

          <section className="qualification-records" aria-labelledby="certifications-title">
            <header className="qualification-records-heading">
              <div>
                <span className="qualification-meta" dir="ltr">02 / CONTINUOUS LEARNING</span>
                <h3 id="certifications-title">الشهادات والدورات</h3>
              </div>
              <span className="qualification-count">05 <span>برامج</span></span>
            </header>
            <ol className="qualification-record-list">
              {certifications.map((cert, index) => (
                <li key={cert.name}>
                  <span className="qualification-record-index" aria-hidden="true">0{index + 1}</span>
                  <div className="qualification-record-info">
                    <h4><bdi>{cert.name}</bdi></h4>
                    <p><bdi>{cert.issuer}</bdi></p>
                  </div>
                  <span className="qualification-record-year" dir="ltr">{cert.year}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="qualification-languages" aria-labelledby="languages-title">
          <header>
            <Languages size={23} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <span className="qualification-meta" dir="ltr">03 / LANGUAGES</span>
              <h3 id="languages-title">لغات أتواصل بها</h3>
            </div>
          </header>
          <dl className="qualification-language-list">
            {languages.map((language) => (
              <div key={language.code}>
                <span className="qualification-language-code" aria-hidden="true">{language.code}</span>
                <div>
                  <dt>{language.name}</dt>
                  <dd>{language.level}{language.note && <span>{language.note}</span>}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>

        <div className="qualifications-closing">
          <p>المعرفة أساس، والتطبيق هو الامتداد.</p>
          <a href={sectionHref("skills")}>اكتشف مهاراتي <ArrowUpLeft size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
