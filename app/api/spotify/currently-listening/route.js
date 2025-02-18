import { NextResponse } from 'next/server';
import { getCurrentlyListening } from '@/lib/spotify';
import { normalizeCurrentlyListening } from '@/lib/utils/normalizers';

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

export const revalidate = 10;
