import { NextResponse } from 'next/server';
import { getUserPlaylists } from '@/lib/spotify';
import { normalizePlaylist } from '@/lib/utils/normalizers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(): Promise<NextResponse> {
  try {
    const playlists = await getUserPlaylists();
    if (!playlists) {
      return NextResponse.json({ error: 'Spotify not available' }, { status: 503 });
    }

    return NextResponse.json({
      items: playlists.items.map(normalizePlaylist),
      total: playlists.total,
    });
  } catch (error) {
    console.error('Error fetching spotify playlists:', error);
    return NextResponse.json({ error: 'Spotify not available' }, { status: 503 });
  }
}
