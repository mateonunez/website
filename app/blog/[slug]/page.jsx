import s from 'styles/pages/blog/[slug].module.css';

import Article from 'components/articles';
import { getArticle } from 'lib/articles/parser';
import urlJoin from 'url-join';
import config from 'lib/config';
import meta from 'lib/config/metadata.js';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { frontMatter } = await getArticle({ slug });

  return {
    ...meta,
    title: frontMatter.title,
    description: frontMatter.description,
    keywords: frontMatter.tags,
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description,
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
    }
  };
}

export default async function BlogArticle({ params }) {
  const { slug } = params;
  const { frontMatter, source } = await getArticle({ slug });

  return (
    <>
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
