export const CACHE_PROFILES = {
  DEFAULT: 'default',
  ARTICLES: 'articles',
  DYNAMIC: 'dynamic',
} as const;

export const CACHE_TAGS = {
  ARTICLES: 'articles',
  ARTICLE: (slug: string) => `article:${slug}`,
  SPOTIFY: 'spotify',
  SPOTIFY_PROFILE: 'spotify:profile',
  SPOTIFY_CURRENTLY_PLAYING: 'spotify:currently-playing',
  GITHUB: 'github',
  GITHUB_PROFILE: 'github:profile',
  GITHUB_REPOS: 'github:repos',
} as const;

export function getArticleCacheTags(slug: string): string[] {
  return [CACHE_TAGS.ARTICLES, CACHE_TAGS.ARTICLE(slug)];
}

export function getCacheConfig(profile: keyof typeof CACHE_PROFILES, tags?: string[]) {
  return {
    cache: 'force-cache' as const,
    next: {
      revalidate: profile === 'DYNAMIC' ? 60 : profile === 'ARTICLES' ? 900 : 300,
      tags: tags || [],
    },
  };
}
