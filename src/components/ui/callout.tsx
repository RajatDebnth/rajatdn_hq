import type { ReactNode } from "react";

import { cn } from "@/lib/styles";

type CalloutProps = {
  children: ReactNode;
  title: string;
  tone?: "note" | "warning" | "important";
};

const toneStyles = {
  note: "border-[var(--accent)] bg-[var(--accent-soft)]",
  warning: "border-amber-700 bg-[var(--warning-soft)]",
  important: "border-red-800 bg-[var(--danger-soft)]",
} as const;

export function Callout({ children, title, tone = "note" }: CalloutProps) {
  return (
    <aside className={cn("border-l-4 p-5", toneStyles[tone])}>
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em]">{title}</p>
      <div className="mt-2 text-sm leading-7 text-[var(--muted)]">{children}</div>
    </aside>
  );
}
