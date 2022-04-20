import s from './hero.module.css';

import Terminal from 'components/terminal';
import { Player } from 'components/spotify';
import ArticlePreview from 'components/articles/preview';
import Link from 'next/link';
import { useAnimation, useTimeline } from 'lib/hooks/useAnimation';
import { useCallback, useRef } from 'react';

export default function Hero({ article, ...props }) {
  const timeline = useTimeline();

  const titleRef = useRef(null);
  const terminalRef = useRef(null);
  const playerRef = useRef(null);
  const lastArticleRef = useRef(null);

  const animation = useCallback(
    () => ({
      from: {
        opacity: 0,
        x: -100
      },
      to: {
        opacity: 1,
        x: 0,
        ease: 'power2.inOut',
        duration: 0.7
      }
    }),
    []
  );

  useAnimation(titleRef, animation, [timeline]);

  useAnimation(terminalRef, animation, [timeline]);
  useAnimation(playerRef, animation, [timeline]);
  useAnimation(lastArticleRef, animation, [timeline]);

  return (
    <>
      <div {...props}>
        {/* Hero  */}
        <div className={s.root}>
          {/* Title  */}
          <h1 className="title" ref={titleRef}>
            Mateo Nunez
          </h1>
          {/* Terminal  */}
          <div className={s.terminal} ref={terminalRef}>
            <Terminal />
          </div>
          {/* Listening */}
          <div className={s.listening} ref={playerRef}>
            <Player />
          </div>
          {/* Last Article */}
          <div className={s.lastArticle} ref={lastArticleRef}>
            <h2 className="mx-auto subtitle">
              <Link href="/blog">
                <a title="Blog" aria-label="Blog" rel="canonical">
                  From the Blog
                </a>
              </Link>
            </h2>
            <ArticlePreview {...article} />
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
