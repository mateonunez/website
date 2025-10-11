import type { AnalyticsEvent, EventMetadata } from './events';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

class AnalyticsTracker {
  private sessionId: string;
  private sessionStartTime: number;
  private isEnabled: boolean;

  constructor() {
    this.sessionId = this._generateSessionId();
    this.sessionStartTime = Date.now();
    this.isEnabled = typeof window !== 'undefined';
  }

  public track(event: AnalyticsEvent): void {
    if (!this.isEnabled) return;

    const metadata = this._getMetadata();

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Event tracked:', { event, metadata });
    }

    this._pushToGTM(event, metadata);
    this._trackToVercel(event);
  }

  public trackPageView(page: string, title?: string): void {
    this.track({
      category: 'navigation',
      action: 'page_view',
      label: title || page,
      destination: page,
    });
  }

  public getSessionDuration(): number {
    return Date.now() - this.sessionStartTime;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public resetSession(): void {
    this.sessionId = this._generateSessionId();
    this.sessionStartTime = Date.now();
  }

  private _generateSessionId(): string {
    if (typeof window === 'undefined') return '';
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  private _getMetadata(): EventMetadata {
    if (typeof window === 'undefined') {
      return { timestamp: Date.now() };
    }

    return {
      user_agent: navigator.userAgent,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: Date.now(),
      session_id: this.sessionId,
    };
  }

  private _pushToGTM(event: AnalyticsEvent, metadata: EventMetadata): void {
    if (typeof window === 'undefined' || !window.dataLayer) return;

    window.dataLayer.push({
      event: 'custom_event',
      event_category: event.category,
      event_action: event.action,
      event_label: event.label,
      ...event,
      ...metadata,
    });
  }

  private _trackToVercel(event: AnalyticsEvent): void {
    if (typeof window === 'undefined') return;

    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics] Vercel:', event);
      }
    } catch (error) {
      console.error('[Analytics] Vercel error:', error);
    }
  }
}

export const analytics = new AnalyticsTracker();
export { AnalyticsTracker };
