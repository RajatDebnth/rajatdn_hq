export type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  noIndex?: boolean;
};

export type StructuredDataPageInput = {
  name: string;
  description: string;
  path: `/${string}` | "/";
};

export type StructuredDataArticleInput = StructuredDataPageInput & {
  publishedAt: string;
  updatedAt?: string;
  topics?: readonly string[];
};

export type ProfessionalServiceInput = StructuredDataPageInput & {
  serviceType: string;
  areaServed?: string;
};

export type JsonLdPrimitive = string | number | boolean | null;

export type JsonLdValue =
  | JsonLdPrimitive
  | { readonly [key: string]: JsonLdValue }
  | readonly JsonLdValue[];
