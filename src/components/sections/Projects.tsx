import { useState } from "react";
import {
  ArrowUpLeft,
  Smartphone,
  ShoppingBag,
  Headphones,
  Home,
  Heart,
  User,
  MessageSquare,
  Workflow,
  Database,
} from "lucide-react";
const projectsData = [
  {
    title: "تطبيق تجديد | Tagadod",
    description:
      "تطبيق تجارة إلكترونية وسوق صيانة متكامل ضخم (~80 شاشة) مبني بـ Clean Architecture و Bloc/Cubit. يربط العملاء بالمهندسين ويدعم المحادثات الفورية وتخزين مؤقت عالي الأداء مع نظام أمان JWT متقدم وإشعارات دفع ديناميكية.",
    tags: [
      "Flutter",
      "Bloc/Cubit",
      "Clean Architecture",
      "Socket.IO",
      "Hive",
      "FCM",
    ],
    github: "https://github.com/Abdualsslam",
    demo: "#",
  },
  {
    title: "تطبيق TRAS Phone",
    description:
      "تطبيق B2B مخصص لتجار تجزئة قطع غيار الهواتف والمهندسين. يتميز بمزامنة ذكية للسلة محلياً وسحابياً (Offline Cart Sync)، ونظام دردشة دعم فني، وتوثيق آمن مع إمكانية الولوج بالبصمة الحيوية وخرائط جوجل لتحديد مواقع الشحن.",
    tags: [
      "Flutter",
      "Bloc/Cubit",
      "GoRouter",
      "Secure Storage",
      "local_auth",
      "Google Maps",
    ],
    github: "https://github.com/Abdualsslam",
    demo: "#",
  },
  {
    title: "تطبيق Smart Store",
    description:
      "متجر إلكتروني ذكي للهواتف مع تدفق تسوق متكامل (التصنيفات، المفضلة، السلة، الدفع، الكوبونات). تم بناؤه بالكامل بالاعتماد على خدمات Firebase السحابية وتأمين الطلبات البرمجية عبر Firebase App Check لإدارة المدفوعات والبيانات.",
    tags: [
      "Flutter",
      "GetX",
      "Firebase Auth",
      "Firestore",
      "Firebase App Check",
      "GetStorage",
    ],
    github: "https://github.com/Abdualsslam",
    demo: "#",
  },
  {
    title: "حزمة elastic_sheet",
    description:
      "حزمة برمجية مفتوحة المصدر تم نشرها على مستودع حزم فلاتر الرسمي pub.dev. وهي عبارة عن ويدجت فلاتر مخصص لإنشاء أسطح وقوائم قابلة للتمدد والتقلص الديناميكي بفيزياء السوائل وحركة النوابض الطبيعية.",
    tags: [
      "Flutter Package",
      "Dart",
      "Spring Physics",
      "Open Source",
      "pub.dev",
    ],
    github: "https://github.com/Abdualsslam/elastic_sheet",
    demo: "https://pub.dev/packages/elastic_sheet",
  },
  {
    title: "حزمة frost_nav_bar",
    description:
      "حزمة شريط تنقل سفلي زجاجي فاخر (Glassmorphism) مفتوحة المصدر ومنشورة على pub.dev. تدعم الحركات الحرة وتأثير بلور الخلفية، ومؤشرات السحب المرنة مع توافقية ممتازة مع الواجهات العربية والعالمية (RTL/LTR).",
    tags: [
      "Flutter Package",
      "Dart",
      "Glassmorphism",
      "Open Source",
      "pub.dev",
    ],
    github: "https://github.com/Abdualsslam/frost_nav_bar",
    demo: "https://pub.dev/packages/frost_nav_bar",
  },
  {
    title: "أتمتة مبيعات البوت | n8n",
    description:
      "نظام أتمتة متكامل للرد على رسائل العملاء، واستقبال الطلبات، ومعالجة البيانات تلقائياً دون تدخل بشري. يعتمد بالكامل على منصة سير العمل n8n وسكريبتات Python للتواصل المباشر مع ملفات إكسل كقاعدة بيانات.",
    tags: ["n8n Workflows", "Python Scripting", "Automation", "Excel API"],
    github: "https://github.com/Abdualsslam",
    demo: "#",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("الكل");
  const categories = [
    "تطبيقات",
    "تطبيقات",
    "تطبيقات",
    "مفتوح المصدر",
    "مفتوح المصدر",
    "أتمتة",
  ];
  const visibleProjects = projectsData
    .map((project, index) => ({
      ...project,
      index,
      category: categories[index],
    }))
    .filter((project) => filter === "الكل" || project.category === filter);
  return (
    <section id="projects" className="projects-section section-space">
      <div className="page-width">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / أعمال مختارة</span>
            <h2>
              أفكار خرجت <span>إلى النور.</span>
            </h2>
          </div>
          <p>
            كل مشروع تحدٍ جديد،
            <br />
            وفرصة لصناعة تجربة أفضل.
          </p>
        </div>
        <div
          className="project-filters"
          role="group"
          aria-label="تصفية المشاريع"
        >
          {["الكل", "تطبيقات", "مفتوح المصدر", "أتمتة"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={filter === category ? "selected" : ""}
            >
              {category}
              {category === "الكل" && <span>06</span>}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          عرض {visibleProjects.length} مشاريع
        </p>
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article
              className={`project-card project-${project.index}`}
              key={project.title}
            >
              <div className="project-art" aria-hidden="true">
                <span className="art-index">
                  0{project.index + 1} / {project.category}
                </span>
                {project.index < 3 ? (
                  <div className="phone-mock">
                    <div className="phone-speaker" />
                    <div className="phone-header">
                      <span>
                        {["تجديد", "TRAS", "Smart Store"][project.index]}
                      </span>
                      <ShoppingBag size={15} />
                    </div>
                    <div className="phone-banner">
                      {
                        [
                          "كل ما تحتاجه،\nفي مكان واحد.",
                          "قطع أصلية.\nإمكانيات أكبر.",
                          "تقنيتك القادمة\nتبدأ هنا.",
                        ][project.index]
                      }
                      <Smartphone size={42} />
                    </div>
                    <div className="phone-categories">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="phone-products">
                      <div>
                        <Smartphone size={30} />
                        <span />
                      </div>
                      <div>
                        <Headphones size={30} />
                        <span />
                      </div>
                    </div>
                    <div className="phone-nav">
                      <Home size={14} />
                      <Heart size={14} />
                      <ShoppingBag size={14} />
                      <User size={14} />
                    </div>
                  </div>
                ) : project.index < 5 ? (
                  <div className="package-art">
                    <span>{project.index === 3 ? "{ }" : "< / >"}</span>
                    <b>
                      {project.index === 3 ? "elastic_sheet" : "frost_nav_bar"}
                    </b>
                    <small>CRAFTED FOR FLUTTER</small>
                    <div className="package-sheet">
                      {project.index === 3 ? (
                        <>
                          <i />
                          <i />
                          <i />
                        </>
                      ) : (
                        <>
                          <Home />
                          <Heart />
                          <User />
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="workflow-art">
                    <div>
                      <MessageSquare />
                      <small>رسالة جديدة</small>
                    </div>
                    <span>···</span>
                    <div>
                      <Workflow />
                      <small>n8n</small>
                    </div>
                    <span>···</span>
                    <div>
                      <Database />
                      <small>بيانات منظمة</small>
                    </div>
                  </div>
                )}
                <span className="concept-label">تصوّر بصري للمشروع</span>
              </div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags" dir="ltr">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a
                  className="project-link"
                  href={project.demo !== "#" ? project.demo : project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.demo !== "#"
                    ? "استكشف الحزمة على pub.dev"
                    : "استكشف حسابي على GitHub"}
                  <ArrowUpLeft size={19} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
