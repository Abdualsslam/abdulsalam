import type { ProjectCaseStudy } from "./caseStudyTypes";
import { tagadodEngineering, tagadodExperiences, tagadodFeatures } from "./tagadod";
import { trasPhoneCaseStudy } from "./trasPhone";

const studies: Record<string, ProjectCaseStudy> = {
  tagadod: {
    name: "تجدُّد",
    mediaReady: true,
    logo: { width: 780, height: 237 },
    lead: "من اختيار المنتج إلى طلب الصيانة. تجربة واحدة، لاحتياجات متعددة.",
    summary: "تطبيق يجمع تجارة المنتجات الكهربائية وخدمات الصيانة والأدوات المساندة، مبني بـ Flutter للعربية والإنجليزية.",
    facts: [
      { label: "المجال", value: "تجارة إلكترونية وصيانة" },
      { label: "دوري", value: "تطوير التطبيق وهندسة بنيته" },
      { label: "تجربة الاستخدام", value: "عربية / إنجليزية" },
    ],
    featuresHeading: "أكثر من متجر.",
    experiences: tagadodExperiences,
    features: tagadodFeatures,
    engineering: tagadodEngineering,
    dataLayer: "Dio / Hive / Repositories",
  },
  "tras-phone": trasPhoneCaseStudy,
};

export const getProjectCaseStudy = (id: string): ProjectCaseStudy | undefined => studies[id];
