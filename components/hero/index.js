import s from './hero.module.css';

import Terminal from 'components/terminal';
import { Player } from 'components/spotify';
import ArticlePreview from 'components/articles/preview';
import Link from 'next/link';

export default function Hero({ article, ...props }) {
  return (
    <>
      <div {...props}>
        {/* Hero  */}
        <div className={s.root}>
          {/* Title  */}
          <h1 className="title">Mateo Nunez</h1>

          {/* Terminal  */}
          <div className={s.terminal}>
            <Terminal />
          </div>

          {/* Listening */}
          <div className={s.listening}>
            <Player />
          </div>

          {/* Last Article */}
          <div className={s.lastArticle}>
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
