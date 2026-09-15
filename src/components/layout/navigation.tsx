import Link from "next/link";

import type { NavigationItem } from "@/types/navigation";

type NavigationProps = {
  items: readonly NavigationItem[];
  label?: string;
};

export function Navigation({ items, label = "Primary navigation" }: NavigationProps) {
  return (
    <nav aria-label={label}>
      <ul className="flex items-center gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)]" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
