'use client';

import s from '@/components/legacy/articles/article.module.css';
import Article from '@/components/legacy/articles';
import type { Article as ArticleType } from '@/types/article';
import type { JSX } from 'react';

interface ArticlePageClientProps {
  compiledSource: ArticleType['compiledSource'];
  frontmatter: ArticleType['frontmatter'];
}

export default function ArticlePageClient({ compiledSource, frontmatter }: ArticlePageClientProps): JSX.Element {
  return (
    <div className={s.root}>
      <Article frontMatter={frontmatter} source={compiledSource} />
    </div>
  );
}
