import { Suspense } from 'react';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import meta from '@/lib/config/metadata';
import { ArticlePreviewSkeleton } from '@/components/mate/article-preview.skeleton';
import { Articles } from '@/components/mate/articles';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Articles written with ❤️ by ${meta.author.name} and the Community. ${meta.description}`,
  keywords: [...meta.keywords, 'blog', 'articles'],
};

export default function BlogPage(): JSX.Element {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 mx-auto">
          <h1 className="text-2xl text-center font-bold">Blog</h1>
        </div>
      </header>
      <main className="flex-1 overflow-auto mx-auto max-w-screen-lg">
        <div className="container mx-auto p-6">
          <div className="space-y-6">
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
        </div>
      </main>
    </>
  );
}
