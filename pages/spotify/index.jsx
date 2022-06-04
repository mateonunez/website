import { Footer, Header, RecentlyPlayed } from 'components';
import { NextSeo } from 'next-seo';
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
      <NextSeo
        title="Spotify"
        description="I ❤️ the music and you should know it."
        openGraph={{
          title: "Mateo's activity on Spotify"
        }}
      />
      <Header />

      {/* Recently Played Component  */}
      {recentlyPlayed?.length > 0 && <RecentlyPlayed items={recentlyPlayed} />}

      <Footer />
    </>
  );
}
