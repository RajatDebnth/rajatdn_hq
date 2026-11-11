import type { ComponentPropsWithoutRef, ReactNode } from "react";

type DataTableProps = ComponentPropsWithoutRef<"table"> & {
  caption?: ReactNode;
};

export function DataTable({ caption, children, className = "", ...props }: DataTableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded border border-[var(--line)]" tabIndex={0}>
      <table className={`w-full min-w-full border-collapse text-left text-xs sm:text-sm leading-5 sm:leading-6 ${className}`.trim()} {...props}>
        {caption ? <caption className="border-b border-[var(--line)] bg-[var(--surface-subtle)] px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold">{caption}</caption> : null}
        {children}
      </table>
    </div>
  );
}
