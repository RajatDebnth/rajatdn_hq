import type { ComponentPropsWithoutRef, ReactNode } from "react";

type DataTableProps = ComponentPropsWithoutRef<"table"> & {
  caption?: ReactNode;
};

export function DataTable({ caption, children, className = "", ...props }: DataTableProps) {
  return (
    <div className="overflow-x-auto border border-[var(--line)]" tabIndex={0}>
      <table className={`w-full min-w-[36rem] border-collapse text-left text-sm ${className}`.trim()} {...props}>
        {caption ? <caption className="border-b border-[var(--line)] bg-[var(--surface-subtle)] px-4 py-3 text-left font-semibold">{caption}</caption> : null}
        {children}
      </table>
    </div>
  );
}
