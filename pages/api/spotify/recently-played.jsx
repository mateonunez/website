import config from 'lib/config';
import { getRecentlyPlayed } from 'lib/spotify';
import { normalizeRecentlyPlayed } from 'lib/utils/normalizers';

export default async function handler(req, res) {
  const response = await getRecentlyPlayed();

  if (!response) {
    return res.status(500).json({ error: 'Spotify not available' });
  }

  if (response.status === 204 || response.status > 400) {
    // console.log(response);
    // TODO handle better this
    return res.status(200).json({ recently_played: false });
  }

  const { items = [] } = await response.json();

  const data = items.map(normalizeRecentlyPlayed).sort((a, b) => b.played_at - a.played_at);

  return res.status(200).json(data);
}

export async function recentlyPlayedFetcher() {
  const recentlyPlayedResponse = await fetch(`${config.baseUrl}/api/spotify/recently-played`);

  const recentlyPlayed = await recentlyPlayedResponse.json();

  return recentlyPlayed;
}
