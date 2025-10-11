import type { Metadata } from 'next';
import config from '@/lib/config';
import personal from '@/lib/config/personal';
import type { ShareableArticle, ShareablePlaylist, ShareableRepository } from '@/types/sharing';

export function getArticleShareMetadata(article: ShareableArticle): Partial<Metadata> {
  const baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl;
  const imageUrl = article.image?.startsWith('http')
    ? article.image
    : `${baseUrl}${article.image?.startsWith('/') ? '' : '/'}${article.image}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    openGraph: {
      type: 'article',
      url: article.url,
      title: article.title,
      description: article.description,
      siteName: personal.site.name,
      images: article.image ? [{ url: imageUrl, alt: article.title }] : undefined,
      locale: 'en_US',
      // @ts-expect-error - article properties are valid but not typed
      article: {
        authors: [article.author],
        tags: article.tags,
        publishedTime: article.date,
        modifiedTime: article.date,
        section: article.categories?.[0],
      },
    },
    twitter: {
      card: 'summary_large_image',
      site: `@${personal.social.twitter}`,
      creator: `@${personal.social.twitter}`,
      title: article.title,
      description: article.description,
      images: article.image ? { url: imageUrl, alt: article.title } : undefined,
    },
  };
}

export function getPlaylistShareMetadata(playlist: ShareablePlaylist): Partial<Metadata> {
  const baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl;
  const imageUrl = playlist.image?.startsWith('http')
    ? playlist.image
    : playlist.image
      ? `${baseUrl}${playlist.image?.startsWith('/') ? '' : '/'}${playlist.image}`
      : undefined;

  const description =
    playlist.description || `A Spotify playlist by ${playlist.owner} featuring ${playlist.trackCount} tracks`;

  return {
    title: `${playlist.title} - Spotify Playlist`,
    description,
    openGraph: {
      type: 'music.playlist',
      url: playlist.url,
      title: playlist.title,
      description,
      siteName: personal.site.name,
      images: imageUrl ? [{ url: imageUrl, alt: playlist.title }] : undefined,
      locale: 'en_US',
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      site: `@${personal.social.twitter}`,
      creator: `@${personal.social.twitter}`,
      title: playlist.title,
      description,
      images: imageUrl ? { url: imageUrl, alt: playlist.title } : undefined,
    },
  };
}

export function getRepositoryShareMetadata(repository: ShareableRepository): Partial<Metadata> {
  const baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl;
  const description = repository.description || 'Open source project';
  const imageUrl = repository.image?.startsWith('http')
    ? repository.image
    : repository.image
      ? `${baseUrl}${repository.image?.startsWith('/') ? '' : '/'}${repository.image}`
      : `${baseUrl}/card.png`;

  return {
    title: `${repository.title} - Open Source Project`,
    description,
    keywords: repository.tags || [repository.language || 'open source', 'github', 'project'],
    openGraph: {
      type: 'website',
      url: repository.url,
      title: repository.title,
      description,
      siteName: personal.site.name,
      images: [{ url: imageUrl, alt: repository.title }],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: `@${personal.social.twitter}`,
      creator: `@${personal.social.twitter}`,
      title: repository.title,
      description,
      images: { url: imageUrl, alt: repository.title },
    },
  };
}
