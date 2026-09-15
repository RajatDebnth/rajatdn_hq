import { Breadcrumb } from "@/components/content/breadcrumb";
import { Badge } from "@/components/ui/badge";

type PageHeaderProps = {
  breadcrumb?: readonly { href?: `/${string}` | "/"; label: string }[];
  eyebrow?: string;
  title: string;
  summary?: string;
  status?: string;
};

export function PageHeader({ breadcrumb, eyebrow, status, summary, title }: PageHeaderProps) {
  return (
    <header className="max-w-4xl">
      {breadcrumb ? <Breadcrumb items={breadcrumb} /> : null}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {eyebrow ? <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{eyebrow}</p> : null}
        {status ? <Badge tone="accent">{status}</Badge> : null}
      </div>
      <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-6xl">{title}</h1>
      {summary ? <p className="mt-6 max-w-[var(--article-width)] text-lg leading-8 text-[var(--muted)] sm:text-xl">{summary}</p> : null}
    </header>
  );
}
