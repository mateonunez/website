---
name: github-open-source
description: Work on Open Source / GitHub pages and API. Use when modifying GitHub profile, repositories, readme, last activities, open-source routes, or GitHub-related hooks and components.
---

# GitHub / Open Source integration

Guidance for the Open Source feature (GitHub API, routes, hooks, and UI).

## Server: client and cache

- **Client**: [lib/github.ts](../../../lib/github.ts) — `GitHubClient` class using `@octokit/graphql`. Config: `GITHUB_TOKEN`, username from [lib/config/personal](../../../lib/config/personal) (`personal.social.github`). Retries, timeout, and in-memory cache TTL (default 5 min).
- **Server-side dedup**: All public getters are wrapped in React `cache()`:
  - `getProfile()`, `getReadme()`, `getRepository(repository)`, `getLastActivities()`.

## API routes

- **Base path**: `app/api/open-source/`.
- **Routes**:
  - `GET /api/open-source/profile` — [app/api/open-source/profile/route.ts](../../../app/api/open-source/profile/route.ts). Returns GitHub profile.
  - `GET /api/open-source/last-activities` — [app/api/open-source/last-activities/route.ts](../../../app/api/open-source/last-activities/route.ts). Returns recent activity.
  - `GET /api/open-source/readme` — [app/api/open-source/readme/route.ts](../../../app/api/open-source/readme/route.ts). Returns readme content (e.g. for rendering).
  - `GET /api/open-source/repositories/[slug]` — [app/api/open-source/repositories/[slug]/route.ts](../../../app/api/open-source/repositories/[slug]/route.ts). Single repository by slug/name.
- **Convention**: Fetchers in hooks should throw on `!res.ok` where appropriate so SWR sets `isError`; profile route may return 200 with data or error payload — align hook fetcher with that.

## Client: hooks and SWR

- **Main hook**: [hooks/use-github.ts](../../../hooks/use-github.ts) — `useGithub()`. Uses SWR for:
  - `/api/open-source/profile` — refresh 10min; updates `setGithubProfile` in UIProvider.
  - `/api/open-source/last-activities` — refresh 5min; throws on `!res.ok`; updates `setLastActivities`.
- **Shared state**: [components/providers/ui-provider.tsx](../../../components/providers/ui-provider.tsx) — `githubProfile`, `lastActivities`, and setters. Use for components that show profile or activity without refetching.
- **Accessibility**: Dynamic content (e.g. activity) uses `aria-live="polite"` per project a11y standards.

## Pages and UI

- **Open Source page**: [app/open-source/page.tsx](../../../app/open-source/page.tsx) — uses Suspense with skeletons; sections: Featured Repositories, GitHub Community, Recent Activity.
- **Wrappers** (dynamic import with skeleton): [components/mate/open-source/repositories-showcase.wrapper.tsx](../../../components/mate/open-source/repositories-showcase.wrapper.tsx), [components/mate/open-source/last-activity.wrapper.tsx](../../../components/mate/open-source/last-activity.wrapper.tsx), [components/mate/open-source/github-community.wrapper.tsx](../../../components/mate/open-source/github-community.wrapper.tsx).
- **Projects page**: [app/open-source/projects/page.tsx](../../../app/open-source/projects/page.tsx) — list of projects; also uses Suspense and RepositoriesShowcase.
- **Skeletons**: [components/mate/open-source/repositories-showcase.skeleton.tsx](../../../components/mate/open-source/repositories-showcase.skeleton.tsx), [components/mate/open-source/last-activity.skeleton.tsx](../../../components/mate/open-source/last-activity.skeleton.tsx), [components/mate/open-source/github-community.skeleton.tsx](../../../components/mate/open-source/github-community.skeleton.tsx). Use matching skeletons in Suspense fallbacks.
- **Layout**: [app/open-source/layout.tsx](../../../app/open-source/layout.tsx). Error/loading: [app/open-source/error.tsx](../../../app/open-source/error.tsx), [app/open-source/loading.tsx](../../../app/open-source/loading.tsx).

## Types

- [types/github.ts](../../../types/github.ts) — GraphQL response types and API shapes.

## Adding a new endpoint or section

1. Add the method to `GitHubClient` in [lib/github.ts](../../../lib/github.ts) if it calls GitHub; wrap the public getter in `cache()`.
2. Add route under `app/api/open-source/`.
3. Add or reuse a hook with SWR; throw in fetcher on `!res.ok` for critical data and surface `isError` in UI. Use dynamic wrappers + skeletons for heavy sections.
