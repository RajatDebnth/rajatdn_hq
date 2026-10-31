export type WorkCategory = "Design" | "Solutions" | "AI and Automation";

export type WorkLinkType = "demo" | "github" | "article" | "website";

export type WorkWorkflowStep = {
  step: string;
  title: string;
  desc: string;
};

export type WorkMediaDemo = {
  type: "image" | "video" | "gif";
  src: string;
  caption?: string;
};

export type WorkCta = {
  label: string;
  url: string;
  type: WorkLinkType;
};

export type WorkPopupDetails = {
  oneLiner: string;
  problem: string;
  workflow?: WorkWorkflowStep[];
  mediaDemo?: WorkMediaDemo;
  techStack: string[];
  architecture?: string;
  highlights: string[];
  ctas: WorkCta[];
};

export type WorkItem = {
  id: string;
  title: string;
  category: WorkCategory;
  subtitle: string;
  link: string;
  linkType?: WorkLinkType;
  image?: string;
  previewType?: "swish" | "gravity" | "fit" | "checklist" | "stream" | "network" | "landingvault" | "pencil-club" | "forma" | "goodfit" | "signal-social" | "tonerd" | "taskflow";
  popup?: WorkPopupDetails;
};
