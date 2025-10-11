import type {
  ShareableArticle,
  ShareableContent,
  ShareablePlaylist,
  ShareableRepository,
  SharePlatform,
} from '@/types/sharing';

export function generateArticleShareText(article: ShareableArticle, platform: SharePlatform): string {
  const { title, description, author, tags } = article;

  switch (platform) {
    case 'twitter': {
      const hashtags =
        tags
          ?.slice(0, 3)
          .map((tag) => `#${tag.replace(/\s+/g, '')}`)
          .join(' ') || '';
      const text = description ? `${title} by @${author}\n\n${description}` : `${title} by @${author}`;
      return hashtags ? `${text}\n\n${hashtags}` : text;
    }
    case 'linkedin':
      return description ? `${title}\n\n${description}` : title;
    case 'facebook':
      return title;
    case 'reddit':
      return title;
    default:
      return description ? `${title} - ${description}` : title;
  }
}

export function generatePlaylistShareText(playlist: ShareablePlaylist, platform: SharePlatform): string {
  const { title, owner, trackCount } = playlist;

  switch (platform) {
    case 'twitter':
      return `🎵 ${title} by ${owner}\n\nA playlist with ${trackCount} tracks on Spotify`;
    case 'linkedin':
      return `${title} - A Spotify playlist by ${owner} featuring ${trackCount} tracks`;
    case 'facebook':
      return `Check out this playlist: ${title} by ${owner}`;
    case 'reddit':
      return `${title} - Spotify Playlist (${trackCount} tracks)`;
    default:
      return `${title} by ${owner} - ${trackCount} tracks`;
  }
}

export function generateRepositoryShareText(repository: ShareableRepository, platform: SharePlatform): string {
  const { title, description, stars, forks, language } = repository;

  switch (platform) {
    case 'twitter': {
      const languageText = language ? ` #${language}` : '';
      const baseText = description ? `⚡ ${title}\n\n${description}` : `⚡ ${title}`;
      const stats = `\n\n⭐ ${stars} | 🍴 ${forks}`;
      return `${baseText}${stats}${languageText}`;
    }
    case 'linkedin': {
      const languageText = language ? ` Built with ${language}.` : '';
      return description
        ? `${title}\n\n${description}${languageText}\n\n⭐ ${stars} stars | ${forks} forks`
        : `${title}${languageText}\n\n⭐ ${stars} stars | ${forks} forks`;
    }
    case 'facebook':
      return description ? `${title}: ${description}` : title;
    case 'reddit':
      return description ? `${title} - ${description}` : title;
    default:
      return description ? `${title}: ${description} ⭐${stars} 🍴${forks}` : title;
  }
}

export function generateShareText(content: ShareableContent, platform: SharePlatform = 'native'): string {
  switch (content.type) {
    case 'article':
      return generateArticleShareText(content as ShareableArticle, platform);
    case 'playlist':
      return generatePlaylistShareText(content as ShareablePlaylist, platform);
    case 'repository':
      return generateRepositoryShareText(content as ShareableRepository, platform);
    default:
      return content.description ? `${content.title} - ${content.description}` : content.title;
  }
}
