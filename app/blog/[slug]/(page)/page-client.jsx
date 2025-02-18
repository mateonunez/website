'use client';

import s from '@/components/legacy/articles/article.module.css';
import Article from '@/components/legacy/articles';

export default function ArticlePageClient({ source, frontmatter }) {
  return (
    <div className={s.root}>
      <Article frontMatter={frontmatter} source={source} />
    </div>
  );
}
