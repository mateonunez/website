import type { SpotifyAccessToken } from '@/types/spotify';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
const basicEncoded = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const baseEndpoint = 'https://api.spotify.com/v1';

/**
 * Get the access token from the Spotify API
 */
const getAccessToken = async (): Promise<SpotifyAccessToken> => {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: SPOTIFY_REFRESH_TOKEN as string,
  });

  const body = params.toString();

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicEncoded}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  return response.json();
};

/**
 * Consumer of the currently playing track
 */
export const getCurrentlyListening = async (): Promise<Response | undefined> => {
  const { access_token: accessToken } = await getAccessToken();
  if (!accessToken) {
    return;
  }

  return fetch(`${baseEndpoint}/me/player/currently-playing`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * Consumer of the recently played API
 */
export const getRecentlyPlayed = async (): Promise<Response | undefined> => {
  const limit = 20;
  const before = new Date().getTime();
  const params = new URLSearchParams({
    limit: limit.toString(),
    before: before.toString(),
  }).toString();

  const { access_token: accessToken } = await getAccessToken();
  if (!accessToken) {
    return;
  }

  return fetch(`${baseEndpoint}/me/player/recently-played?${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-cache',
  });
};

/**
 * Get top Artists
 */
export const getTopArtists = async (): Promise<Response | undefined> => {
  const limit = 5;
  const timeRange = 'short_term' as const;
  const params = new URLSearchParams({
    limit: limit.toString(),
    time_range: timeRange,
  }).toString();

  const { access_token: accessToken } = await getAccessToken();
  if (!accessToken) {
    return;
  }

  return fetch(`${baseEndpoint}/me/top/artists?${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-cache',
  });
};

/**
 * Get top Tracks
 */
export const getTopTracks = async (): Promise<Response | undefined> => {
  const limit = 5;
  const timeRange = 'short_term' as const;
  const params = new URLSearchParams({
    limit: limit.toString(),
    time_range: timeRange,
  }).toString();

  const { access_token: accessToken } = await getAccessToken();
  if (!accessToken) {
    return;
  }

  return fetch(`${baseEndpoint}/me/top/tracks?${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-cache',
  });
};
