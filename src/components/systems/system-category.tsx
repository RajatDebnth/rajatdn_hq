type SystemCategoryProps = {
  index: number;
  system: {
    title: string;
    problem: string;
    objective: string;
    data: string;
    mlRole: string;
    infrastructureRole: string;
    output: string;
  };
};

const fields = [
  ["Problem", "problem"],
  ["System objective", "objective"],
  ["Typical data", "data"],
  ["AI / ML role", "mlRole"],
  ["Infrastructure role", "infrastructureRole"],
  ["Operational output", "output"],
] as const;

export function SystemCategory({ index, system }: SystemCategoryProps) {
  return (
    <article className="border-t border-[var(--line)] py-12 sm:py-16">
      <header className="grid gap-3 md:grid-cols-[8rem_1fr]">
        <p className="font-mono text-xs text-[var(--muted)]">{String(index).padStart(2, "0")}</p>
        <h2 className="text-3xl font-semibold tracking-tight">{system.title}</h2>
      </header>
      <dl className="mt-8 grid border border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {fields.map(([label, key]) => (
          <div className="border-b border-[var(--line)] p-5 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0" key={key}>
            <dt className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted)]">{label}</dt>
            <dd className="mt-3 leading-7">{system[key]}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
