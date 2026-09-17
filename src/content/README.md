# Content source boundary

Author-controlled content belongs in this directory, separated by content type:

- `blog/` — technical articles
- `projects/` — engineering case studies
- `architecture/` — architecture notes
- `lab/` — experiments with explicit lifecycle status
- `pages/` — long-form site-page content when MDX is appropriate

Presentation components must remain under `src/components`. Content discovery, parsing, and validation must remain under `src/lib/content`. Shared metadata contracts belong under `src/types`.

The blog loader reads trusted local `.md` and `.mdx` files from `src/content/blog`, validates frontmatter at build time, rejects duplicate slugs, and excludes drafts from routes, RSS, and sitemap. The blog currently has one published technical article and one unpublished format sample. Do not change the sample's `draft: true` until its content has been reviewed as a real technical article.

Blog frontmatter requires `title`, `slug`, `description`, `date` (YYYY-MM-DD), `author` (`Rajat Debnath`), `category`, `tags` (a list), and explicit `draft` boolean. Optional fields: `updatedDate`, `featured`, `image` (`src`, `alt`, `width`, `height`), `readingTime`, `canonicalUrl` (HTTPS), `seoTitle`, `seoDescription`, and `faq` (question/answer pairs). `readingTime` is calculated from content when omitted. Use plain-text level-two and level-three Markdown headings for a matching table of contents.

Reusable MDX components: `Callout`, `CodeBlock`, `DataTable`, `ArchitectureFlow`, `TechnicalFlowDiagram`, `ArchitectureBlock`, `CaptionedImage`, and `RelatedProjectLink`. Related project slugs must already exist in the project collection. The renderer rejects JavaScript expressions/imports and unsafe active markup at build time. Author-controlled local MDX remains a reviewed source boundary; never compile remotely submitted MDX or paste private data into content.
