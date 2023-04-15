import { RecentlyPlayed, Top } from 'components';
import { recentlyPlayedFetcher } from 'app/api/spotify/recently-played/route';
import { topFetcher } from 'app/api/spotify/top/route';
import meta from 'lib/config/metadata.js';

export const metadata = {
  title: '> spotify',
  description: `Music that I love. ${meta.description}`,
  keywords: [...meta.keywords, 'spotify', 'music', 'recently played', 'top']
};

export default async function SpotifyPage() {
  const recentlyPlayed = await recentlyPlayedFetcher();
  const { artists = [], tracks = [] } = await topFetcher();

  return (
    <>
      <RecentlyPlayed items={recentlyPlayed} />

      {/* Top Component */}
      {artists?.length > 0 && tracks?.length > 0 && <Top artists={artists} tracks={tracks} />}
    </>
  );
}
