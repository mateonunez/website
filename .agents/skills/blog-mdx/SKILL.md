---
name: blog-mdx
description: Add or change MDX articles and blog behavior. Use when working with blog posts, MDX content, article frontmatter, related articles, reading time, article series, or blog routes and layouts.
---

# Blog & MDX

Guidance for the blog (MDX) feature on this site.

## Where articles live

- **Source**: `articles/` at project root (NOT under `app/`). Files are `.mdx`.
- **Routes**: `app/blog/` (list), `app/blog/[slug]/(page)/` (article page). Use `generateStaticParams` from `getArticleSlugs()` for static generation.

## Frontmatter and schema

- Types: [types/article.ts](../../../types/article.ts) — `Article`, `ArticleFrontmatter`, `ArticleAuthor`.
- Required frontmatter: `title`, `description`, `date`, `tags` (array), `image`. Optional: `categories`, `author`, `translated`.
- Reading time is computed in the parser via `reading-time` from raw file content; stored as `frontmatter.readingTime` (minutes, ceiling).

## Parser and data (server)

- **Parser**: [lib/articles/parser.ts](../../../lib/articles/parser.ts).
- All async getters are wrapped in `cache()` from React for per-request deduplication.
- Key functions:
  - `getArticleSlugs()` — list of slugs from `articles/` (`.mdx`/`.md`).
  - `getArticle({ slug })` — full article (content + frontmatter). Uses `getRawArticle` + `compile()` (next-mdx-remote/rsc with remark-gfm, rehype-slug).
  - `getAllArticles()` — all articles (calls `getArticle` per slug), sorted by date desc.
  - `getRelatedArticles(currentArticle)` — articles sharing tags with `currentArticle`, capped by `config.article.relatedArticles` (see [lib/config/index.ts](../../../lib/config/index.ts)).
  - `getLastArticle()` — first from `getAllArticles()`.
- `getArticle` uses [lib/config/personal](../../../lib/config/personal) for default author when not in frontmatter.
- Base URL and related-article count: [lib/config/index.ts](../../../lib/config/index.ts) (`config.baseUrl`, `config.article.relatedArticles`).

## Article series

- Config: [lib/config/article-series.ts](../../../lib/config/article-series.ts) — `articleSeries` map, `getArticleSeries(slug)`, `getSeriesOrder(slug, series?)`.
- Series define ordered lists of articles (title, slug, order). Used on the article page for series nav.

## MDX components

- Registry: [components/mdx/index.tsx](../../../components/mdx/index.tsx). Exports default `MDXComponents` (wrapper, headings, `a`, `img`, `pre`/`code`, Grid, Collapsible, etc.).
- Custom elements: [components/mdx/elements/](../../../components/mdx/elements/) (Heading, Link, Image, Code, Grid, Collapsible, etc.).
- Layout wrapper: [components/mdx/layout.tsx](../../../components/mdx/layout.tsx).

## Blog routes and boundaries

- List: [app/blog/page.tsx](../../app/blog/page.tsx) — uses Suspense and article list components.
- Article: [app/blog/[slug]/(page)/page.tsx](../../app/blog/[slug]/(page)/page.tsx) — async page; fetches `getArticle`, `getRelatedArticles`; uses Suspense; passes data to `ArticleLayout`.
- Metadata: `generateMetadata` in the same page uses `getArticle({ slug })` for title, description, OG, canonical.
- Layout: [app/blog/[slug]/(page)/layout.tsx](../../app/blog/[slug]/(page)/layout.tsx) — article layout wrapper.
- Error/loading: [app/blog/error.tsx](../../app/blog/error.tsx), [app/blog/loading.tsx](../../app/blog/loading.tsx), [app/blog/[slug]/loading.tsx](../../app/blog/[slug]/loading.tsx).
- Each route segment should have `error.tsx` and `loading.tsx` per project conventions.
- **Article layout**: [components/mate/article-layout.tsx](../../components/mate/article-layout.tsx) — wraps MDX content; includes title, metadata, series nav, and wires in `article-analytics` and `article-comments`.
- **Article preview**: [components/mate/article-preview.tsx](../../components/mate/article-preview.tsx) + [article-preview.skeleton.tsx](../../components/mate/article-preview.skeleton.tsx) — used in the blog list and related articles sections.
- **Article analytics/comments**: [components/mate/article-analytics.tsx](../../components/mate/article-analytics.tsx), [components/mate/article-comments.tsx](../../components/mate/article-comments.tsx) — rendered inside `ArticleLayout`; do not wire these manually in the page.

## Adding a new article

1. Add `articles/your-slug.mdx` with required frontmatter and body.
2. Optional: add to a series in [lib/config/article-series.ts](../../lib/config/article-series.ts).
3. Run build or dev; `generateStaticParams` will include the new slug.

## Important notes

- Do not put articles under `app/`; the parser reads from `articles/`.
- Use `cache()` for any new server-side article getters so they deduplicate within a request.
- For static params, use the same `getArticleSlugs()` (or equivalent) to keep one source of truth.
