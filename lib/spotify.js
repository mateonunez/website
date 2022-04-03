import querystring from 'query-string';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

const basicEncoded = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
  'base64'
);

const nowPlayingEndpoint = 'https://api.spotify.com/v1/me/player/currently-playing';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

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

export const getNowPlaying = async () => {
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