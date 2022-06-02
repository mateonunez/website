import s from './hero.module.css';

import Terminal from 'components/terminal/terminal';
import { Player } from 'components/spotify';
import ArticlePreview from 'components/articles/preview';
import Link from 'next/link';
import Fade from 'components/animations/Fade';

export default function Hero({ article, ...props }) {
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
