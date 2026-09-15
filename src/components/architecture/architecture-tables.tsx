import { DataTable } from "@/components/content/data-table";
import type { ArchitectureComponent, ArchitectureFailureMode, ArchitectureTradeoff } from "@/types/content";

const cell = "border-b border-[var(--line)] px-4 py-3 align-top leading-6";
const heading = `${cell} bg-[var(--surface-subtle)] font-semibold`;

export function ComponentTable({ components }: { components: readonly ArchitectureComponent[] }) {
  return <DataTable caption="Architecture components and responsibilities"><thead><tr><th className={heading} scope="col">Component</th><th className={heading} scope="col">Responsibility</th></tr></thead><tbody>{components.map((item) => <tr key={item.name}><th className={cell} scope="row">{item.name}</th><td className={`${cell} text-[var(--muted)]`}>{item.responsibility}</td></tr>)}</tbody></DataTable>;
}

export function TradeoffTable({ tradeoffs }: { tradeoffs: readonly ArchitectureTradeoff[] }) {
  return <DataTable caption="Architecture decisions and trade-offs"><thead><tr><th className={heading} scope="col">Decision</th><th className={heading} scope="col">Benefit</th><th className={heading} scope="col">Cost / constraint</th></tr></thead><tbody>{tradeoffs.map((item) => <tr key={item.decision}><th className={cell} scope="row">{item.decision}</th><td className={`${cell} text-[var(--muted)]`}>{item.benefit}</td><td className={`${cell} text-[var(--muted)]`}>{item.cost}</td></tr>)}</tbody></DataTable>;
}

export function FailureModeTable({ failureModes }: { failureModes: readonly ArchitectureFailureMode[] }) {
  return <DataTable caption="Failure modes and response considerations"><thead><tr><th className={heading} scope="col">Failure mode</th><th className={heading} scope="col">Potential impact</th><th className={heading} scope="col">Design response</th></tr></thead><tbody>{failureModes.map((item) => <tr key={item.failure}><th className={cell} scope="row">{item.failure}</th><td className={`${cell} text-[var(--muted)]`}>{item.impact}</td><td className={`${cell} text-[var(--muted)]`}>{item.response}</td></tr>)}</tbody></DataTable>;
}
