'use client';

import s from './article.module.css';

import ArticleMeta from './meta';
import ArticleTitle from './title';
import ArticleContent from './content';
import type { Article as ArticleType } from '@/types/article';
import type { JSX } from 'react';

interface ArticleProps {
  frontMatter: ArticleType['frontmatter'];
  source: ArticleType['compiledSource'];
}

export default function Article({ frontMatter, source }: ArticleProps): JSX.Element {
  const { title, date, author, tags, readingTime } = frontMatter;

  return (
    <div className={s.root}>
      <ArticleMeta date={date} author={author} tags={tags} readingTime={readingTime} />
      <ArticleTitle title={title} />
      <ArticleContent compiledSource={source} />
    </div>
  );
}
