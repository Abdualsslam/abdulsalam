// Keep hidden projects and their assets available for restoring later.
const projectCatalog = [
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
    id: "qit3ati",
    category: "تطبيقات",
    title: "تطبيق قطعتي | Qit3ati",
    description:
      "مرجع لفنيي صيانة الهواتف للبحث عن توافقات قطع الغيار بين الأجهزة. يجمع التصفح حسب العلامة ونوع القطعة، والبحث بالاسم أو الموديل، مع تفاصيل التوافقات والمفضلة وسجل الأجهزة الأخيرة، بواجهة عربية وإنجليزية.",
    tags: ["Flutter", "Bloc/Cubit", "Clean Architecture", "Dio", "Hive", "GetIt"],
    github: "https://github.com/Abdualsslam",
    demo: "#",
  },
  {
    id: "shoot-live",
    category: "تطبيقات",
    title: "تطبيق شوت لايف | ShootLive",
    description:
      "منصة رياضية تجمع المباريات وتفاصيلها والبطولات والفرق، مع الأخبار والمجتمعات والتوقعات. مبنية بـ Flutter وGetX، مع Dio وRetrofit للخدمات وتخزين مؤقت عبر Hive CE ودعم العربية والإنجليزية.",
    tags: ["Flutter", "GetX", "Dio", "Retrofit", "Hive CE", "Firebase"],
    github: "https://github.com/Abdualsslam",
    demo: "#",
  },
  {
    id: "talentgate",
    category: "تطبيقات",
    title: "تطبيق TalentGate",
    description:
      "تطبيق للاعبي أكاديميات كرة القدم يجمع بطاقة اللاعب وتقييماته، وتحليل الأداء والحضور، وجدول التمارين والمباريات. يقدم دروسًا حسب مركز اللاعب، مع ملف شخصي وإشعارات، وتجربة تنقّل مكانية باستخدام كرة تفاعلية.",
    tags: ["Flutter", "Bloc/Cubit", "Clean Architecture", "Dio", "Hive CE", "Firebase"],
    github: "https://github.com/Abdualsslam",
    demo: "#",
  },
  {
    id: "wamadat",
    category: "تطبيقات",
    title: "تطبيق ومضات | Wamadat",
    description:
      "تطبيق عربي للتدريب والتطوير يربط المتدرّب ببرامجه ورحلته التعليمية. يجمع تصفّح البرامج والدروس متعددة الوسائط والاختبارات والواجبات والشهادات، مع حفظ التقدّم وتخزين مؤقت مشفّر وارتباط بخدمات منصة Laravel.",
    tags: ["Flutter", "ChangeNotifier", "Dio", "GoRouter", "Hive CE", "Laravel API"],
    github: "https://github.com/Abdualsslam",
    demo: "#",
  },
  {
    id: "asas-al-aamaq",
    category: "مواقع وصفحات هبوط",
    title: "أساس الأعماق | Asas Al-Aamaq",
    description: "صفحة هبوط ثنائية اللغة لشركة مقاولات متخصصة في هندسة الأرض واستقرار الحفريات. تضم مقدمة بالفيديو، وخدمات هندسية تفاعلية، ومنهجية التنفيذ، ومعرض أعمال مصنّف، ووسائل تواصل مباشرة، بتصميم متجاوب للكمبيوتر والجوال.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"],
    github: "https://github.com/Abdualsslam/asas-alaamaq",
    demo: "#",
  },
  {
    id: "eman-website",
    hidden: true,
    category: "مواقع وصفحات هبوط",
    title: "موقع إيمان | Eman",
    description: "موقع شخصي تفاعلي لعرض خبرات ومهارات وأعمال مصممة UI/UX. يضم معرض مشاريع مصنّفًا وصفحات تفاصيل ومدونة ونموذج تواصل، مع لوحة تحكم لإدارة المحتوى وخادم NestJS وقاعدة بيانات MongoDB.",
    tags: ["React", "TypeScript", "NestJS", "MongoDB", "Framer Motion", "PWA"],
    github: "https://github.com/mpro775/eman-website",
    demo: "https://emanjameel.pro/",
  },
  {
    id: "nirab",
    category: "تطبيقات",
    title: "نيراب كلين | NIRAB CLEAN",
    description: "منظومة واحدة لخدمات التنظيف والصيانة تضم ثلاثة تطبيقات مترابطة: العميل لحجز الخدمات ومتابعتها، ومقدّم الخدمة لإدارة الفرع والطلبات والفنيين، والفني لمتابعة التنفيذ. مبنية بـ Flutter وGetX، ومتكاملة مع Laravel API ولوحة إدارة مشتركة.",
    tags: ["Flutter", "GetX", "Laravel API", "Google Maps", "Firebase", "Drift"],
    github: "https://github.com/nirab-project",
    demo: "#",
  },
  {
    id: "kuraimi",
    category: "تطبيقات",
    title: "الكريمي | تصور لتجربة مصرفية",
    description:
      "إعادة تصور مستقلة وغير رسمية لواجهات الكريمي باستخدام Flutter. تجربة عربية تشمل الحسابات متعددة العملات والبطاقات والحوالات وسداد الفواتير وتحليل العمليات، مع الوضعين الفاتح والمظلم. يعمل النموذج ببيانات وهمية ومحاكاة محلية دون اتصال بخوادم البنك.",
    tags: ["Flutter", "Dart", "RTL", "UI/UX", "Dark Mode", "Custom Animations"],
    github: "https://github.com/Abdualsslam",
    demo: "#",
  },
].map((project, index) => ({
  ...project,
  index,
}));

export const projectsData = projectCatalog.filter((project) => !project.hidden);

export type PortfolioProject = (typeof projectsData)[number];
export const getProjectById = (id: string) => projectsData.find((project) => project.id === id);
