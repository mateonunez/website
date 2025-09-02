import { NextResponse } from 'next/server';
import personal from '@/lib/config/personal';
import { getUserPublicPlaylists } from '@/lib/spotify';
import { normalizePlaylist } from '@/lib/utils/normalizers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const perPage = Number(searchParams.get('limit') ?? '20');
    const maxPages = Number(searchParams.get('pages') ?? '15');

    const aggregated: any[] = [];
    let totalFromApi = 0;

    for (let page = 0; page < maxPages; page++) {
      const offset = page * perPage;
      const pageResp = await getUserPublicPlaylists(id, perPage, offset);
      if (!pageResp) {
        break;
      }
      if (page === 0) {
        totalFromApi = pageResp.total;
      }

      const filtered = pageResp.items.filter(
        (playlist) => playlist.public !== false && playlist.owner.id === personal.social.spotify,
      );
      aggregated.push(...filtered);

      if (pageResp.items.length < perPage || aggregated.length >= totalFromApi) {
        break;
      }
    }

    return NextResponse.json(
      {
        items: aggregated.map(normalizePlaylist),
        total: aggregated.length,
        limit: perPage,
        pages: maxPages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching user public playlists:', error);
    return NextResponse.json({ error: 'Spotify not available' }, { status: 503 });
  }
}
