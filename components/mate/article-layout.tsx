'use client';

import { MDXLayout } from '@/components/mdx/layout';
import type { ReactNode } from 'react';

interface ArticleLayoutProps {
  title: string;
  date?: string;
  readingTime?: number;
  tags?: string[];
  children: ReactNode;
}

export function ArticleLayout({ date, readingTime, tags, children }: ArticleLayoutProps) {
  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {(date || readingTime || tags) && (
          <div className="flex flex-col gap-4">
            {(date || readingTime) && (
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {date && (
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
                {date && readingTime && <span aria-hidden="true">•</span>}
                {readingTime && (
                  <span>
                    <span className="sr-only">Estimated reading time:</span>
                    {readingTime} min read
                  </span>
                )}
              </div>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2" aria-label="Article tags">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <MDXLayout>{children}</MDXLayout>
      </div>
    </>
  );
}
