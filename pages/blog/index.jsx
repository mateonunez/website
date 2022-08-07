import s from 'styles/pages/blog/index.module.css';

import { Container, Footer, Header, Title } from 'components';

import ArticlePreview from 'components/articles/preview';

import { getAllArticles } from 'lib/articles/parser';
import { NextSeo } from 'next-seo';

export async function getServerSideProps() {
  const articles = getAllArticles();

  return {
    props: {
      articles
    }
  };
}

export default function Blog({ articles }) {
  return (
    <>
      <NextSeo
        title="Blog"
        description="Articles written with ❤️ by Mateo Nunez."
        openGraph={{
          title: "Mateo's Blog"
        }}
      />

      <Header />

      <Container clean>
        <Title>Blog</Title>

        <div className={s.root}>
          <div className="container">
            {articles.map(article => (
              <ArticlePreview key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}
