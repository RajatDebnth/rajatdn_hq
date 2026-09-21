# How to publish a blog

You do not need to edit website code.

## Publishing steps

1. Copy the template at the bottom of this file into a new text file.
2. Replace the example text with the new article.
3. Save the file with a short lowercase name using hyphens, for example:

   `how-rag-helps-customer-support.md`

4. Put the finished file in:

   `src/content/blog/published/`

5. From the project folder, run:

   ```powershell
   git add .
   git commit -m "Add blog: your article title"
   git push
   ```

Vercel will rebuild the site. The article will automatically appear on the homepage, Blogs page, RSS feed, sitemap, and its own URL.

## Important writing rules

- Keep the article below 1,100 words so it remains a five-minute read.
- Use a unique filename. Do not overwrite another article.
- Use the date format `YYYY-MM-DD`, for example `2026-09-21`.
- Keep the opening direct: explain what the reader will understand.
- Prefer practical sections such as What, Why, How, Business use, Behind the scenes, Lessons, or Takeaway.
- Do not include unsupported results, client names, metrics, testimonials, or deployment claims.
- Do not change the lines containing `---`.
- Use normal straight quotation marks (`"`), not styled quotation marks.
- Run `npm run build` before pushing. If information is missing or incorrectly formatted, the build will explain what must be fixed.

## Drafts

Place unfinished articles in `src/content/blog/drafts/`. Files in that folder never appear on the website.

When an article is ready, move it from `drafts/` to `published/`, then commit and push it.

## Copy this template

```md
---
title: "Write the article title here"
description: "In one sentence, explain exactly what the reader will learn."
date: "2026-09-21"
category: "AI Automation"
tags:
  - "AI"
  - "Automation"
featured: false
---

Open with the problem or question. Tell the reader what they will understand by the end of the article.

## What is it?

Explain the idea in plain language. Define technical terms when they first appear.

## Why does it matter?

Explain the business problem, cost, risk, or opportunity connected to the topic.

## How does it work?

Break the system or process into a few clear steps. Use short paragraphs or a bullet list.

## Business application

Explain where a business could use this idea, what it would need, and what limitations it should consider.

## Key takeaway

End with the one point the reader should remember or the next question the business should ask.
```

## What the website creates automatically

The website automatically generates the URL from the filename, sets the author to Rajat Debnath, calculates reading time, creates SEO and social metadata, adds the article to RSS and the sitemap, and connects related articles by category and tags.
