import { NextResponse } from 'next/server';
import { getRecentlyPlayed } from '@/lib/spotify';
import { normalizeRecentlyPlayed } from '@/lib/utils/normalizers';

export async function GET(): Promise<NextResponse> {
  const recentlyPlayed = await getRecentlyPlayed();

  if (!recentlyPlayed) {
    return NextResponse.json({ error: 'Spotify not available' }, { status: 503 });
  }

  return NextResponse.json(normalizeRecentlyPlayed(recentlyPlayed), { status: 200 });
}
