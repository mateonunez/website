// import { topFetcher } from '@/lib/fetchers/spotify/fetcher';
import meta from '@/lib/config/metadata';
import type { JSX } from 'react';
import RecentlyPlayed from '@/components/mate/recently-played';
// import SpotifyTop from '@/components/legacy/spotify/top/top';
import { getRecentlyPlayed } from '@/lib/spotify';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: '> spotify',
  description: `Music that I love. ${meta.description}`,
  keywords: [...meta.keywords, 'spotify', 'music', 'recently played', 'top'],
};

export default async function SpotifyPage(): Promise<JSX.Element> {
  try {
    const recentlyPlayed = await getRecentlyPlayed();
    // const { artists = [], tracks = [] } = await topFetcher();

    return (
      <>
        {/* @ts-ignore */}
        <RecentlyPlayed items={recentlyPlayed} />

        {/* {artists?.length > 0 && tracks?.length > 0 && <SpotifyTop artists={artists} tracks={tracks} />} */}
      </>
    );
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return (
      <div>
        <p>Unable to load Spotify data. Please try again later.</p>
      </div>
    );
  }
}
