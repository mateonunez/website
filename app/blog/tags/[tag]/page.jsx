import s from 'styles/pages/blog/tags/[tag].module.css';

import { Container, Title } from 'components';
import { getAllArticles } from 'lib/articles/parser';
import { kebapCase } from 'lib/helpers/string';
import ArticlePreview from 'components/articles/preview';

export function generateMetadata({ params }) {
  const { tag } = params;

  return {
    title: `> blog - ${tag}`,
  };
}

export default async function BlogTag({ params }) {
  const { tag } = params;

  const articles = (await getAllArticles()).filter((article) => {
    return article.tags.map((tag) => kebapCase(tag)).includes(tag);
  });

  return (
    <Container clean>
      <Title>{tag}</Title>

      <div className={s.root}>
        <div className="container">
          {articles.map((article) => (
            <ArticlePreview key={article.slug} {...article} />
          ))}
        </div>
      </div>
    </Container>
  );
}
