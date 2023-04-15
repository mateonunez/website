import s from 'styles/pages/home.module.css';

import { Hero, About } from 'components';
import { getLastArticle } from 'lib/articles/parser';
import metadata from 'lib/config/metadata.js';

export { metadata };

export default async function HomePage() {
  const article = getLastArticle();

  return (
    <>
      <div className={s.root}>
        <Hero className="h-full" article={article} />

        <About className="h-full" />
      </div>
    </>
  );
}
