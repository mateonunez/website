import assert from 'node:assert/strict';
import { GET as getPlaylists } from '@/app/api/spotify/playlists/route';
import { GET as getPublicPlaylists } from '@/app/api/spotify/users/[id]/playlists/route';
import personal from '@/lib/config/personal';
import { getRecentlyPlayed, getUserPublicPlaylists } from '@/lib/spotify';

const originalFetch = globalThis.fetch;
const originalNow = Date.now;
let now = 1_800_000_000_000;
let upstreamCalls = 0;
let fullPages = false;
let failures = 0;

function playlist(id: string, isPublic?: boolean) {
  return {
    id,
    name: id,
    public: isPublic,
    owner: { id: personal.social.spotify },
    external_urls: { spotify: `https://open.spotify.com/playlist/${id}` },
    images: [],
    tracks: { total: 0 },
  };
}

async function check(name: string, run: () => Promise<void>) {
  try {
    await run();
    console.log(`PASS: should ${name}`);
  } catch (error) {
    failures++;
    console.error(`FAIL: should ${name}`, error instanceof Error ? error.message : error);
  }
}

function request(query: string, id = 'smoke-pagination') {
  return getPublicPlaylists(new Request(`http://localhost/api/spotify/users/${id}/playlists?${query}`), {
    params: Promise.resolve({ id }),
  });
}

async function main() {
  Date.now = () => now;
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    if (url.origin === 'https://accounts.spotify.com' && url.pathname === '/api/token') {
      return Response.json({ access_token: 'synthetic-token', expires_in: 3600 });
    }
    assert.equal(url.origin, 'https://api.spotify.com');
    upstreamCalls++;
    if (url.pathname === '/v1/me/playlists') {
      return Response.json({
        items: [playlist('public', true), playlist('private', false), playlist('unknown')],
        total: 3,
      });
    }
    const items = fullPages
      ? Array.from({ length: Number(url.searchParams.get('limit') ?? 20) }, (_, index) =>
          playlist(`public-${index}`, true),
        )
      : [];
    return Response.json({ items, total: fullPages ? 10_000 : 0 });
  };

  try {
    await check('reuse the recently-played cache across requests', async () => {
      const before = upstreamCalls;
      await getRecentlyPlayed();
      now++;
      await getRecentlyPlayed();
      assert.equal(upstreamCalls - before, 1);
    });

    await check('refresh a recently-played response after its TTL', async () => {
      now += 60_001;
      const before = upstreamCalls;
      await getRecentlyPlayed();
      assert.equal(upstreamCalls - before, 1);
    });

    await check('bound the cache even when callers use distinct user IDs', async () => {
      await getUserPublicPlaylists('smoke-oldest');
      for (let index = 0; index < 100; index++) {
        await getUserPublicPlaylists(`smoke-cache-${index}`);
      }
      const before = upstreamCalls;
      await getUserPublicPlaylists('smoke-oldest');
      assert.equal(upstreamCalls - before, 1);
    });

    await check('reject invalid pagination before any upstream request', async () => {
      const invalid = [
        'limit=0',
        'limit=51',
        'limit=1.5',
        'limit=NaN',
        'offset=-1',
        'offset=1.5',
        'offset=9007199254740992',
        'pages=0',
        'pages=999',
        'pages=Infinity',
        'aggregate=unexpected',
      ];
      const before = upstreamCalls;
      for (const query of invalid) {
        assert.equal((await request(query)).status, 400, query);
      }
      assert.equal(upstreamCalls, before);
    });

    await check('preserve default pagination and stop at fifteen aggregate pages', async () => {
      fullPages = true;
      const before = upstreamCalls;
      const response = await request('aggregate=true', 'smoke-valid-aggregate');
      assert.equal(response.status, 200);
      const body = await response.json();
      assert.equal(body.pages, 15);
      assert.equal(body.limit, 20);
      assert.equal(body.items.length, 300);
      assert.equal(upstreamCalls - before, 15);
      fullPages = false;
    });

    await check('preserve a valid non-aggregate page', async () => {
      const response = await request('limit=50&offset=50', 'smoke-valid-page');
      assert.equal(response.status, 200);
      const body = await response.json();
      assert.equal(body.limit, 50);
      assert.equal(body.offset, 50);
    });

    await check('publish only explicitly public playlists and their visible count', async () => {
      const response = await getPlaylists();
      assert.equal(response.status, 200);
      const body = await response.json();
      assert.deepEqual(
        body.items.map((item: { id: string }) => item.id),
        ['public'],
      );
      assert.equal(body.total, 1);
    });
  } finally {
    globalThis.fetch = originalFetch;
    Date.now = originalNow;
  }
  assert.equal(failures, 0, `${failures} smoke checks failed`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
