import s from 'styles/pages/blog/authors/[author].module.css';

import { Container, Title } from 'components';
import { getAllArticles } from 'lib/articles/parser';
import ArticlePreview from 'components/articles/preview';
import { NextSeo } from 'next-seo';
import { kebapCase } from 'lib/helpers/string';

export async function getStaticProps({ params }) {
  const { author } = params;
  const articles = getAllArticles().filter(article => kebapCase(article.author.name) === author);

  return {
    props: {
      articles,
      author
    }
  };
}

export async function getStaticPaths() {
  const authors = getAllArticles().reduce((acc, article) => {
    if (!acc.includes(article.author)) {
      acc.push(article.author.name);
    }

    return acc;
  }, []);

  const paths = Array.from(new Set(authors)).map(author => ({
    params: { author: kebapCase(author) }
  }));

  return {
    paths,
    fallback: false
  };
}

export default function BlogAuthor({ articles, author }) {
  return (
    <>
      <NextSeo title={`${author.at(0).toUpperCase() + author.slice(1)} Articles Archive`} />

      <Container clean>
        <Title>{author}</Title>

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
