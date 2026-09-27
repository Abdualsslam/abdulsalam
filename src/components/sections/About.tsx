import { Smartphone, Workflow, Layers3, ArrowUpLeft } from "lucide-react";
export default function About() {
  return (
    <section id="about" className="about-section page-width section-space">
      <div className="section-heading">
        <div>
          <span className="eyebrow">01 / خلف الكود</span>
          <h2>
            شغف بالتفاصيل.
            <br />
            <span>وحلول للصورة الكبيرة.</span>
          </h2>
        </div>
        <div className="about-summary">
          <p>
            أنا عبدالسلام، مطور برمجيات أؤمن أن أفضل التقنيات هي التي تجعل
            الحياة أسهل. أبني تطبيقات Flutter وأصمم أنظمة أتمتة تربط احتياجات
            العمل بتجربة استخدام مدروسة.
          </p>
          <a className="text-link" href="#experience">
            تعرّف على رحلتي <ArrowUpLeft size={18} />
          </a>
        </div>
      </div>
      <div className="services-grid">
        {[
          {
            icon: Smartphone,
            n: "01",
            title: "تطبيقات تُحب استخدامها",
            text: "تطبيقات Flutter متعددة المنصات، بمعمارية نظيفة وأداء سريع وتجربة متسقة.",
          },
          {
            icon: Workflow,
            n: "02",
            title: "وقت أقل، إنجاز أكثر",
            text: "مسارات عمل ذكية باستخدام Python وn8n تختصر المهام المتكررة وتربط أدواتك.",
          },
          {
            icon: Layers3,
            n: "03",
            title: "من الفكرة إلى النظام",
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
    </section>
  );
}
