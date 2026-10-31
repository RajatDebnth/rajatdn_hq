<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> RSS Feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          :root {
            --bg: #fafafa;
            --surface: #ffffff;
            --surface-subtle: #f4f4f5;
            --fg: #09090b;
            --muted: #71717a;
            --border: #e4e4e7;
            --border-strong: #a1a1aa;
            --accent: #d97706;
            --link: #09090b;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #09090b;
              --surface: #121214;
              --surface-subtle: #18181b;
              --fg: #fafafa;
              --muted: #a1a1aa;
              --border: #27272a;
              --border-strong: #3f3f46;
              --accent: #f59e0b;
              --link: #fafafa;
            }
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: var(--bg);
            color: var(--fg);
            line-height: 1.6;
            padding: 2.5rem 1rem 4rem;
          }
          .container {
            max-width: 680px;
            margin: 0 auto;
          }
          .back-link {
            display: inline-block;
            font-size: 0.8125rem;
            color: var(--muted);
            text-decoration: underline;
            text-underline-offset: 4px;
            margin-bottom: 2rem;
          }
          .back-link:hover {
            color: var(--fg);
          }
          .card {
            background-color: var(--surface);
            border: 1px solid var(--border);
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 2.5rem;
            box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          }
          .feed-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
          }
          .feed-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            border-radius: 0.5rem;
            background: var(--surface-subtle);
            border: 1px solid var(--border);
            color: var(--accent);
          }
          .feed-title {
            font-size: 1.125rem;
            font-weight: 700;
            letter-spacing: -0.01em;
          }
          .feed-desc {
            font-size: 0.875rem;
            color: var(--muted);
            line-height: 1.5;
            margin-bottom: 1rem;
          }
          .url-box {
            display: flex;
            align-items: center;
            background: var(--surface-subtle);
            border: 1px solid var(--border);
            border-radius: 0.5rem;
            padding: 0.5rem 0.75rem;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.75rem;
            color: var(--muted);
            word-break: break-all;
          }
          .section-title {
            font-size: 0.75rem;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--muted);
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border);
          }
          .article-list {
            list-style: none;
          }
          .article-item {
            padding: 1.25rem 0;
            border-bottom: 1px solid var(--border);
          }
          .article-item:first-child {
            padding-top: 0.5rem;
          }
          .article-item:last-child {
            border-bottom: none;
          }
          .article-title {
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.4;
            margin-bottom: 0.35rem;
          }
          .article-title a {
            color: var(--link);
            text-decoration: underline;
            text-underline-offset: 4px;
            transition: color 0.15s ease;
          }
          .article-title a:hover {
            color: var(--accent);
          }
          .article-meta {
            font-size: 0.75rem;
            color: var(--muted);
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
          }
          .article-desc {
            font-size: 0.875rem;
            color: var(--muted);
            line-height: 1.55;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <a class="back-link" href="/blog">&#8592; Back to Technical Blog</a>

          <div class="card">
            <div class="feed-header">
              <span class="feed-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" fill="currentColor" />
                </svg>
              </span>
              <h1 class="feed-title"><xsl:value-of select="/rss/channel/title"/></h1>
            </div>
            <p class="feed-desc">
              This is an RSS web feed for Rajat Debnath&apos;s technical blog. You can subscribe by pasting the feed link below into any modern RSS feed reader (such as Feedly, Inoreader, NetNewsWire, or Readwise Reader).
            </p>
            <div class="url-box">
              <xsl:value-of select="/rss/channel/link"/>/rss.xml
            </div>
          </div>

          <h2 class="section-title">Latest Articles (<xsl:value-of select="count(/rss/channel/item)"/> published)</h2>

          <ul class="article-list">
            <xsl:for-each select="/rss/channel/item">
              <li class="article-item">
                <h3 class="article-title">
                  <a href="{link}">
                    <xsl:value-of select="title"/>
                  </a>
                </h3>
                <div class="article-meta">
                  <span><xsl:value-of select="substring(pubDate, 1, 16)"/></span>
                  <xsl:if test="category">
                    <span>&#8226;</span>
                    <span><xsl:value-of select="category[1]"/></span>
                  </xsl:if>
                </div>
                <p class="article-desc">
                  <xsl:value-of select="description"/>
                </p>
              </li>
            </xsl:for-each>
          </ul>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
