"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "My Works", href: "/works" },
  { label: "Blogs", href: "/blog" },
  { label: "Experiences", href: "/experiences" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation">
      <ul className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[0.6875rem] sm:text-xs md:text-sm font-medium">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (Boolean(pathname) && pathname.startsWith(`${item.href}/`));

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-block rounded-full px-2 py-1 sm:px-3 transition-colors whitespace-nowrap ${
                  isActive
                    ? "font-semibold text-[var(--foreground)] bg-[var(--surface-subtle)] border border-[var(--line)] shadow-2xs"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]/50"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
