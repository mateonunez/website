import type { ShareableContentType, SharePlatform } from '@/types/sharing';

export type EventCategory =
  | 'engagement'
  | 'sharing'
  | 'terminal'
  | 'navigation'
  | 'content'
  | 'external_link'
  | 'api_interaction';

export interface ShareEvent {
  category: 'sharing';
  action: 'share_initiated' | 'share_success' | 'share_failed' | 'copy_link';
  label: string;
  platform: SharePlatform;
  content_type: ShareableContentType;
  content_title: string;
  content_url: string;
}

export interface TerminalEvent {
  category: 'terminal';
  action:
    | 'terminal_opened'
    | 'terminal_closed'
    | 'command_executed'
    | 'command_failed'
    | 'session_started'
    | 'session_ended';
  label: string;
  command?: string;
  duration?: number;
  commands_count?: number;
}

export interface ContentEvent {
  category: 'content';
  action: 'article_viewed' | 'article_completed' | 'playlist_viewed' | 'repository_viewed' | 'now_playing_viewed';
  label: string;
  content_title?: string;
  reading_time?: number;
  scroll_depth?: number;
}

export interface NavigationEvent {
  category: 'navigation';
  action: 'page_view' | 'section_viewed' | 'tab_changed' | 'external_link_clicked';
  label: string;
  destination?: string;
  from_page?: string;
}

export interface ExternalLinkEvent {
  category: 'external_link';
  action: 'link_clicked';
  label: string;
  destination: string;
  link_type: 'spotify' | 'github' | 'social' | 'article' | 'other';
}

export interface ApiInteractionEvent {
  category: 'api_interaction';
  action: 'api_call_success' | 'api_call_failed' | 'data_loaded';
  label: string;
  endpoint?: string;
  duration?: number;
}

export type AnalyticsEvent =
  | ShareEvent
  | TerminalEvent
  | ContentEvent
  | NavigationEvent
  | ExternalLinkEvent
  | ApiInteractionEvent;

export interface EventMetadata {
  user_agent?: string;
  screen_resolution?: string;
  viewport_size?: string;
  timestamp: number;
  session_id?: string;
}
