import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { AppSidebar } from '@/components/mate/app-sidebar';
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
            <Separator orientation="vertical" className="mr-2 h-4" decorative />
            <div className="flex items-center gap-2">
              {/* biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation> */}
              <h1 className="text-2xl font-bold" tabIndex={0}>
                {title}
              </h1>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto mx-auto max-w-screen-lg">
          <div className="container mx-auto p-6">
            <div className="space-y-6">
              {(date || readingTime || tags) && (
                <div className="flex flex-col gap-4">
                  {(date || readingTime) && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {date && (
                        // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
                        <time dateTime={date} tabIndex={0}>
                          {new Date(date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      )}
                      {date && readingTime && <span aria-hidden="true">•</span>}
                      {readingTime && (
                        // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
                        <span tabIndex={0}>
                          <span className="sr-only">Estimated reading time:</span>
                          {readingTime} min read
                        </span>
                      )}
                    </div>
                  )}
                  {tags && tags.length > 0 && (
                    // biome-ignore lint/a11y/useSemanticElements: <explanation>
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Article tags">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          // biome-ignore lint/a11y/useSemanticElements: <explanation>
                          role="listitem"
                          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                          // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
                          tabIndex={0}
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
      </SidebarInset>
    </SidebarProvider>
  );
}
