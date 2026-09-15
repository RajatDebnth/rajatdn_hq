import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/styles";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      className={cn(
        "border border-[var(--line)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--line-strong)] sm:p-6",
        className,
      )}
      {...props}
    />
  );
}
