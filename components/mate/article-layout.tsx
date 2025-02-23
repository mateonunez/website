import { MDXLayout } from '@/components/mdx/layout';
import type { ReactNode } from 'react';

interface ArticleLayoutProps {
  title: string;
  date?: string;
  readingTime?: number;
  tags?: string[];
  children: ReactNode;
}

export function ArticleLayout({ title, date, readingTime, tags, children }: ArticleLayoutProps) {
  return (
    <>
      <header className="flex h-auto min-h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear px-4 py-3 sm:py-4 md:h-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
          <h1 className="text-3xl font-bold font-hanken animate-in fade-in duration-1000 delay-200 break-words">
            {title}
          </h1>
        </div>
      </header>
      <main className="flex-1 max-w-screen">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="space-y-4 sm:space-y-6">
            {(date || readingTime || tags) && (
              <div className="flex flex-col gap-3">
                {(date || readingTime) && (
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
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
                        className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
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
        </div>
      </main>
    </>
  );
}
