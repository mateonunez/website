import type { ShareableContentType, SharePlatform } from '@/types/sharing';
import type { ContentEvent, ExternalLinkEvent, ShareEvent, TerminalEvent } from './events';
import { analytics } from './tracker';

export const trackShare = {
  initiated: (platform: SharePlatform, contentType: ShareableContentType, title: string, url: string) => {
    const event: ShareEvent = {
      category: 'sharing',
      action: 'share_initiated',
      label: `${contentType}_shared_via_${platform}`,
      platform,
      content_type: contentType,
      content_title: title,
      content_url: url,
    };
    analytics.track(event);
  },

  success: (platform: SharePlatform, contentType: ShareableContentType, title: string, url: string) => {
    const event: ShareEvent = {
      category: 'sharing',
      action: 'share_success',
      label: `${contentType}_shared_successfully_via_${platform}`,
      platform,
      content_type: contentType,
      content_title: title,
      content_url: url,
    };
    analytics.track(event);
  },

  failed: (platform: SharePlatform, contentType: ShareableContentType, title: string, url: string) => {
    const event: ShareEvent = {
      category: 'sharing',
      action: 'share_failed',
      label: `${contentType}_share_failed_via_${platform}`,
      platform,
      content_type: contentType,
      content_title: title,
      content_url: url,
    };
    analytics.track(event);
  },

  copyLink: (contentType: ShareableContentType, title: string, url: string) => {
    const event: ShareEvent = {
      category: 'sharing',
      action: 'copy_link',
      label: `${contentType}_link_copied`,
      platform: 'copy',
      content_type: contentType,
      content_title: title,
      content_url: url,
    };
    analytics.track(event);
  },
};

export const trackTerminal = {
  sessionStarted: () => {
    const event: TerminalEvent = {
      category: 'terminal',
      action: 'session_started',
      label: 'terminal_session_started',
    };
    analytics.track(event);
  },

  sessionEnded: (commandsCount: number, duration: number) => {
    const event: TerminalEvent = {
      category: 'terminal',
      action: 'session_ended',
      label: 'terminal_session_ended',
      commands_count: commandsCount,
      duration: Math.round(duration / 1000),
    };
    analytics.track(event);
  },

  commandExecuted: (command: string, success: boolean = true) => {
    const event: TerminalEvent = {
      category: 'terminal',
      action: success ? 'command_executed' : 'command_failed',
      label: `terminal_command_${command}`,
      command,
    };
    analytics.track(event);
  },

  opened: () => {
    const event: TerminalEvent = {
      category: 'terminal',
      action: 'terminal_opened',
      label: 'terminal_opened',
    };
    analytics.track(event);
  },

  closed: (duration: number) => {
    const event: TerminalEvent = {
      category: 'terminal',
      action: 'terminal_closed',
      label: 'terminal_closed',
      duration: Math.round(duration / 1000),
    };
    analytics.track(event);
  },
};

export const trackContent = {
  articleViewed: (title: string, readingTime?: number) => {
    const event: ContentEvent = {
      category: 'content',
      action: 'article_viewed',
      label: `article_viewed_${title}`,
      content_title: title,
      reading_time: readingTime,
    };
    analytics.track(event);
  },

  articleScrolled: (title: string, scrollDepth: number) => {
    const event: ContentEvent = {
      category: 'content',
      action: 'article_scrolled',
      label: `article_scrolled_${title}_${scrollDepth}`,
      content_title: title,
      scroll_depth: scrollDepth,
    };
    analytics.track(event);
  },

  articleCompleted: (title: string, scrollDepth: number) => {
    const event: ContentEvent = {
      category: 'content',
      action: 'article_completed',
      label: `article_completed_${title}`,
      content_title: title,
      scroll_depth: scrollDepth,
    };
    analytics.track(event);
  },

  timeOnPage: (pageName: string, duration: number) => {
    const event: ContentEvent = {
      category: 'content',
      action: 'time_on_page',
      label: `time_on_page_${pageName}`,
      page_name: pageName,
      duration,
    };
    analytics.track(event);
  },

  playlistViewed: (title: string) => {
    const event: ContentEvent = {
      category: 'content',
      action: 'playlist_viewed',
      label: `playlist_viewed_${title}`,
      content_title: title,
    };
    analytics.track(event);
  },

  repositoryViewed: (title: string) => {
    const event: ContentEvent = {
      category: 'content',
      action: 'repository_viewed',
      label: `repository_viewed_${title}`,
      content_title: title,
    };
    analytics.track(event);
  },

  nowPlayingViewed: (title: string) => {
    const event: ContentEvent = {
      category: 'content',
      action: 'now_playing_viewed',
      label: `now_playing_viewed_${title}`,
      content_title: title,
    };
    analytics.track(event);
  },
};

export const trackExternalLink = {
  clicked: (destination: string, linkType: 'spotify' | 'github' | 'social' | 'article' | 'other', label?: string) => {
    const event: ExternalLinkEvent = {
      category: 'external_link',
      action: 'link_clicked',
      label: label || `external_link_${linkType}`,
      destination,
      link_type: linkType,
    };
    analytics.track(event);
  },
};

export const trackPageView = (page: string, title?: string) => {
  analytics.trackPageView(page, title);
};
