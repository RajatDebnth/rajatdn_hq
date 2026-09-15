export type ContentKind =
  | "article"
  | "architecture"
  | "lab"
  | "project"
  | "page";

export type ContentStatus =
  | "conceptual"
  | "planned"
  | "running"
  | "implemented"
  | "tested"
  | "completed"
  | "deployed";

export type BaseContentMetadata = {
  slug: string;
  title: string;
  description: string;
  kind: ContentKind;
  status: ContentStatus;
  topics: readonly string[];
  publishedAt?: string;
  updatedAt?: string;
  draft?: boolean;
};

export type ArticleMetadata = BaseContentMetadata & {
  kind: "article";
  date: string;
  updatedDate?: string;
  author: string;
  category: string;
  tags: readonly string[];
  featured?: boolean;
  image?: { src: string; alt: string; width: number; height: number };
  readingTime: number;
  canonicalUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  faq?: readonly { question: string; answer: string }[];
  draft: boolean;
};

export type ArchitectureNoteMetadata = BaseContentMetadata & {
  kind: "architecture";
  category?: string;
  problem?: string;
  architecture?: string;
  components?: readonly ArchitectureComponent[];
  dataFlow?: ArchitectureDiagram;
  infrastructure?: string;
  deployment?: string;
  observability?: string;
  security?: string;
  scalability?: string;
  tradeoffs?: readonly ArchitectureTradeoff[];
  failureModes?: readonly ArchitectureFailureMode[];
  technologies?: readonly string[];
  relatedProjects?: readonly string[];
  relatedArticles?: readonly RelatedContentReference[];
  date?: string;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type ArchitectureComponent = {
  name: string;
  responsibility: string;
};

export type ArchitectureDiagram = {
  title: string;
  description: string;
  steps: readonly {
    label: string;
    detail: string;
  }[];
};

export type ArchitectureTradeoff = {
  decision: string;
  benefit: string;
  cost: string;
};

export type ArchitectureFailureMode = {
  failure: string;
  impact: string;
  response: string;
};

export type LabExperimentMetadata = BaseContentMetadata & {
  kind: "lab";
  status: Extract<ContentStatus, "planned" | "running" | "completed">;
  question?: string;
  hypothesis?: string;
  setup?: string;
  dataset?: string;
  methodology?: string;
  implementation?: string;
  results?: string;
  observations?: string;
  limitations?: string;
  conclusion?: string;
  technologies?: readonly string[];
  repositoryUrl?: string;
  date?: string;
  relatedArticles?: readonly RelatedContentReference[];
  relatedProjects?: readonly string[];
  seoTitle?: string;
  seoDescription?: string;
  placeholder?: boolean;
};

export type ProjectMetadata = BaseContentMetadata & {
  kind: "project";
  shortDescription: string;
  industry?: string;
  problem?: string;
  objective?: string;
  systemOverview?: string;
  architecture?: string;
  architectureDiagram?: {
    alt: string;
    steps: readonly string[];
  };
  data?: string;
  pipeline?: string;
  models?: string;
  infrastructure?: string;
  deployment?: string;
  monitoring?: string;
  results?: string;
  lessons?: string;
  technologies?: readonly string[];
  repositoryUrl?: string;
  demoUrl?: string;
  relatedArticles?: readonly RelatedContentReference[];
  relatedArchitecture?: readonly string[];
  featured?: boolean;
  date?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  seoTitle?: string;
  seoDescription?: string;
  placeholder?: boolean;
};

export type RelatedContentReference = {
  slug: string;
  title: string;
};

export type SitePageMetadata = BaseContentMetadata & {
  kind: "page";
};
