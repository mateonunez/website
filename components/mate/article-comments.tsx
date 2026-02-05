'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { memo, useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import personal from '@/lib/config/personal';

interface ArticleCommentsProps {
  slug: string;
}

export const ArticleComments = memo(function ArticleComments({ slug }: ArticleCommentsProps) {
  const { resolvedTheme } = useTheme();

  const giscusTheme = useMemo(() => {
    return resolvedTheme === 'dark' ? 'dark_dimmed' : 'light';
  }, [resolvedTheme]);

  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repoId || !category || !categoryId) {
    return null;
  }

  return (
    <div className="mt-8">
      <Separator className="my-6 opacity-70" />
      <div className="pt-4">
        <h3 className="text-2xl font-bold mb-6">Discussion</h3>
        <Giscus
          repo="mateonunez/website"
          repoId={repoId}
          category={category}
          categoryId={categoryId}
          mapping="title"
          term={slug}
          strict="0"
          reactionsEnabled="1"
          emitMetadata="1"
          inputPosition="top"
          theme={giscusTheme}
          lang="en"
          loading="lazy"
        />
      </div>
    </div>
  );
});

ArticleComments.displayName = 'ArticleComments';
