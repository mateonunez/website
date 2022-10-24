import s from 'styles/pages/blog/tags/[tag].module.css';

import { Container, Title } from 'components';
import { getAllArticles } from 'lib/articles/parser';
import { kebapCase } from 'lib/helpers/string';
import { NextSeo } from 'next-seo';
import ArticlePreview from 'components/articles/preview';

export async function getStaticProps({ params }) {
  const { tag } = params;
  const articles = getAllArticles().filter(article => {
    return article.tags.map(tag => kebapCase(tag)).includes(tag);
  });

  return {
    props: {
      articles,
      tag
    }
  };
}

export async function getStaticPaths() {
  const tags = getAllArticles().reduce((acc, article) => {
    article.tags.forEach(tag => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });

    return acc;
  }, []);

  const paths = tags.map(tag => ({
    params: { tag: kebapCase(tag) }
  }));

  return {
    paths,
    fallback: false
  };
}

export default function BlogTag({ articles, tag }) {
  return (
    <>
      <NextSeo title={`${tag} Articles Archive`} />

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
