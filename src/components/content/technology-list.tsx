type TechnologyListProps = {
  technologies: readonly string[];
};

export function TechnologyList({ technologies }: TechnologyListProps) {
  if (technologies.length === 0) return null;

  return (
    <dl className="grid gap-3 border-y border-[var(--line)] py-4 sm:grid-cols-[9rem_1fr]">
      <dt className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted)]">Technologies</dt>
      <dd>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </dd>
    </dl>
  );
}
