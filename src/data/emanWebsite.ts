import type { ProjectCaseStudy } from "./caseStudyTypes";

export const emanWebsiteCaseStudy: ProjectCaseStudy = {
  name: "إيمان",
  mediaReady: false,
  logo: { width: 47, height: 89, showName: true },
  lead: "مساحة شخصية، بهوية بصرية تتفاعل معك.",
  summary: "موقع شخصي لمصممة واجهات وتجارب مستخدم، يجمع التعريف والمهارات والخبرات والخدمات ومعرض الأعمال والمدونة والتواصل. واجهة عربية متجاوبة، مرتبطة بخادم لإدارة المحتوى ولوحة تحكم مستقلة.",
  facts: [
    { label: "نوع المشروع", value: "موقع شخصي ونظام إدارة محتوى" },
    { label: "الواجهة", value: "React / TypeScript / عربية RTL" },
    { label: "الخادم", value: "NestJS / MongoDB" },
  ],
  website: {
    screenshots: [
      { file: "home-desktop.webp", title: "الواجهة الرئيسية", description: "مقدمة بهوية داكنة ولمسات وردية وبنفسجية، ووسائط متحركة، مع الوصول إلى أقسام الملف الشخصي.", width: 1092, height: 871 },
      { file: "skills-desktop.webp", title: "المهارات", description: "الانتقال من التعريف الشخصي إلى عرض مهارات التصميم والتطوير والأدوات المستخدمة.", width: 1092, height: 871 },
      { file: "works-desktop.webp", title: "معرض الأعمال", description: "فئات مستقلة لتصميم تطبيقات ومواقع UX/UI والبرمجة والتصميم الجرافيكي، تقود إلى المشاريع وتفاصيلها.", width: 1092, height: 871 },
      { file: "home-mobile.webp", title: "تجربة الجوال", description: "نسخة متجاوبة للمقدمة، مع قائمة تنقل للهاتف تحافظ على الوصول إلى الأقسام والصفحات.", width: 382, height: 827, mobile: true },
    ],
  },
  experiences: [],
  featuresHeading: "هوية واحدة، ومسارات متعددة لاكتشاف الأعمال.",
  features: [
    { title: "تعريف يتفاعل مع الزائر", description: "مقدمة بالوسائط والحركة، وانتقال إلى المهارات داخل مساحة التعريف، مع تنقل بين أقسام الخبرات والخدمات والبرامج والتواصل." },
    { title: "مشاريع مصنّفة بتفاصيلها", description: "عرض الفئات على هيئة بطاقات صور متراكبة، وصفحات للأعمال حسب التصنيف، ثم صفحات تفاصيل بصور المشروع ومعلوماته وروابطه." },
    { title: "مدونة وتواصل", description: "صفحات للمقالات وتصنيفاتها وتفاصيلها، ونموذج لطلب الخدمات وإرسال الرسائل، مع اشتراك في النشرة البريدية وروابط التواصل." },
    { title: "محتوى قابل للإدارة", description: "لوحة تحكم بمسارات محمية لإدارة الملف الشخصي والمشاريع والفئات والمدونة والخدمات والخبرات وآراء العملاء والرسائل والمشتركين." },
  ],
  engineering: [
    { title: "واجهة ومسارات مستقلة", description: "React 19 وTypeScript وVite، مع React Router للصفحات العامة والإدارة، وتحميل كسول للأقسام والمسارات. Framer Motion للحركة وZustand لحالات مثل الجلسة وإعدادات الصوت." },
    { title: "خادم بوحدات واضحة", description: "NestJS بوحدات للملف الشخصي والمشاريع والمقالات والخدمات وغيرها، مع MongoDB وMongoose، ومصادقة JWT وتجديد للجلسة والتحقق من المدخلات عبر DTOs." },
    { title: "وسائط وتجربة قابلة للتثبيت", description: "خدمة لرفع الملفات تدعم Cloudflare R2 ومعالجة الصور عبر Sharp. إعداد PWA وWorkbox لإتاحة التثبيت وسياسات تخزين مؤقت للصور والخطوط وملفات الواجهة." },
  ],
  dataLayer: "MongoDB / Mongoose / Media storage",
  architectureLayers: [
    { name: "React", description: "الواجهات العامة ولوحة الإدارة والمسارات" },
    { name: "NestJS API", description: "وحدات المحتوى والجلسة والتحقق من المدخلات" },
    { name: "MongoDB & Media", description: "بيانات المحتوى والملفات والصور" },
  ],
};
