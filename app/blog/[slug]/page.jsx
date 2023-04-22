import s from 'styles/pages/blog/[slug].module.css';

import { cache } from 'react';
import Article from 'components/articles';
import { getArticle } from 'lib/articles/parser';
import urlJoin from 'url-join';
import config from 'lib/config';
import meta from 'lib/config/metadata.js';

export const revalidate = 60 * 60 * 24; // 24 hours

export const fetchArticle = cache(async ({ slug }) => {
  const { frontMatter, source } = await getArticle({ slug });
  return { frontMatter, source };
});

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { frontMatter } = await fetchArticle({ slug });

  return {
    ...meta,
    title: frontMatter.title,
    description: frontMatter.description,
    keywords: frontMatter.tags,
    openGraph: {
      ...meta.openGraph,
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
  const { frontMatter, source } = await fetchArticle({ slug });

  return (
    <>
      <div className={s.root}>
        <Article frontMatter={frontMatter} source={source} />
      </div>
    </>
  );
}
