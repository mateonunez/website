import { Container, Fade, Header, Title } from 'components';
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
  console.log(recentlyPlayed);

  return (
    <>
      <Header />

      <Fade>
        <Container>
          <Title>What I listen</Title>
        </Container>
      </Fade>
    </>
  );
}
