import Link from "next/link";

import type { RelatedContentReference } from "@/types/content";

type RelatedContentProps = {
  articles: readonly RelatedContentReference[];
};

export function RelatedContent({ articles }: RelatedContentProps) {
  if (articles.length === 0) return null;

  return (
    <aside aria-labelledby="related-content-title" className="border-t border-[var(--line)] py-10">
      <h2 id="related-content-title" className="text-xl font-semibold">Related technical writing</h2>
      <ul className="mt-5 space-y-3">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link className="font-medium text-[var(--accent)] underline-offset-4 hover:underline" href={`/blog/${article.slug}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
