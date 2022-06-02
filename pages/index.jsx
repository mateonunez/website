import s from 'styles/pages/home.module.css';

import useSWR from 'swr';

import { Header, Footer, Hero, About } from 'components';

import { useUI } from 'components/ui/ui-context';
import { getLastArticle } from 'lib/articles/parser';

export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  const article = getLastArticle();

  return {
    props: {
      article
    }
  };
}

export default function HomePage({ article }) {
  const { setSpotifyListening } = useUI();

  const fetcher = url =>
    fetch(url)
      .then(response => response.json())
      .then(setSpotifyListening);

  useSWR('/api/spotify/listening', fetcher, {
    refreshInterval: 10 * 1000
  });

  return (
    <>
      <Header />

      <div className={s.root}>
        <Hero className="h-full" article={article} />

        <About className="h-full" />
      </div>

      <Footer />
    </>
  );
}
