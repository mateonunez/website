import { NextResponse } from 'next/server';
import { getCurrentlyListening } from '@/lib/spotify';
import { trackApiUsage } from '@/lib/utils/analytics';
import { normalizeCurrentlyListening } from '@/lib/utils/normalizers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BadResponse = {
  isPlaying: false,
  title: 'Not Playing',
  artist: 'Spotify',
  album: 'Spotify',
  duration: 0,
  progress: 0,
  url: '/spotify',
};

export async function GET(): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    const currentlyPlaying = await getCurrentlyListening();

    if (!currentlyPlaying) {
      const duration = Date.now() - startTime;
      trackApiUsage('/api/spotify/currently-listening', duration, 200);
      return NextResponse.json(BadResponse, { status: 200 });
    }

    const normalized = normalizeCurrentlyListening(currentlyPlaying);
    const duration = Date.now() - startTime;

    trackApiUsage('/api/spotify/currently-listening', duration, 200);

    return NextResponse.json(normalized, { status: 200 });
  } catch (error) {
    console.error('Error fetching currently playing:', error);
    const duration = Date.now() - startTime;
    trackApiUsage('/api/spotify/currently-listening', duration, 500);
    return NextResponse.json(BadResponse, { status: 200 });
  }
}
