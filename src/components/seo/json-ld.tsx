import type { JsonLdValue } from "@/types/seo";

type JsonLdProps = {
  data: JsonLdValue;
};

export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  return <script dangerouslySetInnerHTML={{ __html: json }} type="application/ld+json" />;
}
