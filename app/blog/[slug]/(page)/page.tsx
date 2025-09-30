import type { Metadata } from 'next';
import type { JSX } from 'react';
import { Suspense } from 'react';
import { ArticleLayout } from '@/components/mate/article-layout';
import { Main } from '@/components/mate/main';
import { getArticle, getRelatedArticles } from '@/lib/articles/parser';
import config from '@/lib/config';
import meta from '@/lib/config/metadata';
import { createJSONLD, getBlogPostingSchema } from '@/lib/seo/json-ld';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getArticle({ slug });
  const baseUrl = new URL(config.baseUrl);
  const imagePath = frontmatter.image.startsWith('/') ? frontmatter.image : `/${frontmatter.image}`;
  const imageUrl = new URL(imagePath, baseUrl).toString();
  const canonicalUrl = new URL(`/blog/${slug}`, baseUrl).toString();

  return {
    ...meta,
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      ...meta.openGraph,
      url: canonicalUrl,
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
    twitter: {
      ...meta.twitter,
      title: frontmatter.title,
      description: frontmatter.description,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const { slug } = await params;
  const { content, frontmatter } = await getArticle({ slug });
  const relatedArticles = await getRelatedArticles(frontmatter);

  return (
    <Suspense
      fallback={
        <Main>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </Main>
      }
    >
      {/** biome-ignore lint/correctness/useUniqueElementIds: This is a static page and the ID is unique. */}
      <script
        type="application/ld+json"
        id="blog-posting-schema"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a trusted source.
        dangerouslySetInnerHTML={{ __html: createJSONLD(getBlogPostingSchema(frontmatter)) }}
      />
      <ArticleLayout
        title={frontmatter.title}
        date={frontmatter.date}
        readingTime={frontmatter.readingTime}
        tags={frontmatter.tags}
        author={frontmatter.author}
        relatedArticles={relatedArticles}
      >
        {content}
      </ArticleLayout>
    </Suspense>
  );
}
