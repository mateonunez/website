import type {
  SpotifyAccessToken,
  SpotifyCurrentlyPlaying,
  SpotifyRecentlyPlayed,
  SpotifyTopArtists,
  SpotifyTopTracks,
} from '@/types/spotify';

class SpotifyError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'SpotifyError';
  }
}

interface SpotifyConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  maxRetries?: number;
  timeout?: number;
  cacheTTL?: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class SpotifyClient {
  private readonly _basicEncoded: string;
  private readonly _tokenEndpoint = 'https://accounts.spotify.com/api/token';
  private readonly _baseEndpoint = 'https://api.spotify.com/v1';
  private readonly _maxRetries: number;
  private readonly _timeout: number;
  private readonly _cacheTTL: number;
  private _accessToken: string | null = null;
  private _tokenExpiry: number | null = null;
  private _cache: Map<string, CacheEntry<unknown>> = new Map();

  constructor(config: SpotifyConfig) {
    this._basicEncoded = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');
    this._maxRetries = config.maxRetries ?? 3;
    this._timeout = config.timeout ?? 5000;
    this._cacheTTL = config.cacheTTL ?? 60 * 1000; // 1 minute default
  }

  private getCacheKey(endpoint: string, params?: URLSearchParams): string {
    return `${endpoint}${params ? `?${params.toString()}` : ''}`;
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this._cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > this._cacheTTL;
    if (isExpired) {
      this._cache.delete(key);
      return null;
    }

    return entry.data;
  }

  private setCache<T>(key: string, data: T): void {
    this._cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  private async getAccessToken(): Promise<string> {
    if (this._accessToken && this._tokenExpiry && Date.now() < this._tokenExpiry) {
      return this._accessToken;
    }

    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN as string,
    });

    const response = await this.fetchWithRetry(this._tokenEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this._basicEncoded}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = (await response.json()) as SpotifyAccessToken;
    this._accessToken = data.access_token;
    this._tokenExpiry = Date.now() + data.expires_in * 1000;
    return this._accessToken;
  }

  private async fetchWithRetry(url: string, options: RequestInit, retryCount = 0): Promise<Response> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this._timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new SpotifyError(error.message || 'Spotify API request failed', response.status, error.error);
      }

      return response;
    } catch (error) {
      if (retryCount < this._maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 2 ** retryCount * 1000));
        return this.fetchWithRetry(url, options, retryCount + 1);
      }
      throw error;
    }
  }

  private async fetchSpotify<T>(endpoint: string, params?: URLSearchParams, skipCache = false): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint, params);

    if (!skipCache) {
      const cachedData = this.getFromCache<T>(cacheKey);
      if (cachedData !== null) {
        return cachedData;
      }
    }

    const accessToken = await this.getAccessToken();
    const url = `${this._baseEndpoint}${endpoint}${params ? `?${params.toString()}` : ''}`;

    const response = await this.fetchWithRetry(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-cache',
    });

    const data = (await response.json()) as T;

    if (!skipCache) {
      this.setCache(cacheKey, data);
    }

    return data;
  }

  async getCurrentlyListening(): Promise<SpotifyCurrentlyPlaying | undefined> {
    try {
      // Skip cache for currently playing as it's real-time data
      return await this.fetchSpotify<SpotifyCurrentlyPlaying>('/me/player/currently-playing', undefined, true);
    } catch (error) {
      if (error instanceof SpotifyError && error.status === 204) {
        return undefined;
      }
      throw error;
    }
  }

  async getRecentlyPlayed(limit = 20): Promise<SpotifyRecentlyPlayed | undefined> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      before: Date.now().toString(),
    });

    return this.fetchSpotify<SpotifyRecentlyPlayed>('/me/player/recently-played', params);
  }

  async getTopArtists(
    limit = 5,
    timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term',
  ): Promise<SpotifyTopArtists | undefined> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      time_range: timeRange,
    });

    return this.fetchSpotify<SpotifyTopArtists>('/me/top/artists', params);
  }

  async getTopTracks(
    limit = 5,
    timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term',
  ): Promise<SpotifyTopTracks | undefined> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      time_range: timeRange,
    });

    return this.fetchSpotify<SpotifyTopTracks>('/me/top/tracks', params);
  }
}

const spotifyClient = new SpotifyClient({
  clientId: process.env.SPOTIFY_CLIENT_ID as string,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN as string,
});

// TODO: refactor this
export const getCurrentlyListening = () => spotifyClient.getCurrentlyListening();
export const getRecentlyPlayed = () => spotifyClient.getRecentlyPlayed();
export const getTopArtists = () => spotifyClient.getTopArtists();
export const getTopTracks = () => spotifyClient.getTopTracks();
