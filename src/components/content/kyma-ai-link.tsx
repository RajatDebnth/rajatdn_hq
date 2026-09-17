import { Fragment } from "react";

const organizationName = "Kyma AI Innovations";
const organizationUrl = "https://kyma-ai.in/";

export function KymaAiLink({ className = "" }: { className?: string }) {
  return (
    <a className={className} href={organizationUrl} rel="noopener noreferrer" target="_blank">
      {organizationName}<span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function TextWithKymaAiLink({ children }: { children: string }) {
  const parts = children.split(organizationName);

  return <>{parts.map((part, index) => <Fragment key={`${part}-${index}`}>{index ? <KymaAiLink className="font-medium text-[var(--accent)] underline-offset-4 hover:underline" /> : null}{part}</Fragment>)}</>;
}
