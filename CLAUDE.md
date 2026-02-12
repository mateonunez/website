# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Next.js 15 (App Router), featuring a blog with MDX articles, Spotify integration, GitHub integration, and a component-based UI architecture. The site uses React 19 with the React Compiler enabled.

## Package Manager

**IMPORTANT**: This project uses `pnpm` as the package manager. Always use `pnpm` commands, never `npm` or `yarn`.

Before starting, enable corepack:
```bash
corepack enable
```

## Common Commands

### Development
- `pnpm dev` - Start development server at http://localhost:3000 (uses Turbopack)
- `pnpm build` - Production build
- `pnpm build:analyze` - Build with bundle analyzer (sets ANALYZE=true)
- `pnpm start` - Start production server

### Code Quality
- `pnpm lint` - Run Biome linter, formatter, and checks (runs all three: lint + format + check)
- `pnpm lint:fix` - Auto-fix linting issues with Biome (includes --unsafe flag, runs all three with --write)

### Other
- `pnpm generate:webmanifest` - Generate web manifest (runs automatically in prebuild)
- `pnpm prepare` - Sets up Husky git hooks (runs automatically after install)

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:
- `NEXT_PUBLIC_BASE_URL` - Base URL for the site
- Spotify API credentials (CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, REDIRECT_URI)
- `GITHUB_TOKEN` - For GitHub API integration
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID (optional)

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages and layouts
  - `api/` - API routes (Spotify, GitHub, RSS, webhooks)
  - `blog/` - Blog listing and article pages
  - `open-source/` - Open source projects showcase
  - `spotify/` - Spotify-related pages
- `articles/` - MDX article files (NOT in app directory)
- `components/` - React components organized by domain
  - `mate/` - Custom components specific to this site
  - `ui/` - Reusable UI components (shadcn/ui style)
  - `mdx/` - MDX-specific components
  - `providers/` - React context providers
  - `seo/` - SEO-related components
- `hooks/` - Custom React hooks (use-github, use-spotify-*, use-animations, etc.)
- `lib/` - Business logic and utilities
  - `articles/` - Article parsing and fetching (parser.ts, fetcher.ts)
  - `config/` - Configuration files (personal, social, metadata, etc.)
  - `github.ts` - GitHub API integration
  - `spotify.ts` - Spotify API integration
  - `seo/` - SEO utilities
  - `utils/` - General utilities
- `types/` - TypeScript type definitions
- `public/` - Static assets
- `scripts/` - Build and utility scripts
- `styles/` - Global styles

### Key Architectural Patterns

**MDX Article System**: Articles are stored as `.mdx` files in the `articles/` directory (not in the app router). The system uses `next-mdx-remote` for compilation with frontmatter parsing. Articles are compiled server-side with remark-gfm and rehype-slug plugins. Reading time is calculated automatically. Article metadata includes title, description, date, tags, categories, author info, and more.

**API Integrations**:
- Spotify API uses OAuth refresh token flow (see `lib/spotify.ts`)
- GitHub API uses personal access token (see `lib/github.ts`)
- API routes are in `app/api/` and use Next.js Route Handlers

**Component Organization**: Components follow a domain-driven structure. The `mate/` folder contains site-specific components, while `ui/` contains generic reusable components. MDX components are registered in `components/mdx/`.

**Path Aliases**: Use `@/` to reference the root directory (configured in tsconfig.json).

**Styling**: Uses Tailwind CSS v4 with custom configuration. The `tailwind-merge` utility (via `clsx`) is used for conditional classes. Components use `class-variance-authority` for variant-based styling.

**Data Fetching**: Uses SWR for client-side data fetching (especially for Spotify data with polling intervals - 20s for currently-listening, 10min for recently-played). Server components fetch data directly. Article fetching functions use React's `cache()` wrapper for deduplication.

**State Management**: Uses a custom `UIProvider` context (in `components/providers/ui-provider.tsx`) to manage shared UI state like Spotify listening status. Cookie-based state persistence is handled via utilities in `lib/utils/cookies/` (theme, terminal visited state, GitHub star banner dismissal).

**SEO**: Trailing slashes are enabled. The site includes structured data (Person, Organization, WebSite schemas), OpenGraph tags, and sitemap generation (see `app/sitemap.ts`). BreadcrumbSchema component generates breadcrumb JSON-LD.

## Code Style

This project uses **Biome** (not ESLint/Prettier):
- 2 spaces indentation
- Single quotes for JS, double quotes for JSX
- Semicolons required
- 120 character line width
- Never use `npm run lint` or similar - use `pnpm lint` or `pnpm lint:fix`
- Import organization is automated (organizeImports: "on")
- Several rules are disabled: exhaustive dependencies, array index keys, noExplicitAny, noProcessEnv
- Use `biome-ignore` comments when necessary (see examples in carousel.tsx and terminal.tsx for a11y exceptions)

## Important Notes

