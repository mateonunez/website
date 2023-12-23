import s from 'styles/pages/blog/authors/[author].module.css';

import { Container, Title } from 'components';
import { getAllArticles } from 'lib/articles/parser';
import ArticlePreview from 'components/articles/preview';
import { kebapCase } from 'lib/helpers/string';

export async function generateMetadata({ params }) {
  const { author } = params;

  return {
    title: `> blog - ${author}`,
  };
}

export default async function BlogAuthor({ params }) {
  const { author } = params;

  const articles = (await getAllArticles()).filter((article) => kebapCase(article.author.name) === author);

  return (
    <>
      <Container clean>
        {/* Capitalize author */}
        <Title>{author.at(0).toUpperCase() + author.slice(1)}</Title>

        <div className={s.root}>
          <div className="container">
            {articles.map((article) => (
              <ArticlePreview key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
