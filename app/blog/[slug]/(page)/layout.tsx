import type { ReactNode } from 'react';
import { PageHeader } from '@/components/mate/page-header';
import { getArticle } from '@/lib/articles/parser';

export default async function ArticleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter } = await getArticle({ slug });

  return (
    <div className="flex-1 overflow-auto mx-auto max-w-dvw">
      <PageHeader
        title={frontmatter.title}
        breadcrumbItems={[
          {
            label: 'Blog',
            href: '/blog',
          },
          {
            label: frontmatter.title,
          },
        ]}
      />
      {children}
    </div>
  );
}