- **React Compiler is enabled**: Be aware that React 19 compiler is active (`reactCompiler: true` in next.config.ts)
- **Cache configuration**: Custom `cacheLife` profiles defined for different content types (default, articles, dynamic) with varying stale/revalidate/expire times
- **Performance optimizations**:
  - Package imports optimized for lucide-react, date-fns, framer-motion
  - Inline CSS enabled (`experimental.inlineCss`)
  - Dynamic imports used for heavy components (Terminal, PlaylistsCarousel)
- **MDX configuration**: MDX files use `remarkGfm` and `rehypeSlug` plugins (configured in both next.config.ts and article parser)
- **Security headers**: Strict CSP and security headers are configured in next.config.ts (X-XSS-Protection, X-Content-Type-Options, HSTS, etc.)
- **Image optimization**:
  - Next.js image optimization configured for Spotify CDN and GitHub assets
  - AVIF and WebP formats enabled
  - 24-hour minimum cache TTL
  - Long cache headers on static assets (1 year immutable)
- **Standalone output**: The build outputs a standalone bundle for containerization
- **TypeScript strict mode is disabled**: Be mindful when adding new code
- **Husky git hooks**: Pre-commit hooks are configured (see `.husky/`)

## Git & Commit Conventions

This project follows **Conventional Commits** with atomic, focused commits:

### Commit Format
```
<type>(<scope>): <short description>

<optional body with details>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### Types
- `feat:` — New feature or capability (e.g., error boundaries, loading states)
- `fix:` — Bug fix or correction (e.g., heading hierarchy, error propagation)
- `fix(a11y):` — Accessibility fix
- `fix(seo):` — SEO/metadata fix
- `refactor:` — Code restructuring without behavior change
- `chore:` — Maintenance tasks (dependencies, config, gitignore)

### Scopes
Common scopes: `a11y`, `seo`, `spotify`, `blog`, `ui`, `dependencies`, `agents`

### Atomic Commits
Group changes by **concern**, not by file. Each commit should be:
- **Self-contained**: one logical change per commit
- **Buildable**: the project should lint/build after each commit
- **Reviewable**: a reviewer can understand the "why" from the message

Example grouping:
- All accessibility changes in one commit (skip link + aria-live + focus-visible + reduced-motion)
- All error boundary files in one commit (even across routes)
- SEO fixes grouped together (heading hierarchy + OG images + RSS link)
- Component cleanups grouped separately from feature changes

### Branch Naming
Use `<type>/<short-description>` format: `fix/website-analysis-improvements`, `feat/add-search`, `chore/bump-dependencies`

## Accessibility Standards

This project follows WCAG 2.1 AA guidelines:

- **Skip navigation**: Root layout includes a skip-to-main-content link targeting `#main-content`
- **Heading hierarchy**: Each page must have exactly one `<h1>`. Use the `asHeading` prop on `PageHeader` for page-level headers; use `<h2>` and below for sections
- **Focus management**: Use `focus-visible` (not `focus`) for keyboard-only outline styles in global CSS
- **Reduced motion**: Global `prefers-reduced-motion: reduce` media query disables animations. Framer Motion is wrapped with `<MotionConfig reducedMotion="user">` in the theme provider
- **Live regions**: Dynamic content (Spotify player, recently-played tracks, open-source activity) uses `aria-live="polite"` for screen reader announcements
- **Screen reader text**: Use `sr-only` class for visually hidden but accessible content (e.g., track announcements in Spotify player)

## Error Handling Patterns

### Route-Level Error Boundaries
Every route segment should have:
- `error.tsx` — Client component with retry button and home link. Uses existing UI components (`Button`, `Link`). Shows `error.digest` when available.
- `loading.tsx` — Server component with skeleton placeholders using `animate-pulse` and `bg-primary/10`. Match the layout shape of the actual page content.

The root also has:
- `global-error.tsx` — Fallback when root layout itself fails. Uses inline styles only (no component imports, since the layout may be broken). Must render its own `<html>` and `<body>`.
- `not-found.tsx` — Custom 404 with navigation options (home, back, browse articles).

### API/Data Fetching Errors
- SWR fetchers must throw on non-ok responses (`if (!res.ok) throw new Error(...)`)
- Propagate `isError` from hooks to components
- Display user-friendly error states (icon + message) instead of silently failing
- Use `AlertCircle` icon from lucide-react for error indicators

## UI & Styling Patterns

### CSS Design Tokens
Sidebar and component variables in `styles/global.css` should reference design token variables (e.g., `var(--primary)`, `var(--border)`) rather than hardcoded HSL values. This ensures consistency across light/dark modes.

### Light Mode Contrast
Use `amber-600` (not `amber-500`) for primary color in light mode to meet contrast requirements. Dark mode keeps `amber-400`.

### SSR Considerations
- Avoid unnecessary `mounted` state guards and `ssr: false` on dynamic imports when the component can safely render server-side
- Only use `ssr: false` when the component genuinely depends on browser-only APIs (e.g., `window`, `localStorage` on first render)
- Prefer showing a loading skeleton via `loading: () => <Skeleton />` on dynamic imports

## Testing

This project does not currently have a test suite configured.
