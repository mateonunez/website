import s from 'styles/pages/home.module.css';

import { Hero, About } from 'components';
import { getLastArticle } from 'lib/articles/parser';

export default async function HomePage() {
  const article = await getLastArticle();
  console.log({ article });

  return (
    <>
      <div className={s.root}>
        <Hero className="h-full" article={article} />

        <About className="h-full" />
      </div>
    </>
  );
}
