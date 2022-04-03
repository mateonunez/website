import { getNowPlaying } from 'lib/spotify';
import { normalizeSpotify } from 'lib/utils/normalizer';

export default async function SpotifyApi(_, res) {
  const response = await getNowPlaying();

  if (!response) {
    return res.status(500).json({ error: 'Spotify not available' });
  }

  if (response.status === 204 || response.status > 400) {
    // console.log(response);
    // TODO handle better this
    return res.status(200).json({ is_playing: false });
  }

  const data = await response.json();

  return res.status(200).json(normalizeSpotify(data));
}
