'use client';

import type { ReactNode } from 'react';
import { MDXLayout } from '@/components/mdx/layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface ArticleLayoutProps {
  title: string;
  date?: string;
  readingTime?: number;
  tags?: string[];
  author?: {
    name: string;
    image: string;
  };
  children: ReactNode;
}

export function ArticleLayout({ date, readingTime, tags, author, children }: ArticleLayoutProps) {
  return (
    <main className="flex-1 overflow-auto mx-auto lg:max-w-screen-lg">
      <div className="container mx-auto p-6">
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
                <div className="flex flex-wrap gap-2">
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

          {author && (
            <>
              <Separator className="my-6 opacity-70" />
              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:shadow-lg">
                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-80">
                  <div
                    className="absolute inset-0 bg-[length:200%_200%]"
                    style={{
                      backgroundImage: `linear-gradient(135deg,
              hsl(var(--primary)) / 0.1,
              transparent 30%,
              hsl(var(--primary)) / 0.1,
              transparent 70%,
              hsl(var(--primary)) / 0.1)`,
                      animation: 'gradientAnimation 8s ease infinite',
                    }}
                  />
                </div>

                {/* Glowing avatar container */}
                <div className="relative flex items-center gap-5">
                  <div className="relative">
                    <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 opacity-80 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg" />
                    <Avatar className="relative h-16 w-16 border-2 border-background shadow-lg">
                      <AvatarImage src={author.image} alt={author.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/10 to-secondary text-foreground font-semibold">
                        {author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80 transition-colors group-hover:text-primary">
                      Written by
                    </p>
                    <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary/90">
                      {author.name}
                    </h3>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
