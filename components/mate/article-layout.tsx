import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArticleComments } from '@/components/mate/article-comments';
import { ArticleSeriesNav } from '@/components/mate/article-series-nav';
import { Main } from '@/components/mate/main';
import { MDXLayout } from '@/components/mdx/layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShareButton } from '@/components/ui/share-button';
import type { ArticleSeries } from '@/lib/config/article-series';
import { buildCanonicalUrl } from '@/lib/utils/sharing/url-builder';
import type { Article } from '@/types/article';
import type { ShareableArticle } from '@/types/sharing';

interface ArticleLayoutProps {
  title: string;
  slug?: string;
  date?: string;
  readingTime?: number;
  tags?: string[];
  author?: {
    name: string;
    image: string;
  };
  description?: string;
  image?: string;
  relatedArticles?: Article[];
  series?: {
    seriesData: ArticleSeries;
    currentOrder: number;
  };
  children: ReactNode;
}

export function ArticleLayout({
  title,
  slug,
  date,
  readingTime,
  tags,
  author,
  description,
  image,
  relatedArticles,
  series,
  children,
}: ArticleLayoutProps) {
  return (
    <Main>
      <div className="space-y-6 sm:space-y-8">
        {series && (
          <ArticleSeriesNav
            seriesName={series.seriesData.name}
            currentOrder={series.currentOrder}
            articles={series.seriesData.articles}
          />
        )}

        {(date || readingTime || tags || slug) && (
          <div className="flex flex-col gap-4">
            {(date || readingTime || slug) && (
              <div className="flex flex-wrap items-center justify-between gap-3">
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
                {slug && (
                  <ShareButton
                    content={
                      {
                        type: 'article',
                        url: buildCanonicalUrl('article', slug),
                        title,
                        description,
                        image,
                        tags,
                        author: author?.name || 'Mateo Nunez',
                        date: date || '',
                        readingTime,
                      } as ShareableArticle
                    }
                    variant="outline"
                    size="sm"
                    showLabel
                    showTooltip={false}
                  />
                )}
              </div>
            )}
            {tags &&
              tags.length > 0 &&
              (() => {
                const MAX_VISIBLE_TAGS = 5;
                const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
                const remainingTagsCount = tags.length - visibleTags.length;
                return (
                  <div className="flex flex-wrap gap-2">
                    {visibleTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-mono text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {remainingTagsCount > 0 && (
                      <Badge key="tags-overflow" variant="secondary" className="font-mono text-xs">
                        +{remainingTagsCount}
                      </Badge>
                    )}
                  </div>
                );
              })()}
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

        {relatedArticles && relatedArticles.length > 0 && (
          <>
            <Separator className="my-6 opacity-70" />
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Related Articles</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.frontmatter.slug}
                    href={`/blog/${article.frontmatter.slug}`}
                    className="flex flex-col gap-2 rounded-lg border p-4 hover:bg-muted/50"
                  >
                    <h4 className="font-bold">{article.frontmatter.title}</h4>
                    <p className="text-sm text-muted-foreground">{article.frontmatter.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {slug && <ArticleComments slug={slug} />}
      </div>
    </Main>
  );
}
