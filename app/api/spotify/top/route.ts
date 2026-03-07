import { NextResponse } from 'next/server';
import { getTopArtists, getTopTracks } from '@/lib/spotify';
import { normalizeArtists, normalizeTracks } from '@/lib/utils/normalizers';
import type { SpotifyTopArtists, SpotifyTopTracks } from '@/types/spotify';

type SpotifyResponse<T> = T | NextResponse<{ recently_played: boolean; message: string; extra: any }>;

export async function GET(): Promise<NextResponse> {
  const [artistsResponse, tracksResponse] = (await Promise.all([
    getTopArtists().catch((err) =>
      NextResponse.json({ recently_played: false, message: 'Are you connected?', extra: err }),
    ),
    getTopTracks().catch((err) =>
      NextResponse.json({ recently_played: false, message: 'Are you connected?', extra: err }),
    ),
  ])) as [SpotifyResponse<SpotifyTopArtists>, SpotifyResponse<SpotifyTopTracks>];

  if (artistsResponse instanceof NextResponse || tracksResponse instanceof NextResponse) {
    return NextResponse.json({ error: 'Spotify not available' }, { status: 503 });
  }

  const artists = artistsResponse.items;
  const tracks = tracksResponse.items;

  return NextResponse.json({
    artists: artists.map(normalizeArtists),
    tracks: tracks.map(normalizeTracks),
  });
}
