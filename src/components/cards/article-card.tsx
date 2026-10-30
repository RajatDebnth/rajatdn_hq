import Link from "next/link";

import type { ArticleMetadata } from "@/types/content";

type ArticleCardProps = {
  article: Pick<ArticleMetadata, "category" | "date" | "description" | "readingTime" | "slug" | "tags" | "title">;
  headingLevel?: 2 | 3;
  compact?: boolean;
};

export function ArticleCard({ article, headingLevel = 3, compact = false }: ArticleCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const date = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${article.date}T00:00:00Z`));

  if (compact) {
    return (
      <article className="py-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
        <Heading className="text-base sm:text-[1.05rem] font-semibold text-[var(--foreground)] leading-snug">
          <Link className="underline-offset-4 hover:underline" href={`/blog/${article.slug}`}>
            {article.title}
          </Link>
        </Heading>
        <div className="flex shrink-0 items-center gap-2 text-xs text-[var(--muted)] font-mono">
          <time dateTime={article.date}>{date}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime} min</span>
        </div>
      </article>
    );
  }

  return (
    <article className="py-5">
      <Heading className="text-lg sm:text-xl font-bold tracking-tight text-[var(--foreground)] leading-snug">
        <Link className="underline-offset-4 hover:underline" href={`/blog/${article.slug}`}>{article.title}</Link>
      </Heading>
      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]"><time className="font-mono text-xs" dateTime={article.date}>{date}</time><span aria-hidden="true">·</span><span className="tag">{article.category}</span><span aria-hidden="true">·</span><span className="text-xs">{article.readingTime} min read</span></div>
      <p className="mt-2.5 leading-7 text-[var(--muted)]">{article.description}</p>
      {article.tags.length ? <ul aria-label="Article topics" className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--muted)]">{article.tags.slice(0, 4).map((tag) => <li key={tag}>#{tag.toLowerCase().replace(/\s+/g, "-")}</li>)}</ul> : null}
    </article>
  );
}
