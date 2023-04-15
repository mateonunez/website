import config from 'lib/config';
import { getCurrentlyListening } from 'lib/spotify';
import { normalizeCurrentlyListening } from 'lib/utils/normalizers';
import { NextResponse } from 'next/server';
/**
 * API handler
 */
export async function GET() {
  const response = await getCurrentlyListening();

  if (!response) {
    return NextResponse.json({ error: 'Spotify not available' }, { status: 503 });
  }

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ is_playing: false }, { status: 200 });
  }

  const data = await response.json();

  return NextResponse.json(normalizeCurrentlyListening(data), { status: 200 });
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
