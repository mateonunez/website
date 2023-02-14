import config from 'lib/config';
import { getCurrentlyListening } from 'lib/spotify';
import { normalizeCurrentlyListening } from 'lib/utils/normalizers';

/**
 * API handler
 */
export default async function handler(req, res) {
  const response = await getCurrentlyListening();

  if (!response) {
    return res.status(500).json({ error: 'Spotify not available' });
  }

  if (response.status === 204 || response.status > 400) {
    // TODO handle better this
    return res.status(200).json({ is_playing: false });
  }

  const data = await response.json();

  return res.status(200).json(normalizeCurrentlyListening(data));
}

/**
 * Fetcher used on server side
 */
export async function currentlyListeningFetcher() {
  const currentlyListeningResponse = await fetch(
    `${config.baseUrl}/api/spotify/currently-listening`
  );

  const currentlyListening = await currentlyListeningResponse.json();

  return currentlyListening;
}
