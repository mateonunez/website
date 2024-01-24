'use client';

import s from 'components/articles/article.module.css';
import Article from 'components/articles';

export default function ArticlePageClient({ source, frontmatter }) {
  return (
    <div className={s.root}>
      <Article
        frontMatter={frontmatter}
        source={source}
      />
    </div>
  );
}
