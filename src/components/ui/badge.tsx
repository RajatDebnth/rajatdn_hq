import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/styles";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: "neutral" | "accent" | "info" | "warning";
};

const toneStyles = {
  neutral: "border-[var(--line)] bg-[var(--surface-subtle)] text-[var(--muted)]",
  accent: "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]",
  info: "border-[var(--line-strong)] bg-[var(--info-soft)] text-[var(--foreground)]",
  warning: "border-[var(--line-strong)] bg-[var(--warning-soft)] text-[var(--foreground)]",
} as const;

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] border px-2 py-0.5 font-mono text-xs font-medium uppercase tracking-[0.08em]",
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  );
}
