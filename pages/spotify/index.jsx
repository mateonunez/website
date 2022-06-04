import { Header, RecentlyPlayed } from 'components';
import { recentlyPlayedFetcher } from 'pages/api/spotify/recently-played';

export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  const recentlyPlayed = await recentlyPlayedFetcher();

  return {
    props: {
      recentlyPlayed
    }
  };
}

export default function SpotifyPage({ recentlyPlayed }) {
  return (
    <>
      <Header />

      {/* Recently Played Component  */}
      {recentlyPlayed?.length > 0 && <RecentlyPlayed items={recentlyPlayed} />}
    </>
  );
}
