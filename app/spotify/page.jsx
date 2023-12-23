import { RecentlyPlayed, Top } from 'components';
import { topFetcher, recentlyPlayedFetcher } from 'lib/fetchers/spotify/fetcher';
import meta from 'lib/config/metadata.js';

export const metadata = {
  title: '> spotify',
  description: `Music that I love. ${meta.description}`,
  keywords: [...meta.keywords, 'spotify', 'music', 'recently played', 'top'],
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
