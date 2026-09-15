export function TableOfContents({ headings }: { headings: readonly { id: string; title: string; level: number }[] }) {
  if (!headings.length) return null;
  return <nav aria-labelledby="toc-title" className="border border-[var(--line)] bg-[var(--surface)] p-5"><h2 className="font-semibold" id="toc-title">On this page</h2><ol className="mt-4 space-y-2 text-sm">{headings.map((heading) => <li className={heading.level === 3 ? "pl-4" : undefined} key={heading.id}><a className="text-[var(--muted)] hover:text-[var(--accent)]" href={`#${heading.id}`}>{heading.title}</a></li>)}</ol></nav>;
}
