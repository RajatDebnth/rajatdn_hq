import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/styles";

type TextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  href: string;
};

const styles =
  "font-medium text-[var(--accent)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:text-[var(--accent-hover)] hover:decoration-current";

export function TextLink({ children, className, href, rel, target, ...props }: TextLinkProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link className={cn(styles, className)} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={cn(styles, className)}
      href={href}
      rel={target === "_blank" ? rel ?? "noreferrer" : rel}
      target={target}
      {...props}
    >
      {children}
    </a>
  );
}
