import { Suspense, memo } from 'react';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import meta from '@/lib/config/metadata';
import { ArticlePreviewSkeleton } from '@/components/mate/article-preview.skeleton';
import { Articles } from '@/components/mate/articles';
import { PageHeader } from '@/components/mate/page-header';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Articles written with ❤️ by ${meta.author.name} and the Community. ${meta.description}`,
  keywords: [...meta.keywords, 'blog', 'articles'],
};

const Header = memo(() => (
  <PageHeader
    title="Articles"
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
      <Header />
      <main className="flex-1 overflow-auto mx-auto lg:max-w-screen-lg">
        <div className="container mx-auto p-6">
          <ArticlesContent />
        </div>
      </main>
    </>
  );
}
