'use client';

import s from 'components/articles/article.module.css';

import { MDXRemote } from 'next-mdx-remote';
import * as mdxComponents from 'components/articles/mdx';
import ArticleMeta from 'components/articles/meta';
import ArticleTitle from 'components/articles/title';

export default function ArticlePageClient({ source, frontmatter }) {
  const { title, date, author, tags, readingTime } = frontmatter;

  return (
    <div className={s.root}>
      <ArticleMeta date={date} author={author} tags={tags} readingTime={readingTime} />

      <ArticleTitle title={title} />

      <MDXRemote compiledSource={source} components={mdxComponents} />
    </div>
  );
}
