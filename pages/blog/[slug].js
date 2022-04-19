import s from 'styles/pages/blog/[slug].module.css';

import Footer from 'components/common/Footer';
import Header from 'components/header';
import { getArticle, getArticleSlugs } from 'lib/articles/parser';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import Article from 'components/articles';
import urlJoin from 'url-join';
import config from 'lib/config';

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { frontMatter, source } = await getArticle({ slug });

  return {
    props: {
      frontMatter,
      source
    }
  };
}

export async function getStaticPaths() {
  const paths = getArticleSlugs().map(slug => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false
  };
}

export default function BlogArticle({ frontMatter, source }) {
  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
        canonical={frontMatter.permalink}
        openGraph={{
          title: frontMatter.title,
          url: frontMatter.permalink,
          type: 'article',
          article: {
            authors: [frontMatter.author.name],
            tags: frontMatter.tags,
            publishedTime: frontMatter.date,
            modifiedTime: frontMatter.date
          },
          images: [
            {
              url: urlJoin(config.baseUrl, frontMatter.image),
              alt: frontMatter.title
            }
          ]
        }}
        twitter={{
          // missing author twitter account
          cardType: 'summary_large_image'
        }}
      />
      <ArticleJsonLd
        title={frontMatter.title}
        description={frontMatter.description}
        datePublished={frontMatter.date}
        dateModified={frontMatter.date}
        images={[urlJoin(config.baseUrl, frontMatter.image)]}
        url={frontMatter.permalink}
        authorName={frontMatter.author.name}
        publisherName={frontMatter.author.name}
        publisherLogo={frontMatter.author.image}
      />

      <Header />

      <div className={s.root}>
        <Article frontMatter={frontMatter} source={source} />
      </div>

      <Footer />
    </>
  );
}
