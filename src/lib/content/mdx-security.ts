const blockedElements = new Set([
  "base", "embed", "form", "iframe", "link", "meta", "object", "script", "style", "svg",
]);

type MdxNode = {
  type: string;
  name?: string | null;
  url?: string;
  attributes?: readonly { name?: string; value?: string | object | null }[];
  children?: readonly MdxNode[];
};

function assertSafeUrl(value: string) {
  if (/^\s*(?:javascript|data|vbscript|http):/i.test(value) || value.trim().startsWith("//")) {
    throw new Error("MDX contains an unsafe URL scheme");
  }
}

function inspect(node: MdxNode): void {
  if (["mdxFlowExpression", "mdxTextExpression", "mdxjsEsm"].includes(node.type)) {
    throw new Error("MDX JavaScript expressions and imports are not allowed");
  }

  if (node.type === "link" || node.type === "image") assertSafeUrl(node.url ?? "");

  if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
    if (node.name && blockedElements.has(node.name.toLowerCase())) {
      throw new Error(`MDX element <${node.name}> is not allowed`);
    }

    for (const attribute of node.attributes ?? []) {
      if (!attribute.name || /^on[a-z]/i.test(attribute.name) || typeof attribute.value === "object") {
        throw new Error("MDX event handlers and dynamic attributes are not allowed");
      }
      if (["href", "src", "action", "poster"].includes(attribute.name.toLowerCase()) && typeof attribute.value === "string") {
        assertSafeUrl(attribute.value);
      }
    }
  }

  for (const child of node.children ?? []) inspect(child);
}

// Repository-authored MDX only; fail the build before unsafe markup reaches HTML.
export function rejectUnsafeMdx() {
  return (tree: unknown) => inspect(tree as MdxNode);
}
