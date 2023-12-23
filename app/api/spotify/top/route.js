import { NextResponse } from 'next/server';
import { getTopArtists, getTopTracks } from 'lib/spotify';
import { normalizeArtists, normalizeTracks } from 'lib/utils/normalizers';

export async function GET() {
  const artistsResponse = await getTopArtists().catch((err) => {
    return NextResponse.json({ recently_played: false, message: 'Are you connected?', extra: err });
  });

  const tracksResponse = await getTopTracks().catch((err) => {
    return NextResponse.json({ recently_played: false, message: 'Are you connected?', extra: err });
  });

  if (!artistsResponse || !tracksResponse) {
    return NextResponse.json({ error: 'Spotify not available' }, { status: 503 });
  }

  if (
    artistsResponse.status === 204 ||
    artistsResponse.status > 400 ||
    tracksResponse.status === 204 ||
    tracksResponse.status > 400
  ) {
    return NextResponse.json({ recently_played: false }, { status: 200 });
  }

  const { items: artists = [] } = await artistsResponse.json();
  const { items: tracks = [] } = await tracksResponse.json();

  return NextResponse.json({
    artists: artists.map(normalizeArtists),
    tracks: tracks.map(normalizeTracks),
  });
}
