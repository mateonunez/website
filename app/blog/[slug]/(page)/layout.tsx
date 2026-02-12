import type { ReactNode } from 'react';
import { PageHeader } from '@/components/mate/page-header';
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema';
import { getArticle, getArticleSlugs } from '@/lib/articles/parser';

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter } = await getArticle({ slug });

  const breadcrumbItems = [
    { name: 'Blog', href: '/blog' },
    { name: frontmatter.title, href: `/blog/${slug}` },
  ];

  return (
    <div className="flex-1 overflow-auto mx-auto w-full">
      <BreadcrumbSchema items={breadcrumbItems} />
      <PageHeader
        title={frontmatter.title}
        asHeading
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          ...breadcrumbItems.map((item) => ({ label: item.name, href: item.href })),
        ]}
      />
      {children}
    </div>
  );
}
