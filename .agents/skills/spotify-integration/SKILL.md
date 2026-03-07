---
name: spotify-integration
description: Work on Spotify API, API routes, or Spotify UI. Use when modifying Spotify playback, playlists, profile, top artists/tracks, token refresh, normalization, or Spotify-related hooks and components.
---

# Spotify integration

Guidance for the Spotify feature (API, routes, hooks, and UI).

## Server: client and cache

- **Client**: [lib/spotify.ts](../../../lib/spotify.ts) — `SpotifyClient` class (token refresh, retries, timeout, in-memory cache). Uses env: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`.
- **OAuth**: Refresh-token flow only; no user login on the site. Token is refreshed in `getAccessToken()` when expired.
- **Server-side dedup**: All public getters are wrapped in React `cache()` so the same request deduplicates within one RSC request:
  - `getCurrentlyListening`, `getRecentlyPlayed`, `getTopArtists`, `getTopTracks`, `getUserProfile`, `getUserPlaylists`, `getUserPublicPlaylists(userId, limit, offset)`.

## API routes

- **Base path**: `app/api/spotify/`.
- **Routes**:
  - `GET /api/spotify/currently-listening` — [app/api/spotify/currently-listening/route.ts](../../../app/api/spotify/currently-listening/route.ts). Returns normalized now-playing or `BadResponse` (200). Uses `trackApiUsage`. `dynamic = 'force-dynamic'`, `revalidate = 0`.
  - `GET /api/spotify/recently-played` — [app/api/spotify/recently-played/route.ts](../../../app/api/spotify/recently-played/route.ts).
  - `GET /api/spotify/profile` — [app/api/spotify/profile/route.ts](../../../app/api/spotify/profile/route.ts).
  - `GET /api/spotify/playlists` — [app/api/spotify/playlists/route.ts](../../../app/api/spotify/playlists/route.ts).
  - `GET /api/spotify/top` — [app/api/spotify/top/route.ts](../../../app/api/spotify/top/route.ts). Returns artists + tracks; prefer parallelizing independent calls (e.g. `Promise.all([getTopArtists(), getTopTracks()])`).
  - `GET /api/spotify/users/[id]/playlists` — [app/api/spotify/users/[id]/playlists/route.ts](../../../app/api/spotify/users/[id]/playlists/route.ts). Pagination via query params.
- **Error handling**: Routes that must return a safe payload on failure return 200 with a fallback body (e.g. `BadResponse` for currently-listening). Use 503 for "Spotify not available" when appropriate. SWR fetchers must throw on non-ok so the client gets `isError`.

## Normalization

- [lib/utils/normalizers/index.ts](../../../lib/utils/normalizers/index.ts) — e.g. `normalizeCurrentlyListening`, `normalizeArtists`, `normalizeTracks`. Use these before sending API responses so the client gets a stable shape.

## Client: hooks and SWR

- **Main hook**: [hooks/use-spotify.ts](../../../hooks/use-spotify.ts) — `useSpotify()`. Uses SWR for:
  - `/api/spotify/currently-listening` — refresh 20s, updates `setSpotifyListening` in UIProvider.
  - `/api/spotify/recently-played` — refresh 10min, updates `setSpotifyRecentlyPlayed`.
  - `/api/spotify/profile` — no custom refresh interval.
- **Other hooks**: [hooks/use-spotify-profile.ts](../../../hooks/use-spotify-profile.ts), [hooks/use-spotify-user-playlists.ts](../../../hooks/use-spotify-user-playlists.ts), [hooks/use-spotify-playlists.ts](../../../hooks/use-spotify-playlists.ts), [hooks/use-spotify-top.ts](../../../hooks/use-spotify-top.ts). All use SWR; keys and `refreshInterval`/`revalidateOnFocus` vary.
- **Convention**: Fetchers must throw on `!res.ok` so SWR sets `isError`; propagate `isError` to UI and show user-friendly error states (e.g. AlertCircle icon).

## UI and dynamic loading

- **Pages**: [app/spotify/page.tsx](../../../app/spotify/page.tsx) — Spotify page; uses Suspense and dynamic wrappers.
- **Heavy components** are loaded with `next/dynamic` (skeleton as loading):
  - [components/mate/spotify/player.wrapper.tsx](../../../components/mate/spotify/player.wrapper.tsx) — spotify player.
  - [components/mate/spotify/recently-played.wrapper.tsx](../../../components/mate/spotify/recently-played.wrapper.tsx) — recently played.
  - Playlists carousel is also dynamically imported where used.
- **Shared state**: [components/providers/ui-provider.tsx](../../../components/providers/ui-provider.tsx) — `listening`, `recentlyPlayed`, `setSpotifyListening`, `setSpotifyRecentlyPlayed`. Use for compact player and any component that shows "now playing" or "recently played" without refetching.
- **Accessibility**: Spotify player and dynamic content use `aria-live="polite"` and `sr-only` for track announcements per project a11y standards.

## Types

- [types/spotify.ts](../../../types/spotify.ts) — API and normalized types (e.g. `NormalizedSpotifyProfile`, now-playing shape).

## Adding a new endpoint or hook

1. Add the method to `SpotifyClient` in [lib/spotify.ts](../../../lib/spotify.ts) if it calls Spotify API; wrap the public getter in `cache()`.
2. Add route under `app/api/spotify/`; use normalizers for the response.
3. Add or reuse a hook with SWR; throw in fetcher on `!res.ok` and surface `isError` in UI.
