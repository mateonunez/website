---
name: terminal-component
description: Change Terminal UI or behavior. Use when working with the Terminal component, command registry, terminal commands, terminal hooks, or terminal cookie state.
---

# Terminal component

Guidance for the Terminal feature (interactive CLI-style UI on the home page).

## Entry and loading

- **Wrapper**: [components/mate/terminal/terminal.wrapper.tsx](../../../components/mate/terminal/terminal.wrapper.tsx) — loads [components/mate/terminal/terminal.tsx](../../../components/mate/terminal/terminal.tsx) via `next/dynamic` with `TerminalSkeleton`, `ssr: false`.
- **Skeleton**: [components/mate/terminal/terminal.skeleton.tsx](../../../components/mate/terminal/terminal.skeleton.tsx). Use as the dynamic loading fallback.

## Command system

- **Registry**: [components/mate/terminal/command-registry.ts](../../../components/mate/terminal/command-registry.ts) — singleton `registry`; `registerGroup(name, commands)`, `getAllCommands()`, `getCommandMap()` (name + aliases, lowercased).
- **Registration**: [components/mate/terminal/commands/index.ts](../../../components/mate/terminal/commands/index.ts) — registers groups: System, Personal, Social, Navigation (links, site), Fun (ait). Add new commands here or in the appropriate group file.
- **Command groups**: [components/mate/terminal/commands/system.ts](../../../components/mate/terminal/commands/system.ts), [components/mate/terminal/commands/personal.ts](../../../components/mate/terminal/commands/personal.ts), [components/mate/terminal/commands/social.ts](../../../components/mate/terminal/commands/social.ts), [components/mate/terminal/commands/navigation.ts](../../../components/mate/terminal/commands/navigation.ts), [components/mate/terminal/commands/ait.ts](../../../components/mate/terminal/commands/ait.ts).
- **Types**: [components/mate/terminal/types/commands.ts](../../../components/mate/terminal/types/commands.ts) — `Command`, `CommandGroup`, `CommandRegistry`. Commands have `name`, `aliases?`, `description`, `run` (and optionally UI).

## Hooks

- [components/mate/terminal/hooks/use-terminal-state.ts](../../../components/mate/terminal/hooks/use-terminal-state.ts) — terminal state (messages, history, etc.).
- [components/mate/terminal/hooks/use-terminal-input.ts](../../../components/mate/terminal/hooks/use-terminal-input.ts) — input handling.
- [components/mate/terminal/hooks/use-command-runner.tsx](../../../components/mate/terminal/hooks/use-command-runner.tsx) — runs commands from registry.
- [components/mate/terminal/hooks/use-command-executor.ts](../../../components/mate/terminal/hooks/use-command-executor.ts) — execution flow.

## UI pieces

- **Line**: [components/mate/terminal/line.tsx](../../../components/mate/terminal/line.tsx) — renders a terminal line (command, output).
- **Input**: [components/mate/terminal/terminal-input.tsx](../../../components/mate/terminal/terminal-input.tsx).
- **Context**: [components/mate/terminal/command-context.tsx](../../../components/mate/terminal/command-context.tsx) — provides command context to children.
- **Constants**: [components/mate/terminal/constants.ts](../../../components/mate/terminal/constants.ts) — default prompt, height, messages.
- **Utils**: [components/mate/terminal/utils/formatting.ts](../../../components/mate/terminal/utils/formatting.ts), [components/mate/terminal/utils/linkify.ts](../../../components/mate/terminal/utils/linkify.ts).

## Cookie state

- [lib/utils/cookies/terminal.cookie.ts](../../../lib/utils/cookies/terminal.cookie.ts) — `terminalCookie`: `get()`, `set()`, `remove()`, `hasVisitedRecently()`. Schema: `hasVisited`, `lastVisited`. Used to remember if the user has visited the terminal (e.g. for onboarding or banners). Max age 72 hours.

## Accessibility

- The terminal or carousel may use `biome-ignore` for a11y exceptions (e.g. focus management in custom interactive regions). Document any exception and keep keyboard navigation and screen reader behavior in mind; see CLAUDE.md for project a11y standards.

## Adding a new command

1. Define the command in the appropriate group file (e.g. `commands/personal.ts`) with `name`, `description`, `run`, and optional `aliases`.
2. Register the group (or add the command to an existing group) in [components/mate/terminal/commands/index.ts](../../../components/mate/terminal/commands/index.ts).
3. Ensure `run` returns output compatible with the line renderer (e.g. string or structured output the UI understands).
