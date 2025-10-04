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
- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Production build
- `pnpm build:analyze` - Build with bundle analyzer (sets ANALYZE=true)
- `pnpm start` - Start production server

### Code Quality
- `pnpm lint` - Run Biome linter, formatter, and checks
- `pnpm lint:fix` - Auto-fix linting issues with Biome (includes --unsafe flag)

### Other
- `pnpm generate:webmanifest` - Generate web manifest (runs automatically in prebuild)

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

**Data Fetching**: Uses SWR for client-side data fetching (especially for Spotify data). Server components fetch data directly in route handlers.

**SEO**: Trailing slashes are enabled. The site includes structured data, OpenGraph tags, and sitemap generation (see `app/sitemap.ts`).

## Code Style

This project uses **Biome** (not ESLint/Prettier):
- 2 spaces indentation
- Single quotes for JS, double quotes for JSX
- Semicolons required
- 120 character line width
- Never use `npm run lint` or similar - use `pnpm lint` or `pnpm lint:fix`

## Important Notes

- **React Compiler is enabled**: Be aware that React 19 compiler is active (`experimental.reactCompiler: true`)
- **MDX configuration**: MDX files use `remarkGfm` and `rehypeSlug` plugins (configured in both next.config.ts and article parser)
- **Security headers**: Strict CSP and security headers are configured in next.config.ts
- **Image optimization**: Next.js image optimization is configured for Spotify CDN and GitHub assets
- **Standalone output**: The build outputs a standalone bundle for containerization
- **TypeScript strict mode is disabled**: Be mindful when adding new code
- **Husky git hooks**: Pre-commit hooks are configured (see `.husky/`)

## Testing

This project does not currently have a test suite configured.
