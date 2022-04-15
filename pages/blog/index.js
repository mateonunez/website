import s from 'styles/pages/blog.module.css';

import Footer from 'components/common/Footer';
import Header from 'components/header';
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
  console.log(articles);

  return (
    <>
      <NextSeo
        title="Blog"
        description="Articles written with ❤️ by Mateo Nunez."
        openGraph={{
          title: 'Blog'
        }}
      />

      <Header />

      <div className={s.root}>
        <div className="container">
          {articles.map(article => (
            <ArticlePreview
              key={article.slug}
              author={article.author.name}
              authorImage={article.author.image}
              date={article.date}
              title={article.title}
              description={article.description}
              image={article.image}
              slug={article.slug}
              tags={article.tags}
              readingTime={article.readingTime}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
