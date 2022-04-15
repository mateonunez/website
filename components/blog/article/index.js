import s from './article.module.css';

import ArticleHeader from './header';
import ArticleContent from './content';

export default function Article({ readingTime, title, description, date, ogImage, content }) {
  return (
    <>
      <div className={s.articleContainer}>
        <ArticleHeader
          readingTime={readingTime}
          title={title}
          description={description}
          date={date}
          ogImage={ogImage}
        />

        <ArticleContent content={content} />

        <hr />
      </div>
    </>
  );
}
