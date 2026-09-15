const stages = [
  "Industrial data",
  "Data infrastructure",
  "AI / ML",
  "Infrastructure",
  "Deployment",
  "Monitoring",
  "Operational decision",
] as const;

export function ArchitectureFlow() {
  return (
    <ol
      aria-label="Production AI system architecture flow"
      className="mt-10 grid border border-[var(--line)] bg-[var(--line)] lg:grid-cols-7"
    >
      {stages.map((stage, index) => (
        <li className="relative bg-[var(--surface)] p-5 lg:min-h-44" key={stage}>
          <span className="block font-mono text-xs text-[var(--muted)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mt-6 block max-w-36 text-sm font-semibold lg:mt-14">{stage}</span>
          {index < stages.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute -bottom-3 left-1/2 z-10 flex size-6 -translate-x-1/2 items-center justify-center border border-[var(--line-strong)] bg-[var(--background)] font-mono text-xs text-[var(--accent)] lg:-right-3 lg:bottom-auto lg:left-auto lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2"
            >
              <span className="lg:hidden">↓</span>
              <span className="hidden lg:inline">→</span>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
