import type { Metadata } from 'next';
import type { JSX } from 'react';
import { memo, Suspense } from 'react';
import { ArticlePreviewSkeleton } from '@/components/mate/article-preview.skeleton';
import { Articles } from '@/components/mate/articles';
import { Main } from '@/components/mate/main';
import { PageHeader } from '@/components/mate/page-header';
import meta from '@/lib/config/metadata';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Articles written with ❤️ by ${meta.author.name} and the Community. ${meta.description}`,
  keywords: [...meta.keywords, 'blog', 'articles'],
};

const Header = memo(() => (
  <PageHeader
    title="Articles"
    subtitle="Articles written with ❤️ by me and the Community."
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
      <Main>
        <ArticlesContent />
      </Main>
    </>
  );
}
