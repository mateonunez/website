import { z } from 'zod';
import { cookieService } from './cookie.service';

const TerminalStateSchema = z.object({
  hasVisited: z.boolean(),
  lastVisited: z.number(),
});

export type TerminalState = z.infer<typeof TerminalStateSchema>;

export const terminalCookie = {
  name: 'terminal_state' as const,
  maxAge: 60 * 60 * 24 * 3, // 72 hours in seconds

  get: (): TerminalState | undefined => {
    return cookieService.get(terminalCookie.name, TerminalStateSchema);
  },

  set: (): void => {
    cookieService.set(
      terminalCookie.name,
      {
        hasVisited: true,
        lastVisited: Date.now(),
      },
      { expires: terminalCookie.maxAge },
    );
  },

  remove: (): void => {
    cookieService.remove(terminalCookie.name);
  },

  hasVisitedRecently: (): boolean => {
    const state = terminalCookie.get();
    if (!state) return false;

    const now = Date.now();
    const maxAge = terminalCookie.maxAge * 1000; // Convert to milliseconds

    return state.hasVisited && now - state.lastVisited < maxAge;
  },
};
