import { NextResponse } from 'next/server';
import personal from '@/lib/config/personal';
import { getUserPublicPlaylists } from '@/lib/spotify';
import { normalizePlaylist } from '@/lib/utils/normalizers';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 hours

const MAX_PLAYLIST_LIMIT = 50;
const MAX_PLAYLIST_PAGES = 15;

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const perPage = Number(searchParams.get('limit') ?? '20');
    const offsetParam = Number(searchParams.get('offset') ?? '0');
    const aggregateParam = searchParams.get('aggregate') ?? 'false';
    const aggregate = aggregateParam === 'true';
    const maxPages = Number(searchParams.get('pages') ?? MAX_PLAYLIST_PAGES.toString());

    if (
      !Number.isInteger(perPage) ||
      perPage < 1 ||
      perPage > MAX_PLAYLIST_LIMIT ||
      !Number.isSafeInteger(offsetParam) ||
      offsetParam < 0 ||
      !Number.isInteger(maxPages) ||
      maxPages < 1 ||
      maxPages > MAX_PLAYLIST_PAGES ||
      !['true', 'false'].includes(aggregateParam)
    ) {
      return NextResponse.json({ error: 'Invalid playlist pagination' }, { status: 400 });
    }

    if (!aggregate) {
      const pageResp = await getUserPublicPlaylists(id, perPage, offsetParam);
      if (!pageResp) {
        return NextResponse.json({ error: 'Spotify not available' }, { status: 503 });
      }

      const filtered = pageResp.items.filter(
        (playlist) => playlist.public === true && playlist.owner.id === personal.social.spotify,
      );

      return NextResponse.json(
        {
          items: filtered.map(normalizePlaylist),
          total: pageResp.total,
          limit: perPage,
          offset: offsetParam,
        },
        {
          status: 200,
          headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800' },
        },
      );
    }

    const aggregated: any[] = [];
    let totalFromApi = 0;
    for (let page = 0; page < maxPages; page++) {
      const offset = page * perPage;
      const pageResp = await getUserPublicPlaylists(id, perPage, offset);
      if (!pageResp) break;
      if (page === 0) totalFromApi = pageResp.total;
      const filtered = pageResp.items.filter(
        (playlist) => playlist.public === true && playlist.owner.id === personal.social.spotify,
      );
      aggregated.push(...filtered);
      if (pageResp.items.length < perPage || aggregated.length >= totalFromApi) break;
    }

    return NextResponse.json(
      {
        items: aggregated.map(normalizePlaylist),
        total: aggregated.length,
        limit: perPage,
        pages: maxPages,
      },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800' } },
    );
  } catch (error) {
    console.error('Error fetching user public playlists:', error);
    return NextResponse.json({ error: 'Spotify not available' }, { status: 503 });
  }
}
