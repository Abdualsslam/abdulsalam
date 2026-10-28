/** Public identity and contact details shared by visible content and search metadata. */
export const profile = {
  name: "عبدالسلام معاد",
  alternateName: "Abdulsalam Muaad",
  jobTitle: "مطور Flutter ومحلل نظم وخبير أتمتة",
  description:
    "عبدالسلام معاد، مطور Flutter وDart ومواقع ويب من صنعاء، اليمن. أبني تطبيقات متعددة المنصات، وأحلّل النظم، وأؤتمت مسارات العمل باستخدام Python وn8n.",
  email: "abdulsalammuaad@gmail.com",
  telephone: "+967775019485",
  address: {
    locality: "صنعاء",
    countryCode: "YE",
    countryName: "اليمن",
  },
  sameAs: {
    github: "https://github.com/Abdualsslam",
    linkedin: "https://www.linkedin.com/in/abdulsalam-muaad/",
  },
} as const;

export const faqItems = [
  {
    question: "ما الخدمات التي يقدّمها عبدالسلام معاد؟",
    answer:
      "أطوّر تطبيقات متعددة المنصات باستخدام Flutter وDart، وأبني مواقع ويب، وأحلّل متطلبات النظم وتدفقات المستخدم. أعمل كذلك على أتمتة المهام المتكررة وربط الأدوات باستخدام Python وn8n.",
  },
  {
    question: "ما التقنيات المستخدمة في تطوير التطبيقات؟",
    answer:
      "أستخدم Flutter وDart، مع Bloc/Cubit أو GetX لإدارة الحالة حسب المشروع، وClean Architecture لتنظيم التطبيقات. تشمل أعمالي ربط REST APIs، والتخزين المحلي، والإشعارات، ودعم العربية والإنجليزية.",
  },
  {
    question: "كيف تُستخدم Python وn8n في أتمتة العمل؟",
    answer:
      "أحلّل خطوات العمل ثم أستخدم سكريبتات Python ومسارات n8n لربط الأدوات والخدمات وتنفيذ المهام المتكررة. يبدأ الحل بفهم المتطلبات وتحديد الخطوات التي يمكن أتمتتها.",
  },
  {
    question: "كيف يمكن التواصل لمناقشة مشروع؟",
    answer:
      `يمكنك مراسلتي على ${profile.email} أو الاتصال على ${profile.telephone}. يضم قسم التواصل روابط البريد والهاتف، وتجد في الموقع حسابي على GitHub وLinkedIn ونماذج من أعمالي.`,
  },
] as const;
