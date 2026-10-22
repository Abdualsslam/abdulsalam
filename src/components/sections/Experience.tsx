import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experienceData = [
  {
    title: "مدير قسم تقنية المعلومات",
    company: "تجديد | Tagadod (صنعاء، اليمن)",
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

export default function Experience() {
  return (
    <section id="experience" className="py-24 text-ink">
      <div className="max-w-6xl mx-auto px-5">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          الخبرات العملية
        </motion.h2>

        <div className="relative max-w-3xl mx-auto before:content-[''] before:absolute before:top-0 before:right-5 before:w-0.5 before:h-full before:bg-[var(--paper-rule)] before:rounded-full">
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              className="relative pr-12 sm:pr-16 mb-10 last:mb-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="absolute right-0 top-8 w-10 h-10 bg-paper-surface border-[3px] border-primary rounded-full flex items-center justify-center text-primary z-10">
                <Briefcase size={20} />
              </div>
              <div className="card p-5 sm:p-7 text-right" dir="rtl">
                <div className="mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 text-ink">
                    {exp.title}
                  </h3>
                  <span className="text-primary font-medium">
                    {exp.company}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-ink-muted text-sm mb-4">
                  <Calendar size={16} />
                  <span>{exp.period}</span>
                </div>
                {Array.isArray(exp.description) ? (
                  <ul className="list-none text-ink-muted space-y-2 leading-relaxed text-sm pr-2">
                    {exp.description.map((point, pIndex) => (
                      <li
                        key={pIndex}
                        className="relative pr-4 before:content-['•'] before:absolute before:right-0 before:text-primary"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-ink-muted leading-relaxed text-sm">
                    {exp.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
