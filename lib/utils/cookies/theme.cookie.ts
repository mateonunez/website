import { z } from 'zod';
import { cookieService } from './cookie.service';

const ThemeStateSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  lastModified: z.number(),
});

export type ThemeState = z.infer<typeof ThemeStateSchema>;

export const themeCookie = {
  name: 'theme_state' as const,
  maxAge: 60 * 60 * 24 * 365,

  get: (): ThemeState | undefined => {
    return cookieService.get(themeCookie.name, ThemeStateSchema);
  },

  set: (theme: ThemeState['theme']): void => {
    cookieService.set(
      themeCookie.name,
      {
        theme,
        lastModified: Date.now(),
      },
      { expires: themeCookie.maxAge },
    );
  },

  remove: (): void => {
    cookieService.remove(themeCookie.name);
  },
};
