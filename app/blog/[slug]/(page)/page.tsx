import type { Metadata } from 'next';
import type { JSX } from 'react';
import { Suspense } from 'react';
import { ArticleAnalytics } from '@/components/mate/article-analytics';
import { ArticleLayout } from '@/components/mate/article-layout';
import { Main } from '@/components/mate/main';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { getArticle, getArticleSlugs, getRelatedArticles } from '@/lib/articles/parser';
import config from '@/lib/config';
import { getArticleSeries, getSeriesOrder } from '@/lib/config/article-series';
import meta from '@/lib/config/metadata';
import { getBlogPostingSchema } from '@/lib/seo/json-ld';

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

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
      images: [{ url: imageUrl, alt: frontmatter.title, width: 1200, height: 630 }],
      locale: 'en_US',
      siteName: meta.openGraph?.siteName,
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.date,
      authors: [frontmatter.author.name],
      tags: frontmatter.tags,
    } as any,
    twitter: {
      ...meta.twitter,
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: {
        url: imageUrl,
        alt: frontmatter.title,
      },
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const { slug } = await params;
  const { content, frontmatter } = await getArticle({ slug });
  const relatedArticles = await getRelatedArticles(frontmatter);

  const seriesData = getArticleSeries(slug);
  const seriesOrder = getSeriesOrder(slug, seriesData);
  const series = seriesData && seriesOrder ? { seriesData, currentOrder: seriesOrder } : undefined;

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
      <JsonLdScript data={getBlogPostingSchema(frontmatter)} />
      <ArticleAnalytics title={frontmatter.title} />
      <ArticleLayout
        title={frontmatter.title}
        slug={frontmatter.slug}
        date={frontmatter.date}
        readingTime={frontmatter.readingTime}
        tags={frontmatter.tags}
        author={frontmatter.author}
        description={frontmatter.description}
        image={frontmatter.image}
        relatedArticles={relatedArticles}
        series={series}
      >
        {content}
      </ArticleLayout>
    </Suspense>
  );
}
