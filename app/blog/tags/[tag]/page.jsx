import s from 'styles/pages/blog/tags/[tag].module.css';

import { Container, Title } from 'components';
import { getAllArticles } from 'lib/articles/parser';
import { kebapCase } from 'lib/helpers/string';
import ArticlePreview from 'components/articles/preview';

export default function BlogTag({ params }) {
  const { tag } = params;

  const articles = getAllArticles().filter(article => {
    return article.tags.map(tag => kebapCase(tag)).includes(tag);
  });

  return (
    <>
      {/* <NextSeo title={`${tag} Articles Archive`} /> */}

      <Container clean>
        <Title>{tag}</Title>

        <div className={s.root}>
          <div className="container">
            {articles.map(article => (
              <ArticlePreview key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
