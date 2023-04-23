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

export default function ArticleLayout({ children }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
