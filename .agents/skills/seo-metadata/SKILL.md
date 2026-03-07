---
name: seo-metadata
description: Change SEO, metadata, or analytics. Use when working with JSON-LD, Open Graph, sitemap, robots, breadcrumbs, page metadata, or Google Tag Manager.
---

# SEO & metadata

Guidance for SEO, structured data, and metadata on the site.

## Metadata config

- **Root export**: [lib/config/metadata.ts](../../../lib/config/metadata.ts) — default title template (`%s | {name}`), description, keywords, author, openGraph, twitter, robots, etc. Uses [lib/config/personal](../../../lib/config/personal) and [lib/config/index.ts](../../../lib/config/index.ts) (e.g. `config.baseUrl`).
- **Usage**: Root layout and pages import and extend this metadata; blog and other routes use `generateMetadata` for dynamic titles/descriptions/OG.
- **Cache profiles**: [lib/cache.ts](../../../lib/cache.ts) — exports `CACHE_PROFILES` (`DEFAULT` = 300s, `ARTICLES` = 900s, `DYNAMIC` = 60s) and `CACHE_TAGS` (per integration). Use `getCacheConfig(profile, tags)` in fetch calls to align page freshness. Use `CACHE_TAGS.ARTICLE(slug)` for per-article cache invalidation.

## JSON-LD (structured data)

- **Schema builders**: [lib/seo/json-ld.ts](../../../lib/seo/json-ld.ts) — functions return `WithContext<Thing>` for:
  - `getPersonSchema()`, `getOrganizationSchema()`, `getWebSiteSchema()` — used in root layout.
  - `getProfilePageSchema()` — profile/home page.
  - `getBlogPostingSchema(frontmatter)` — article pages.
  - `getBreadcrumbSchema(items)` — breadcrumb list.
  - `getMusicPlaylistSchema(...)`, `getFAQPageSchema(...)`, `getSoftwareSourceCodeSchema(...)` — when needed.
- **Rendering**: [components/seo/json-ld-script.tsx](../../../components/seo/json-ld-script.tsx) — `<JsonLdScript data={schema} />` outputs a `<script type="application/ld+json">`. Use this instead of inlining JSON-LD.
- **Breadcrumbs**: [components/seo/breadcrumb-schema.tsx](../../../components/seo/breadcrumb-schema.tsx) — `<BreadcrumbSchema items={[{ name, href }]} />`; prepends "Home" if not first. Renders JSON-LD via `JsonLdScript`.
- **Exports**: [components/seo/index.tsx](../../../components/seo/index.tsx) — re-exports `BreadcrumbSchema`, `JsonLdScript`.

## Sitemap and robots

- **Sitemap**: [app/sitemap.ts](../../../app/sitemap.ts) — default export returns `MetadataRoute.Sitemap`. Includes `/`, `/blog`, `/blog/[slug]` (from `articles/`), `/open-source`, `/spotify`. Uses `config.baseUrl`; trailing slashes follow project config.
- **Robots**: [app/robots.ts](../../../app/robots.ts) — allow/disallow rules; references sitemap URL. Align with [lib/config/metadata.ts](../../../lib/config/metadata.ts) robot settings if needed.

## Open Graph and images

- **Default OG image**: [app/opengraph-image.tsx](../../../app/opengraph-image.tsx) — dynamic OG image (ImageResponse); uses personal avatar and metadata. Exports `alt`, `size`, `contentType`, `metadata`.
- **Blog OG**: [app/blog/[slug]/opengraph-image.tsx](../../../app/blog/[slug]/opengraph-image.tsx) — per-article OG image when present.
- **Share helpers**: [lib/seo/share-metadata.ts](../../../lib/seo/share-metadata.ts) — utilities for share URLs and metadata if used elsewhere.

## Trailing slashes and URLs

- The site uses trailing slashes. Build canonical and sitemap URLs with `config.baseUrl` and consistent path format (e.g. `/blog/`, `/blog/slug/`).

## Analytics (GTM)

- **Provider**: [components/providers/analytics-tracker.tsx](../../../components/providers/analytics-tracker.tsx) — loads GTM when `NEXT_PUBLIC_GTM_ID` is set. Root layout includes it; analytics are non-blocking (defer third-party per best practices).
- **Events**: [lib/analytics/events.ts](../../../lib/analytics/events.ts) and helpers in [lib/analytics/](../../../lib/analytics/) — use for tracking events if needed.

## Adding a new page or schema

1. **Page metadata**: Export `metadata` or `generateMetadata` from the page; use title template and description from [lib/config/metadata.ts](../../../lib/config/metadata.ts) where appropriate.
2. **JSON-LD**: Add or reuse a getter in [lib/seo/json-ld.ts](../../../lib/seo/json-ld.ts); render with `<JsonLdScript data={...} />` in the page or layout.
3. **Breadcrumbs**: Add `<BreadcrumbSchema items={[...]} />` with the page’s breadcrumb trail.
4. **Sitemap**: Add the URL to [app/sitemap.ts](../../../app/sitemap.ts) with the desired priority and changeFrequency.
