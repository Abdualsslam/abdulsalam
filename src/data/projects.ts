export const projectsData = [
  {
    id: "tagadod",
    category: "تطبيقات",
    title: "تطبيق تجدُّد | Tagadod",
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
    id: "tras-phone",
    category: "تطبيقات",
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
    id: "smart-store",
    category: "تطبيقات",
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
    id: "elastic-sheet",
    category: "مفتوح المصدر",
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
    id: "frost-nav-bar",
    category: "مفتوح المصدر",
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
    id: "sales-automation",
    category: "أتمتة",
    title: "أتمتة مبيعات البوت | n8n",
    description:
      "نظام أتمتة متكامل للرد على رسائل العملاء، واستقبال الطلبات، ومعالجة البيانات تلقائياً دون تدخل بشري. يعتمد بالكامل على منصة سير العمل n8n وسكريبتات Python للتواصل المباشر مع ملفات إكسل كقاعدة بيانات.",
    tags: ["n8n Workflows", "Python Scripting", "Automation", "Excel API"],
    github: "https://github.com/Abdualsslam",
    demo: "#",
  },
  {
    id: "qit3ati",
    category: "تطبيقات",
    title: "تطبيق قطعتي | Qit3ati",
    description:
      "مرجع لفنيي صيانة الهواتف للبحث عن توافقات قطع الغيار بين الأجهزة. يجمع التصفح حسب العلامة ونوع القطعة، والبحث بالاسم أو الموديل، مع تفاصيل التوافقات والمفضلة وسجل الأجهزة الأخيرة، بواجهة عربية وإنجليزية.",
    tags: ["Flutter", "Bloc/Cubit", "Clean Architecture", "Dio", "Hive", "GetIt"],
    github: "https://github.com/Abdualsslam",
    demo: "#",
  },
].map((project, index) => ({
  ...project,
  index,
}));

export type PortfolioProject = (typeof projectsData)[number];
export const getProjectById = (id: string) => projectsData.find((project) => project.id === id);
