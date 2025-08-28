import type { ReactNode } from 'react';
import { PageHeader } from '@/components/mate/page-header';
import { getArticle } from '@/lib/articles/parser';
import { createJSONLD, getBreadcrumbSchema } from '@/lib/seo/json-ld';

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
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: frontmatter.title, href: `/blog/${slug}` },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

  return (
    <div className="flex-1 overflow-auto mx-auto w-full">
      {/** biome-ignore lint/correctness/useUniqueElementIds: This is a static page and the ID is unique. */}
      <script
        type="application/ld+json"
        id="breadcrumb-schema"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a trusted source.
        dangerouslySetInnerHTML={{ __html: createJSONLD(breadcrumbSchema) }}
      />
      <PageHeader
        title={frontmatter.title}
        breadcrumbItems={breadcrumbItems.map((item) => ({ label: item.name, href: item.href }))}
      />
      {children}
    </div>
  );
}
