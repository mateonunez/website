import config from 'lib/config';
import { getRecentlyPlayed } from 'lib/spotify';
import { normalizeRecentlyPlayed } from 'lib/utils/normalizers';
import { NextResponse } from 'next/server';

export async function GET() {
  const response = await getRecentlyPlayed().catch(err => {
    return NextResponse.json({ recently_played: false, message: 'Are you connected?', extra: err });
  });

  if (!response) {
    return NextResponse.json({ error: 'Spotify not available' }, { status: 503 });
  }

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ recently_played: false }, { status: 200 });
  }

  const { items = [] } = await response.json();
  const data = items.map(normalizeRecentlyPlayed).sort((a, b) => b.played_at - a.played_at);
  return NextResponse.json(data, { status: 200 });
}

export async function recentlyPlayedFetcher() {
  const recentlyPlayedResponse = await fetch(`${config.baseUrl}/api/spotify/recently-played`);
  const recentlyPlayed = await recentlyPlayedResponse.json();
  return recentlyPlayed;
}
