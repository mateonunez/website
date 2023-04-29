const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
const basicEncoded = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
  'base64'
);
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const baseEndpoint = 'https://api.spotify.com/v1';

/**
 * Get the access token from the Spotify API
 */
const getAccessToken = async () => {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: SPOTIFY_REFRESH_TOKEN
  });

  const body = params.toString();

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
  const { access_token: accessToken } = await getAccessToken();
  if (!accessToken) {
    return;
  }

  return fetch(`${baseEndpoint}/me/player/currently-playing`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

/**
 * Consumer of the recently played API
 */
export const getRecentlyPlayed = async () => {
  const limit = 20; // config.munber; // max 33 tracks
  const before = new Date().getTime(); // now() - 1 hour
  const params = new URLSearchParams({
    limit,
    before
  }).toString();

  const { access_token: accessToken } = await getAccessToken();
  if (!accessToken) {
    return;
  }

  return fetch(`${baseEndpoint}/me/player/recently-played?${params}`, {
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
  const params = new URLSearchParams({
    limit,
    time_range: timeRange
  }).toString();

  const { access_token: accessToken } = await getAccessToken();
  if (!accessToken) {
    return;
  }

  return fetch(`${baseEndpoint}/me/top/artists?${params}`, {
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
  const params = new URLSearchParams({
    limit,
    time_range: timeRange
  }).toString();

  const { access_token: accessToken } = await getAccessToken();
  if (!accessToken) {
    return;
  }

  return fetch(`${baseEndpoint}/me/top/tracks?${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
