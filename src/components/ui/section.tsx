import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/styles";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  spacing?: "compact" | "default" | "wide";
};

const spacingStyles = {
  compact: "py-10 sm:py-14",
  default: "py-16 sm:py-20",
  wide: "py-20 sm:py-28",
} as const;

export function Section({ children, className, spacing = "default", ...props }: SectionProps) {
  return (
    <section className={cn(spacingStyles[spacing], className)} {...props}>
      {children}
    </section>
  );
}
