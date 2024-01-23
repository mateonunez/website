'use client';

import s from 'components/articles/article.module.css';

import ArticleMeta from 'components/articles/meta';
import ArticleTitle from 'components/articles/title';
import ArticleContent from 'components/articles/content';

export default function ArticlePageClient({ source, frontmatter }) {
  const { title, date, author, tags, readingTime } = frontmatter;

  return (
    <div className={s.root}>
      <ArticleMeta date={date} author={author} tags={tags} readingTime={readingTime} />

      <ArticleTitle title={title} />

      <ArticleContent source={source} />
    </div>
  );
}
