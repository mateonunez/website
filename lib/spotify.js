import querystring from 'query-string';
import config from './config';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

const basicEncoded = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
  'base64'
);

const tokenEndpoint = 'https://accounts.spotify.com/api/token';

/**
 * Get the access token from the Spotify API
 */
const getAccessToken = async () => {
  const body = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: SPOTIFY_REFRESH_TOKEN
  });

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicEncoded}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  return response.json();
};

/**
 * Consumer of the currently playing track
 */
export const getCurrentlyListening = async () => {
  const nowPlayingEndpoint = 'https://api.spotify.com/v1/me/player/currently-playing';

  const { access_token: accessToken } = await getAccessToken();

  if (!accessToken) {
    return;
  }

  return fetch(nowPlayingEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

/**
 * Consumer of the recently played API
 */
export const getRecentlyPlayed = async () => {
  const limit = config.munber; // max 33 tracks
  const before = new Date().getTime(); // now() - 1 hour

  const params = querystring.stringify({ limit, before });

  const recentlyPlayedEndpoint = `https://api.spotify.com/v1/me/player/recently-played?${params}`;

  const { access_token: accessToken } = await getAccessToken();

  if (!accessToken) {
    return;
  }

  return fetch(recentlyPlayedEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

/**
 * Get top Artists
 */
export const getTopArtists = async () => {
  const limit = 5; // max 50 artists
  const timeRange = 'short_term'; // last 4 weeks
  const params = querystring.stringify({ limit, time_range: timeRange });

  const topArtistsEndpoint = `https://api.spotify.com/v1/me/top/artists?${params}`;

  const { access_token: accessToken } = await getAccessToken();

  if (!accessToken) {
    return;
  }

  return fetch(topArtistsEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

/**
 * Get top Tracks
 */
export const getTopTracks = async () => {
  const limit = 5; // max 50 tracks
  const timeRange = 'short_term'; // last 4 weeks
  const params = querystring.stringify({ limit, time_range: timeRange });

  const topTracksEndpoint = `https://api.spotify.com/v1/me/top/tracks?${params}`;

  const { access_token: accessToken } = await getAccessToken();

  if (!accessToken) {
    return;
  }

  return fetch(topTracksEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
