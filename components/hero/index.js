import s from './hero.module.css';

import Terminal from 'components/terminal';
import { Player } from 'components/spotify';
import ArticlePreview from 'components/articles/preview';
import Link from 'next/link';
import { useRef } from 'react';
import Fade from 'components/animations/Fade';

export default function Hero({ article, ...props }) {
  const titleRef = useRef(null);
  const terminalRef = useRef(null);
  const playerRef = useRef(null);
  const lastArticleRef = useRef(null);

  return (
    <>
      <div {...props}>
        {/* Hero  */}
        <div className={s.root}>
          {/* Title  */}
          <Fade>
            <h1 className="title" ref={titleRef}>
              Mateo Nunez
            </h1>
          </Fade>
          {/* Terminal  */}
          <Fade direction="left">
            <div className={s.terminal} ref={terminalRef}>
              <Terminal />
            </div>
          </Fade>
          {/* Listening */}
          <Fade direction="right">
            <div className={s.listening} ref={playerRef}>
              <Player />
            </div>
          </Fade>
          {/* Last Article */}
          <div className={s.lastArticle} ref={lastArticleRef}>
            <Fade>
              <h2 className="text-center subtitle">
                <Link href="/blog">
                  <a title="Blog" aria-label="Blog" rel="canonical">
                    From the Blog
                  </a>
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
