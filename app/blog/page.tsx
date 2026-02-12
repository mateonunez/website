import type { Metadata } from 'next';
import type { JSX } from 'react';
import { memo, Suspense } from 'react';
import { ArticlePreviewSkeleton } from '@/components/mate/article-preview.skeleton';
import { Articles } from '@/components/mate/articles';
import { Main } from '@/components/mate/main';
import { PageHeader } from '@/components/mate/page-header';
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema';
import meta from '@/lib/config/metadata';

export const metadata: Metadata = {
  title: 'Blog - Technical Articles & Tutorials',
  description: `Where can I find ${meta.author.name}'s blog posts? Read technical articles about Node.js testing, TypeScript, Next.js, AI engineering, and modern web development. Learn best practices, migration guides, and developer insights.`,
  keywords: [
    ...meta.keywords,
    'blog',
    'articles',
    'tutorials',
    'node test runner',
    'testing',
    'technical writing',
    'how to',
  ],
};

const Header = memo(() => (
  <PageHeader
    title="Articles"
    subtitle="Articles written with ❤️ by me and the Community."
    asHeading
    breadcrumbItems={[
      {
        label: 'Blog',
        href: '/blog',
      },
    ]}
  />
));

const ArticlesContent = memo(() => (
  <div className="space-y-8">
    <Suspense
      fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ArticlePreviewSkeleton />
          <ArticlePreviewSkeleton />
          <ArticlePreviewSkeleton />
        </div>
      }
    >
      <Articles />
    </Suspense>
  </div>
));

export default function BlogPage(): JSX.Element {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Blog', href: '/blog' }]} />
      <Header />
      <Main>
        <ArticlesContent />
      </Main>
    </>
  );
}
