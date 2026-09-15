import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type PlaceholderCardProps = {
  description: string;
  label: string;
  title: string;
};

export function PlaceholderCard({ description, label, title }: PlaceholderCardProps) {
  return (
    <Card className="flex min-h-60 flex-col">
      <Badge className="self-start">Placeholder</Badge>
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
        {label}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{description}</p>
    </Card>
  );
}
