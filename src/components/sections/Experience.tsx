import { sectionHref } from "../../lib/routes";
import "./Experience.css";
import { ArrowUpLeft, Plus } from "lucide-react";

const experienceData = [
  {
    title: "مدير قسم تقنية المعلومات",
    company: "تجدُّد | Tagadod (صنعاء، اليمن)",
    period: "أغسطس 2025 - الحالي",
    description: [
      "قيادة وإدارة العمليات اليومية لقسم تقنية المعلومات، بما يشمل الإشراف على البنية التحتية، والدعم الفني، وبناء الأدوات البرمجية الداخلية.",
      "هندسة وتطوير تطبيق فلاتر (Flutter) الخاص بالشركة من الصفر (~80 شاشة)، وتغطية تدفقات التجارة الإلكترونية وسوق خدمات الصيانة.",
      "تصميم وأتمتة مسارات العمل الداخلية المعقدة باستخدام سكريبتات Python وسيناريوهات n8n، مما قلل الوقت اللازم للعمليات اليدوية بشكل كبير.",
      "التنسيق والتواصل الفعال مع الفرق متعددة التخصصات لجمع المتطلبات وتحليلها، ورسم تدفقات المستخدم، وتحويل احتياجات العمل إلى حلول برمجية متكاملة.",
    ],
  },
  {
    title: "مدرس فلاتر (Flutter Instructor)",
    company: "أكاديمية سمارت | Smart Academy (اليمن)",
    period: "2024 - 2025",
    description: [
      "تصميم وتقديم منهج تعليمي عملي وتطبيقي قائم على المشاريع لتعليم إطار العمل Flutter ولغة Dart.",
      "تغطية المفاهيم البرمجية المتقدمة مثل معمارية الكود النظيفة (Clean Architecture)، وإدارة الحالة باستخدام (Bloc/GetX)، والربط مع واجهات برمجة التطبيقات (REST APIs).",
      "توجيه وإرشاد الطلاب خلال رحلة بناء تطبيقات موبايل متكاملة من مرحلة تصميم الواجهات وحتى الربط مع قواعد البيانات والنشر.",
    ],
  },
  {
    title: "معيد / محاضر (Teaching Assistant)",
    company: "جامعة الجيل الجديد (اليمن)",
    period: "2023 - 2024",
    description: [
      "تدريس مساقات البرمجة المتنوعة وتقديم الدعم الأكاديمي والعملي للطلاب خلال الجلسات المعملية.",
      "مساعدة الطلاب وتوجيههم في إنجاز مشاريعهم البرمجية وتطبيق المفاهيم المدروسة.",
    ],
  },
  {
    title: "معيد / محاضر (Teaching Assistant)",
    company: "الجامعة الوطنية (اليمن)",
    period: "2021 - 2023",
    description: [
      "تدريس أساسيات ومساقات لغة جافا (Java Programming) والإشراف على المختبرات العملية للتأكد من فهم الطلاب للبرمجة كائنية التوجه (OOP).",
    ],
  },
  {
    title: "التسويق الرقمي وإدارة حسابات التجارة الإلكترونية",
    company: "النجوم تليكوم | Alnjoomtelecom (جدة، السعودية)",
    period: "2019 - 2023",
    description: [
      "إدارة المنصات وحسابات التواصل الاجتماعي للشركة، وتسيير عمليات المتجر الإلكتروني بكفاءة.",
      "إنشاء وصناعة المحتوى الترويجي لجذب العملاء الجدد وتحسين معدلات التحويل والمبيعات.",
    ],
  },
];

const responsibilityLabels = ["قيادة التقنية", "بناء المنتج", "أتمتة العمل", "تحليل النظم"];

export default function Experience() {
  const currentRole = experienceData[0];

  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-title">
      <div className="experience-page mx-auto">
        <header className="experience-intro">
          <div>
            <span className="eyebrow">04 / الخبرات العملية</span>
            <h2 id="experience-title">خبرة تتراكم.<br /><span>وأثر يمتد.</span></h2>
          </div>
          <p>بين بناء المنتجات، وقيادة التقنية، ومشاركة المعرفة؛ محطات شكّلت طريقتي في التفكير والعمل.</p>
        </header>

        <article className="experience-current" aria-labelledby="current-role-title">
          <div className="experience-current-meta">
            <span className="experience-current-label"><span aria-hidden="true" />الدور الحالي</span>
            <span>{currentRole.period}</span>
          </div>
          <header className="experience-current-heading">
            <div>
              <h3 id="current-role-title">{currentRole.title}</h3>
              <p>{currentRole.company}</p>
            </div>
            <div className="experience-product-scale">
              <strong dir="ltr">~80</strong>
              <span>شاشة في تطبيق تجدُّد</span>
            </div>
          </header>
          <ul className="experience-responsibilities">
            {currentRole.description.map((point, index) => (
              <li key={point}>
                <span className="experience-responsibility-index" aria-hidden="true">0{index + 1}</span>
                <div>
                  <h4>{responsibilityLabels[index]}</h4>
                  <p>{point}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <section className="experience-history" aria-labelledby="experience-history-title">
          <header className="experience-history-heading">
            <h3 id="experience-history-title">محطات سابقة</h3>
            <span dir="ltr">2019 — 2025</span>
          </header>
          <ol className="experience-history-list">
            {experienceData.slice(1).map((role) => (
              <li key={`${role.company}-${role.period}`}>
                <details className="experience-role">
                  <summary>
                    <span className="experience-role-period"><bdi>{role.period}</bdi></span>
                    <span className="experience-role-info">
                      <strong>{role.title}</strong>
                      <span>{role.company}</span>
                    </span>
                    <span className="experience-role-control">
                      <span className="experience-role-show">التفاصيل</span>
                      <span className="experience-role-hide">إغلاق</span>
                      <Plus size={17} aria-hidden="true" />
                    </span>
                  </summary>
                  <ul className="experience-role-points">
                    {role.description.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </details>
              </li>
            ))}
          </ol>
        </section>

        <div className="experience-closing">
          <p>من الخبرة إلى التنفيذ.</p>
          <a href={sectionHref("projects")}>استكشف أعمالي <ArrowUpLeft size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
