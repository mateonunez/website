---
name: accessibility
description: Implement or audit WCAG 2.1 AA accessibility. Use when adding skip navigation, fixing heading hierarchy, setting up aria-live regions, handling reduced motion, adding screen reader text, or auditing a component for a11y compliance.
---

# Accessibility (WCAG 2.1 AA)

Guidance for accessibility on this site. All pages must meet WCAG 2.1 AA standards.

## Skip navigation

- The root layout [app/layout.tsx](../../app/layout.tsx) includes a skip link as the first focusable element inside `<SidebarInset>`:
  ```tsx
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium focus:shadow-lg"
  >
    Skip to main content
  </a>
  ```
- The `<main>` element has `id="main-content"` so the link targets it correctly.
- Do not remove or move this link — it must be the first interactive element on every page.

## Heading hierarchy

- Each page must have **exactly one `<h1>`**.
- Use the `asHeading` prop on `PageHeader` ([components/mate/page-header.tsx](../../components/mate/page-header.tsx)) to render the page-level `<h1>`. Do **not** add a separate `<h1>` elsewhere on the same page.
- Sections within a page use `<h2>`, subsections use `<h3>`, etc. Never skip levels.
- In MDX articles, the title from frontmatter renders as `<h1>`; use `##` and `###` for sections inside the article body.

## Focus management

- Use `focus-visible` (not `focus`) for keyboard-only outline styles in [styles/global.css](../../styles/global.css). This prevents the focus ring from showing on mouse clicks.
- Do not suppress focus outlines — keyboard users depend on them.
- For custom interactive regions (e.g., Terminal), use `biome-ignore lint/a11y/...` only when there is a documented reason; always maintain keyboard navigation and screen reader behavior. See [components/mate/terminal/terminal.tsx](../../components/mate/terminal/terminal.tsx) and [components/ui/carousel.tsx](../../components/ui/carousel.tsx) for examples.

## Reduced motion

- Global CSS in [styles/global.css](../../styles/global.css) includes `@media (prefers-reduced-motion: reduce)` — CSS animations are disabled at the system level automatically.
- Framer Motion is wrapped with `<MotionConfig reducedMotion="user">` in [components/providers/motion-provider.tsx](../../components/providers/motion-provider.tsx) — all `motion.*` components respect the OS reduced-motion preference automatically.
- Do **not** add manual `useReducedMotion` checks when using Framer Motion components inside `MotionProvider` — it is already handled.

## Live regions for dynamic content

- Wrap dynamic content sections (data that updates after initial render) with `aria-live="polite"`:
  - Spotify player (currently listening, recently played): uses `aria-live="polite"` so screen readers announce track changes.
  - GitHub recent activity: uses `aria-live="polite"` on the activity list container.
- Use `aria-live="assertive"` only for truly urgent announcements (errors); prefer `"polite"` for non-urgent updates.

## Screen reader text

- Use the `sr-only` Tailwind class for visually hidden text that should be read by screen readers:
  ```tsx
  <span className="sr-only">Now playing: {track.name} by {track.artist}</span>
  ```
- Use this pattern for track announcements in the Spotify player, icon-only buttons, and any content conveyed visually but not in text.

## Color contrast

- Primary color in light mode uses `amber-600` (not `amber-500`) to meet 4.5:1 contrast ratio against white backgrounds.
- Dark mode uses `amber-400`.
- When adding new color combinations, verify contrast ratio with a tool (e.g., WebAIM Contrast Checker).

## biome-ignore a11y exceptions

When a Biome a11y rule must be suppressed for a legitimate interactive component:
1. Use `biome-ignore lint/a11y/<rule>: <reason>` on the specific line.
2. Ensure keyboard navigation still works (Tab, Enter, Escape, arrow keys as appropriate).
3. Ensure the component is still usable with a screen reader.
4. Prefer fixing the root cause over suppressing the rule.

## Verification checklist

Before marking a new page or component as done, verify:
- [ ] One `<h1>` per page, with correct `<h2>`/`<h3>` hierarchy below it
- [ ] All interactive elements reachable and operable via keyboard (Tab + Enter/Space)
- [ ] Focus ring visible on keyboard navigation (`focus-visible` applied, not suppressed)
- [ ] Dynamic content wrapped in `aria-live="polite"` where appropriate
- [ ] Icon-only buttons have accessible labels (`aria-label` or `sr-only` text)
- [ ] Images have descriptive `alt` text (or `alt=""` for decorative images)
- [ ] Color contrast passes 4.5:1 for normal text, 3:1 for large text
- [ ] Animations respect reduced-motion (via MotionProvider or CSS media query)
