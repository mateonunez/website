'use client';

import s from './hero.module.css';

import { Fade, Terminal, Player } from 'components';
import { useUI } from 'components/ui/ui-context';

import ArticlePreview from 'components/articles/preview';
import Link from 'next/link';
import useSWR from 'swr';

export default function Hero({ article, ...props }) {
  const { setSpotifyListening } = useUI();

  const fetcher = url =>
    fetch(url)
      .then(response => response.json())
      .then(setSpotifyListening);

  useSWR('/api/spotify/currently-listening', fetcher, {
    refreshInterval: 10 * 1000
  });

  return (
    <>
      <div {...props}>
        {/* Hero  */}
        <div className={s.root}>
          {/* Title  */}
          <Fade>
            <h1 className="title">Mateo Nunez</h1>
          </Fade>
          {/* Terminal  */}
          <Fade direction="left">
            <div className={s.terminal}>
              <Terminal />
            </div>
          </Fade>
          {/* Listening */}
          <Fade direction="right">
            <div className={s.listening}>
              <Player />
            </div>
          </Fade>
          {/* Last Article */}
          <div className={s.lastArticle}>
            <Fade>
              <h2 className="text-center subtitle">
                <Link href="/blog" title="Blog" aria-label="Blog" rel="canonical">
                  From the Blog
                </Link>
              </h2>
              <ArticlePreview {...article} />
            </Fade>
          </div>
          {/* Start the BigBang */}
          {/* <div
          className={cn(
            s.start,
            'transition ease-in-out duration-1000',
            isTerminalCompleted ? 'opacity-100' : 'opacity-0'
          )}>
          <button className={s.startButton} onClick={() => setBigBang(true)}>
            <ChevronDown className={s.startIcon} />
          </button>
        </div> */}
        </div>
      </div>
    </>
  );
}
