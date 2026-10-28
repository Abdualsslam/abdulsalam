import { sectionHref } from "../../lib/routes";
import { Smartphone, Workflow, Layers3, ArrowUpLeft } from "lucide-react";
import { faqItems, profile } from "../../data/profile";
import "./About.css";
export default function About() {
  return (
    <section id="about" className="about-section page-width section-space" aria-labelledby="about-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">01 / خلف الكود</span>
          <h2 id="about-title">
            شغف بالتفاصيل.
            <br />
            <span>وحلول للصورة الكبيرة.</span>
          </h2>
        </div>
        <div className="about-summary">
          <p>
            أنا {profile.name}، مطوّر Flutter وDart ومواقع ويب من صنعاء، اليمن.
            أحلّل احتياجات العمل وأحوّلها إلى تطبيقات سهلة الاستخدام، وأصمّم
            مسارات أتمتة باستخدام Python وn8n لربط الأدوات واختصار المهام المتكررة.
          </p>
          <a className="text-link" href={sectionHref("experience")}>
            تعرّف على رحلتي <ArrowUpLeft size={18} />
          </a>
        </div>
      </div>
      <div className="services-grid">
        {[
          {
            icon: Smartphone,
            n: "01",
            title: "تطوير تطبيقات Flutter",
            text: "تطبيقات متعددة المنصات باستخدام Flutter وDart، بمعمارية نظيفة وتجربة استخدام متسقة.",
          },
          {
            icon: Workflow,
            n: "02",
            title: "أتمتة العمل بـ Python وn8n",
            text: "مسارات عمل ذكية باستخدام Python وn8n تختصر المهام المتكررة وتربط أدواتك.",
          },
          {
            icon: Layers3,
            n: "03",
            title: "تحليل النظم والمتطلبات",
            text: "تحليل المتطلبات ورسم تدفقات المستخدم وتحويل التعقيد إلى حلول برمجية واضحة.",
          },
        ].map((item) => (
          <article className="service-card" key={item.n}>
            <div className="service-top">
              <item.icon size={28} />
              <span>{item.n}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <section className="about-faq" aria-labelledby="about-faq-title">
        <header className="about-faq-heading">
          <span className="eyebrow">قبل أن نبدأ</span>
          <h3 id="about-faq-title">أسئلة عن خدماتي وطريقة العمل</h3>
        </header>
        <div className="about-faq-list">
          {faqItems.map((item) => (
            <details className="about-faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <a className="text-link" href={sectionHref("contact")}>
          لنتحدث عن مشروعك <ArrowUpLeft size={18} aria-hidden="true" />
        </a>
      </section>
    </section>
  );
}
