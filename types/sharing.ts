export type SharePlatform = 'twitter' | 'linkedin' | 'facebook' | 'reddit' | 'native' | 'copy';

export interface ShareOptions {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
  via?: string;
  image?: string;
}

export interface ShareResult {
  success: boolean;
  platform?: SharePlatform;
  error?: string;
}

export type ShareableContentType = 'article' | 'playlist' | 'repository' | 'generic';

export interface ShareableContent {
  type: ShareableContentType;
  url: string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface ShareableArticle extends ShareableContent {
  type: 'article';
  author: string;
  date: string;
  readingTime?: number;
  categories?: string[];
}

export interface ShareablePlaylist extends ShareableContent {
  type: 'playlist';
  owner: string;
  trackCount: number;
  spotifyUrl: string;
}

export interface ShareableRepository extends ShareableContent {
  type: 'repository';
  stars: number;
  forks: number;
  language?: string;
  githubUrl: string;
}

export interface ShareConfig {
  enableNativeShare?: boolean;
  defaultPlatforms?: SharePlatform[];
  showToast?: boolean;
  trackShares?: boolean;
}
