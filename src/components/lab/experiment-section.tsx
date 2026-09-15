import type { ReactNode } from "react";

export function ExperimentSection({ children, id, title }: { children: ReactNode; id: string; title: string }) {
  return <section aria-labelledby={id} className="grid gap-4 border-t border-[var(--line)] py-9 md:grid-cols-[12rem_1fr] md:gap-10"><h2 className="text-lg font-semibold" id={id}>{title}</h2><div className="max-w-[var(--article-width)] leading-7 text-[var(--muted)]">{children}</div></section>;
}
