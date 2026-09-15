import Link from "next/link";

import { Card } from "@/components/ui/card";
import { TagList } from "@/components/ui/tag-list";
import type { ArticleMetadata } from "@/types/content";

type ArticleCardProps = {
  article: Pick<ArticleMetadata, "category" | "date" | "description" | "readingTime" | "slug" | "tags" | "title">;
  headingLevel?: 2 | 3;
};

export function ArticleCard({ article, headingLevel = 3 }: ArticleCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap gap-3 font-mono text-xs text-[var(--muted)]"><time dateTime={article.date}>{article.date}</time><span>{article.category}</span><span>{article.readingTime} min read</span></div>
      <Heading className="mt-4 text-xl font-semibold tracking-tight">
        <Link className="hover:text-[var(--accent)]" href={`/blog/${article.slug}`}>{article.title}</Link>
      </Heading>
      <p className="mt-3 flex-1 text-[var(--muted)]">{article.description}</p>
      <div className="mt-6"><TagList tags={article.tags} /></div>
    </Card>
  );
}
