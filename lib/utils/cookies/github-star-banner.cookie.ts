import { z } from 'zod';
import { cookieService } from './cookie.service';

const GithubStarBannerStateSchema = z.object({
  dismissed: z.boolean(),
  dismissedAt: z.number(),
});

export type GithubStarBannerState = z.infer<typeof GithubStarBannerStateSchema>;

export const githubStarBannerCookie = {
  name: 'github_star_banner_state' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days in seconds

  get: (): GithubStarBannerState | undefined => {
    return cookieService.get(githubStarBannerCookie.name, GithubStarBannerStateSchema);
  },

  set: (): void => {
    cookieService.set(
      githubStarBannerCookie.name,
      {
        dismissed: true,
        dismissedAt: Date.now(),
      },
      { expires: githubStarBannerCookie.maxAge },
    );
  },

  remove: (): void => {
    cookieService.remove(githubStarBannerCookie.name);
  },

  shouldShowBanner: (): boolean => {
    const state = githubStarBannerCookie.get();
    if (!state) return true;

    const now = Date.now();
    const maxAge = githubStarBannerCookie.maxAge * 1000;

    return !state.dismissed || now - state.dismissedAt >= maxAge;
  },
};
