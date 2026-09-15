"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import type { NavigationItem } from "@/types/navigation";

type MobileNavigationProps = {
  items: readonly NavigationItem[];
};

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="relative lg:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        className="inline-flex min-h-11 items-center border border-[var(--control-line)] px-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] hover:bg-[var(--surface-subtle)]"
        onClick={() => setOpen((current) => !current)}
        ref={buttonRef}
        type="button"
      >
        {open ? "Close" : "Menu"}
      </button>
        <nav
          aria-label="Mobile navigation"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-40 max-h-[calc(100dvh-6rem)] min-w-56 overflow-y-auto border border-[var(--line-strong)] bg-[var(--surface)] p-2 shadow-[0_12px_32px_rgba(0,0,0,0.14)]"
          hidden={!open}
          id="mobile-navigation"
        >
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <Link className="block px-4 py-3 font-medium hover:bg-[var(--surface-subtle)]" href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
    </div>
  );
}
