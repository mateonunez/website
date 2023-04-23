import { cache } from 'react';
import { getArticle, getArticleSlugs } from 'lib/articles/parser';
import urlJoin from 'url-join';
import config from 'lib/config';
import meta from 'lib/config/metadata.js';

const fetchArticle = cache(async ({ slug }) => {
  const { frontMatter, source } = await getArticle({ slug });
  return { frontMatter, source };
});

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { frontMatter } = await fetchArticle({ slug });

  console.time('generateMetadata');
  const dynamicMeta = {
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
  console.timeEnd('generateMetadata');

  return dynamicMeta;
}

export async function generateStaticParams() {
  const articles = await getArticleSlugs();
  return articles.map(slug => ({ params: { slug } }));
}

export default function ArticleLayout({ children }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
