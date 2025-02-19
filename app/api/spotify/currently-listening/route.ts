import { NextResponse } from 'next/server';
import { getCurrentlyListening } from '@/lib/spotify';
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
  try {
    const currentlyPlaying = await getCurrentlyListening();

    if (!currentlyPlaying) {
      return NextResponse.json(BadResponse, { status: 200 });
    }

    return NextResponse.json(normalizeCurrentlyListening(currentlyPlaying), { status: 200 });
  } catch (error) {
    console.error('Error fetching currently playing:', error);
    return NextResponse.json(BadResponse, { status: 200 });
  }
}
