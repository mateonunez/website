import { z } from 'zod';
import { cookieService } from './cookie.service';

const SidebarStateSchema = z.object({
  isOpen: z.boolean(),
  lastModified: z.number(),
  variant: z.enum(['sidebar', 'floating', 'inset']).optional(),
  collapsible: z.enum(['offcanvas', 'icon', 'none']).optional(),
});

export type SidebarState = z.infer<typeof SidebarStateSchema>;

export const sidebarCookie = {
  name: 'sidebar_state' as const,
  maxAge: 60 * 60 * 24 * 30, // 30 days

  get: (): SidebarState | undefined => {
    return cookieService.get(sidebarCookie.name, SidebarStateSchema);
  },

  set: (state: Partial<SidebarState>): void => {
    const currentState = sidebarCookie.get();
    cookieService.set(
      sidebarCookie.name,
      {
        ...currentState,
        ...state,
        lastModified: Date.now(),
      },
      { expires: sidebarCookie.maxAge },
    );
  },

  remove: (): void => {
    cookieService.remove(sidebarCookie.name);
  },
};
