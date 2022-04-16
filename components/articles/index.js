import s from './article.module.css';

import ArticleMeta from './meta';
import ArticleTitle from './title';
import ArticleContent from './content';

export default function Article({ frontMatter, source }) {
  const { title, date, author, tags, readingTime } = frontMatter;

  return (
    <>
      <div className={s.root}>
        <ArticleMeta date={date} author={author} tags={tags} readingTime={readingTime} />

        <ArticleTitle title={title} />

        <ArticleContent {...source} />
      </div>
    </>
  );
}
