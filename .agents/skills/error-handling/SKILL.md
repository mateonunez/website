---
name: error-handling
description: Add or fix error boundaries, loading states, and API error handling. Use when adding error.tsx, loading.tsx, global-error.tsx, or not-found.tsx to a route, fixing SWR error propagation, or handling API route failures.
---

# Error handling

Guidance for error boundaries, loading skeletons, and API error conventions in this Next.js site.

## Route-level error boundaries

By default, each route segment should have both `error.tsx` and `loading.tsx` where it makes sense.

### error.tsx

- Must be a `'use client'` component.
- Props: `error: Error & { digest?: string }` and `reset: () => void`.
- Show a user-friendly message, an optional `error.digest` (Error ID), a **Try again** button (`onClick={reset}`), and a **Go home** link.
- Use existing UI components: `Button` from `@/components/ui/button`, `Link` from `next/link`.
- Icons: `RefreshCw` (retry) and `Home` (home link) from `lucide-react`.
- Reference implementation: [app/error.tsx](../../../app/error.tsx), [app/blog/error.tsx](../../../app/blog/error.tsx), [app/open-source/error.tsx](../../../app/open-source/error.tsx).

```tsx
'use client';
import { Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MyError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-5xl font-bold text-destructive sm:text-6xl">Oops</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Something went wrong</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">...</p>
      {error.digest && <p className="mt-2 text-xs text-muted-foreground/60">Error ID: {error.digest}</p>}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="default" onClick={reset}><RefreshCw className="h-4 w-4" />Try again</Button>
        <Button variant="outline" asChild><Link href="/"><Home className="h-4 w-4" />Go home</Link></Button>
      </div>
    </div>
  );
}
```

### loading.tsx

- Server component (no `'use client'`).
- Use `animate-pulse` and `bg-primary/10` for skeleton shapes that match the actual page layout.
- Reference implementation: [app/blog/loading.tsx](../../../app/blog/loading.tsx), [app/open-source/loading.tsx](../../../app/open-source/loading.tsx).

```tsx
export default function MyLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 w-48 animate-pulse rounded-md bg-primary/10" />
      <div className="mt-4 h-4 w-64 animate-pulse rounded-md bg-primary/10" />
    </div>
  );
}
```

## Root-level error files

- **[app/global-error.tsx](../../../app/global-error.tsx)** — catches failures in the root layout itself. Must render its own `<html>` and `<body>`. Use **inline styles only** — no component imports (the layout may be broken). `'use client'` required.
- **[app/not-found.tsx](../../../app/not-found.tsx)** — custom 404 page. `'use client'` (uses `useRouter`). Shows navigation options: Go home, Go back (`router.back()`), Browse articles. Uses `Button` + `Link`.

## SWR / client-side error conventions

- Fetcher functions **must throw** on non-ok responses so SWR sets `isError`:
  ```ts
  const res = await fetch('/api/...');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
  ```
- Propagate `isError` from hooks to components.
- Display a user-friendly error state using `AlertCircle` from `lucide-react`.

## API route error conventions

- Return **200 with a fallback/empty body** (`BadResponse`) when the route must always succeed (e.g., `currently-listening` — the player should render even when Spotify is unavailable).
- Return **503** for "service unavailable" when the client should be aware the integration is down.
- Never let API routes throw unhandled — always return a safe response.

## Existing route error files

| File | Purpose |
|---|---|
| [app/error.tsx](../../../app/error.tsx) | Root route error boundary |
| [app/global-error.tsx](../../../app/global-error.tsx) | Root layout fallback (inline styles, own html/body) |
| [app/not-found.tsx](../../../app/not-found.tsx) | Custom 404 |
| [app/blog/error.tsx](../../../app/blog/error.tsx) | Blog list error |
| [app/blog/loading.tsx](../../../app/blog/loading.tsx) | Blog list skeleton |
| [app/blog/[slug]/loading.tsx](../../../app/blog/[slug]/loading.tsx) | Article page skeleton |
| [app/open-source/error.tsx](../../../app/open-source/error.tsx) | Open source error |
| [app/open-source/loading.tsx](../../../app/open-source/loading.tsx) | Open source skeleton |

## Adding error/loading to a new route

1. Create `app/your-route/error.tsx` as a `'use client'` component following the pattern above. Customize the description text.
2. Create `app/your-route/loading.tsx` as a server component with skeleton shapes matching the page layout (`animate-pulse bg-primary/10`).
3. If the route has nested segments (e.g., `[slug]`), add `error.tsx` and `loading.tsx` to each segment directory that can fail independently.
4. For SWR hooks used in the route, ensure fetchers throw on `!res.ok` and the component renders an `AlertCircle` error state when `isError` is true.
