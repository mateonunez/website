import s from 'styles/pages/home.module.css';

import useSWR from 'swr';

import Header from 'components/header';
import Hero from 'components/hero';
import { useEffect } from 'react';
import { useUI } from 'components/ui/UIContext';

export default function Home() {
  const { setSpotifyListening } = useUI();
  const fetcher = url => fetch(url).then(response => response.json());
  const { data: listening } = useSWR('/api/spotify/listening', fetcher);

  useEffect(() => {
    setSpotifyListening(listening);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening]);

  return (
    <>
      <Header />

      <div className={s.root}>
        <Hero className="h-full transition duration-1000 ease-in-out" />
      </div>
    </>
  );
}
