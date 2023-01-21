import config from 'lib/config';
import { getTopArtists, getTopTracks } from 'lib/spotify';
import { normalizeArtists, normalizeTracks } from 'lib/utils/normalizers';

export default async function handler(req, res) {
  const artistsResponse = await getTopArtists().catch(err => {
    return res
      .status(200)
      .json({ recently_played: false, message: 'Are you connected?', extra: err });
  });

  const tracksResponse = await getTopTracks().catch(err => {
    return res
      .status(200)
      .json({ recently_played: false, message: 'Are you connected?', extra: err });
  });

  if (!artistsResponse || !tracksResponse) {
    return res.status(500).json({ error: 'Spotify not available' });
  }

  if (
    artistsResponse.status === 204 ||
    artistsResponse.status > 400 ||
    tracksResponse.status === 204 ||
    tracksResponse.status > 400
  ) {
    // TODO handle better this
    return res.status(200).json({ recently_played: false });
  }

  const { items: artists = [] } = await artistsResponse.json();
  const { items: tracks = [] } = await tracksResponse.json();

  return res.status(200).json({
    artists: artists.map(normalizeArtists),
    tracks: tracks.map(normalizeTracks)
  });
}

export async function topFetcher() {
  const topResponse = await fetch(`${config.baseUrl}/api/spotify/top`);

  const top = await topResponse.json();

  return top;
}
