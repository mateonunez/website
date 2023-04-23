import s from 'styles/pages/blog/[slug].module.css';

import Article from 'components/articles';
import { cache } from 'react';
import { getArticle } from 'lib/articles/parser';

const fetchArticle = cache(async ({ slug }) => {
  const { frontMatter, source } = await getArticle({ slug });
  return { frontMatter, source };
});

export default async function BlogArticle({ params }) {
  const { slug } = params;
  const { frontMatter, source } = await fetchArticle({ slug });

  return (
    <>
      <div className={s.root}>
        <Article frontMatter={frontMatter} source={source} />
      </div>
    </>
  );
}
