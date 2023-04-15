import { RecentlyPlayed, Top } from 'components';
import { NextSeo } from 'next-seo';
import { recentlyPlayedFetcher } from 'pages/api/spotify/recently-played';
import { topFetcher } from 'pages/api/spotify/top';
import { useMemo } from 'react';

// export async function getServerSideProps({ res }) {
//   res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

//   const recentlyPlayed = await recentlyPlayedFetcher();
//   const top = await topFetcher();

//   return {
//     props: {
//       recentlyPlayed,
//       top
//     }
//   };
// }

export default async function SpotifyPage() {
  const recentlyPlayed = await recentlyPlayedFetcher();
  const { artists = [], tracks = [] } = await topFetcher();

  return (
    <>
      {/* <NextSeo
        title="Music that I love"
        description="I ❤️ the music and you should know it."
        openGraph={{
          title: "Mateo's activity on Spotify"
        }}
      /> */}

      {/* Recently Played Component  */}
      <RecentlyPlayed items={recentlyPlayed} />

      {/* Top Component */}
      {artists?.length > 0 && tracks?.length > 0 && <Top artists={artists} tracks={tracks} />}
    </>
  );
}
