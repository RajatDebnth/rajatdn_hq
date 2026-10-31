type CodeBlockProps = {
  code: string;
  filename?: string;
  language?: string;
};

export function CodeBlock({ code, filename, language }: CodeBlockProps) {
  return (
    <figure className="overflow-hidden rounded-xl border border-[var(--line)] bg-[#111512] text-[#edf1ed]">
      {filename ? (
        <figcaption className="border-b border-[#343c36] px-3 sm:px-4 py-2 font-mono text-xs text-[#aeb8b0]">{filename}</figcaption>
      ) : null}
      <pre className="overflow-x-auto p-3 sm:p-4 text-xs sm:text-sm leading-6 sm:leading-7" tabIndex={0}>
        <code data-language={language}>{code}</code>
      </pre>
    </figure>
  );
}
