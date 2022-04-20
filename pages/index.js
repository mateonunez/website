import s from 'styles/pages/home.module.css';

import useSWR from 'swr';

import Header from 'components/header';
import Footer from 'components/common/Footer';
import Hero from 'components/hero';
import About from 'components/about';

import { useUI } from 'components/ui/UIContext';
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

export default function Home({ article }) {
  const { setSpotifyListening } = useUI();

  const fetcher = url =>
    fetch(url)
      .then(response => response.json())
      .then(setSpotifyListening);

  useSWR('/api/spotify/listening', fetcher, {
    refreshInterval: 10 * 1000
  });

  console.log('here');

  return (
    <>
      <Header />

      <div className={s.root}>
        <Hero className="h-full transition duration-1000 ease-in-out" article={article} />

        <About className="h-full transition duration-1000 ease-in-out" />
      </div>

      <Footer />
    </>
  );
}
