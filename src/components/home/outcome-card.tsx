import { Card } from "@/components/ui/card";

type OutcomeCardProps = {
  description: string;
  index: number;
  title: string;
};

export function OutcomeCard({ description, index, title }: OutcomeCardProps) {
  return (
    <Card className="group flex min-h-56 flex-col justify-between">
      <span className="font-mono text-xs text-[var(--muted)]">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <h3 className="text-xl font-semibold tracking-tight group-hover:text-[var(--accent)]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{description}</p>
      </div>
    </Card>
  );
}
