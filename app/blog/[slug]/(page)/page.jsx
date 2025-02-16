import articleStyle from 'components/articles/article.module.css';
import articleContentStyle from 'components/articles/content/content.module.css';
import ArticlePageClient from './page-client';
import meta from 'lib/config/metadata.js';
import config from 'lib/config';
import { getArticle } from 'lib/articles/parser';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { frontmatter } = await getArticle({ slug });
  const baseUrl = new URL(config.baseUrl);
  const imagePath = frontmatter.image.startsWith('/') ? frontmatter.image : `/${frontmatter.image}`;
  const imageUrl = new URL(imagePath, baseUrl).toString();

  const dynamicMetadata = {
    ...meta,
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    openGraph: {
      ...meta.openGraph,
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      article: {
        authors: [frontmatter.author.name],
        tags: frontmatter.tags,
        publishedTime: frontmatter.date,
        modifiedTime: frontmatter.date,
      },
      images: [
        {
          url: imageUrl,
          alt: frontmatter.title,
        },
      ],
    },
  };
  return dynamicMetadata;
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const { compiledSource, frontmatter } = await getArticle({ slug });
  return (
    <div className={articleStyle.root}>
      <div className={articleContentStyle.root}>
        <ArticlePageClient source={compiledSource} frontmatter={frontmatter} />
      </div>
    </div>
  );
}
