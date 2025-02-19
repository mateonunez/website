import { NextResponse } from 'next/server';
import { getTopArtists, getTopTracks } from '@/lib/spotify';
import { normalizeArtists, normalizeTracks } from '@/lib/utils/normalizers';
import type { SpotifyTopArtists, SpotifyTopTracks } from '@/types/spotify';

type SpotifyResponse<T> = T | NextResponse<{ recently_played: boolean; message: string; extra: any }>;

export async function GET(): Promise<NextResponse> {
  const artistsResponse: SpotifyResponse<SpotifyTopArtists> = await getTopArtists().catch((err) => {
    return NextResponse.json({ recently_played: false, message: 'Are you connected?', extra: err });
  });

  const tracksResponse: SpotifyResponse<SpotifyTopTracks> = await getTopTracks().catch((err) => {
    return NextResponse.json({ recently_played: false, message: 'Are you connected?', extra: err });
  });

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
