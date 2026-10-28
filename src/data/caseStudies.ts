import type { ProjectCaseStudy } from "./caseStudyTypes";
import { tagadodEngineering, tagadodExperiences, tagadodFeatures } from "./tagadod";
import { trasPhoneCaseStudy } from "./trasPhone";
import { qit3atiCaseStudy } from "./qit3ati";
import { shootLiveCaseStudy } from "./shootLive";
import { talentGateCaseStudy } from "./talentGate";
import { wamadatCaseStudy } from "./wamadat";
import { asasAlAamaqCaseStudy } from "./asasAlAamaq";
import { emanWebsiteCaseStudy } from "./emanWebsite";
import { nirabCaseStudy } from "./nirab";

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
  qit3ati: qit3atiCaseStudy,
  "shoot-live": shootLiveCaseStudy,
  talentgate: talentGateCaseStudy,
  wamadat: wamadatCaseStudy,
  "asas-al-aamaq": asasAlAamaqCaseStudy,
  "eman-website": emanWebsiteCaseStudy,
  nirab: nirabCaseStudy,
};

export const getProjectCaseStudy = (id: string): ProjectCaseStudy | undefined => studies[id];
