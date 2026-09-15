import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/styles";

type ButtonVariant = "primary" | "secondary" | "quiet";
type ButtonSize = "sm" | "md";

const baseStyles =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border px-4 font-semibold no-underline transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variantStyles = {
  primary:
    "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)] hover:border-[var(--accent-hover)] hover:bg-[var(--accent-hover)]",
  secondary:
    "border-[var(--control-line)] bg-transparent text-[var(--foreground)] hover:border-[var(--foreground)] hover:bg-[var(--surface-subtle)]",
  quiet:
    "border-transparent bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-subtle)]",
} as const;

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
} as const;

function buttonStyles(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ className, size = "md", type = "button", variant = "primary", ...props }: ButtonProps) {
  return <button className={buttonStyles(variant, size, className)} type={type} {...props} />;
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({ className, size = "md", variant = "primary", ...props }: ButtonLinkProps) {
  return <Link className={buttonStyles(variant, size, className)} {...props} />;
}
