'use client';

import s from './hero.module.css';

import { useUI } from '@/components/legacy/ui/ui-context';
import type { Article } from '@/types/article';
// import ArticlePreview from '@/components/legacy/articles/preview/article.preview';
import Link from 'next/link';
import useSWR from 'swr';
import type { HTMLAttributes, JSX } from 'react';
import Fade from '@/components/legacy/animations/fade';
// import Terminal from '@/components/legacy/terminal/terminal';
// import Player from '@/components/legacy/spotify/player/player';

interface HeroProps extends HTMLAttributes<HTMLDivElement> {
  article: Article;
}

export default function Hero({ article, ...props }: HeroProps): JSX.Element {
  const { setSpotifyListening } = useUI();

  const fetcher = (url: string): Promise<void> =>
    fetch(url)
      .then((response) => response.json())
      .then(setSpotifyListening);

  useSWR('/api/spotify/currently-listening', fetcher, {
    refreshInterval: 10 * 1000,
  });

  return (
    <>
      <div {...props}>
        {/* Hero  */}
        <div className={s.root}>
          {/* Title  */}
          <Fade>
            <h1 className="text-3xl font-bold font-hanken animate-in fade-in duration-1000 delay-200">Mateo Nunez</h1>
          </Fade>
          {/* Terminal  */}
          <Fade direction="left">
            <div className={s.terminal}>{/* <Terminal /> */}</div>
          </Fade>
          {/* Listening */}
          <Fade direction="right">
            <div className={s.listening}>{/* <Player /> */}</div>
          </Fade>
          {/* Last Article */}
          <div className={s.lastArticle}>
            <Fade>
              <h2 className="text-center subtitle">
                <Link href="/blog" title="Blog" aria-label="Blog" rel="canonical">
                  From the Blog
                </Link>
              </h2>
              {/* <ArticlePreview {...article.frontmatter} /> */}
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
