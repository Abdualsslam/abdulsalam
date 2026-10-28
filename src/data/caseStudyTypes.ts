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
  logo: { width: number; height: number; square?: boolean; showName?: boolean; file?: string };
  website?: { screenshots: readonly ProjectWebsiteScreenshot[] };
  appSuite?: { apps: readonly ProjectSuiteApp[] };
  lead: string;
  summary: string;
  facts: readonly { label: string; value: string }[];
  featuresHeading: string;
  experiences: readonly ProjectExperienceClip[];
  features: readonly { title: string; description: string }[];
  engineering: readonly { title: string; description: string }[];
  dataLayer: string;
  presentationLayer?: string;
  architectureLayers?: readonly { name: string; description: string }[];
}

export interface ProjectWebsiteScreenshot {
  file: string;
  title: string;
  description: string;
  width: number;
  height: number;
  mobile?: boolean;
}

export interface ProjectSuiteApp {
  id: string;
  name: string;
  role: string;
  summary: string;
  features: readonly string[];
  screenshots: readonly ProjectWebsiteScreenshot[];
}
