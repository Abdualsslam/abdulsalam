export interface ProjectExperienceClip {
  file: string;
  duration: string;
  shortTitle: string;
  title: string;
  summary: string;
  description: string;
  steps: readonly string[];
}

export interface ProjectCaseStudy {
  name: string;
  mediaReady: boolean;
  logo: { width: number; height: number; square?: boolean; showName?: boolean };
  lead: string;
  summary: string;
  facts: readonly { label: string; value: string }[];
  featuresHeading: string;
  experiences: readonly ProjectExperienceClip[];
  features: readonly { title: string; description: string }[];
  engineering: readonly { title: string; description: string }[];
  dataLayer: string;
  presentationLayer?: string;
}
