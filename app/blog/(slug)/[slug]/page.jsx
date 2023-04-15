import s from 'styles/pages/blog/[slug].module.css';

import Article from 'components/articles';
import { getArticle, getArticleSlugs } from 'lib/articles/parser';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import urlJoin from 'url-join';
import config from 'lib/config';

export default async function BlogArticle({ params }) {
  const { slug } = params;
  const { frontMatter, source } = await getArticle({ slug });

  return (
    <>
      {/* <NextSeo
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
        twitter={config.twitter}
      /> */}
      {/* <ArticleJsonLd
        title={frontMatter.title}
        description={frontMatter.description}
        datePublished={frontMatter.date}
        dateModified={frontMatter.date}
        images={[urlJoin(config.baseUrl, frontMatter.image)]}
        url={frontMatter.permalink}
        authorName={frontMatter.author.name}
        publisherName={frontMatter.author.name}
        publisherLogo={frontMatter.author.image}
      /> */}

      <div className={s.root}>
        <Article frontMatter={frontMatter} source={source} />
      </div>
    </>
  );
}
