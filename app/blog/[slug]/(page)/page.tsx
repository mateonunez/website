import articleStyle from '@/components/legacy/articles/article.module.css';
import articleContentStyle from '@/components/legacy/articles/content/content.module.css';
import ArticlePageClient from './page-client';
import meta from '@/lib/config/metadata';
import config from '@/lib/config';
import { getArticle } from '@/lib/articles/parser';
import type { Metadata } from 'next';
import type { JSX } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const { slug } = await params;
  const { compiledSource, frontmatter } = await getArticle({ slug });

  return (
    <div className={articleStyle.root}>
      <div className={articleContentStyle.root}>
        <ArticlePageClient compiledSource={compiledSource} frontmatter={frontmatter} />
      </div>
    </div>
  );
}
