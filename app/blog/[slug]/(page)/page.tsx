import { getArticle } from '@/lib/articles/parser';
import { ArticleLayout } from '@/components/mate/article-layout';
import meta from '@/lib/config/metadata';
import config from '@/lib/config';
import type { Metadata } from 'next';
import type { JSX } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getArticle({ slug });
  const baseUrl = new URL(config.baseUrl);
  const imagePath = frontmatter.image.startsWith('/') ? frontmatter.image : `/${frontmatter.image}`;
  const imageUrl = new URL(imagePath, baseUrl).toString();

  return {
    ...meta,
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    openGraph: {
      ...meta.openGraph,
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      // @ts-expect-error - article is not typed on OpenGraph
      article: {
        authors: [frontmatter.author.name],
        tags: frontmatter.tags,
        publishedTime: frontmatter.date,
        modifiedTime: frontmatter.date,
      },
      images: [{ url: imageUrl, alt: frontmatter.title }],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const { slug } = await params;
  const { content, frontmatter } = await getArticle({ slug });

  return (
    <ArticleLayout
      title={frontmatter.title}
      date={frontmatter.date}
      readingTime={frontmatter.readingTime}
      tags={frontmatter.tags}
    >
      {content}
    </ArticleLayout>
  );
}
