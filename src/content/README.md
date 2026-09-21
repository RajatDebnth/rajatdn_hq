# Content source boundary

Author-controlled content belongs in this directory, separated by content type:

- `blog/` — technical articles
- `resume/` — verified professional experience and education used by the Experiences page

Presentation components must remain under `src/components`. Content discovery, parsing, and validation must remain under `src/lib/content`. Shared metadata contracts belong under `src/types`.

The blog uses a drop-folder workflow documented in `blog/BLOG_STRUCTURE.md`. Finished `.md` or `.mdx` files belong in `blog/published/`; unfinished files belong in `blog/drafts/` and are never loaded by the website. The loader validates published frontmatter at build time, rejects duplicate slugs, and limits articles to a calculated five-minute reading time.

Blog frontmatter requires only `title`, `description`, `date` (YYYY-MM-DD), `category`, and `tags` (a list). The slug comes from the filename, the author defaults to `Rajat Debnath`, published status comes from the folder, and reading time is calculated automatically. Optional fields: `updatedDate`, `featured`, `image` (`src`, `alt`, `width`, `height`), `readingTime`, `canonicalUrl` (HTTPS), `seoTitle`, `seoDescription`, and `faq` (question/answer pairs).

Reusable MDX components: `Callout`, `CodeBlock`, `DataTable`, `ArchitectureFlow`, `TechnicalFlowDiagram`, `ArchitectureBlock`, and `CaptionedImage`. The renderer rejects JavaScript expressions/imports and unsafe active markup at build time. Author-controlled local MDX remains a reviewed source boundary; never compile remotely submitted MDX or paste private data into content.
