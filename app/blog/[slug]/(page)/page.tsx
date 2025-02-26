import { Suspense, memo } from 'react';
import { getArticle } from '@/lib/articles/parser';
import { ArticleLayout } from '@/components/mate/article-layout';
import meta from '@/lib/config/metadata';
import config from '@/lib/config';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import type { Article } from '@/types/article';

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

const ArticleContent = memo(({ content, frontmatter }: Article) => (
  <main className="flex-1 overflow-auto mx-auto lg:max-w-screen-lg">
    <div className="container mx-auto p-6">
      <ArticleLayout
        title={frontmatter.title}
        date={frontmatter.date}
        readingTime={frontmatter.readingTime}
        tags={frontmatter.tags}
      >
        {content}
      </ArticleLayout>
    </div>
  </main>
));

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const { slug } = await params;
  const { content, frontmatter } = await getArticle({ slug });

  return (
    <Suspense
      fallback={
        <main className="flex-1 overflow-auto mx-auto lg:max-w-screen-lg">
          <div className="container mx-auto p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          </div>
        </main>
      }
    >
      <ArticleContent content={content} frontmatter={frontmatter} />
    </Suspense>
  );
}
