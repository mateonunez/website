import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface SeriesArticle {
  title: string;
  slug: string;
  order: number;
}

interface ArticleSeriesNavProps {
  seriesName: string;
  currentOrder: number;
  articles: SeriesArticle[];
}

export const ArticleSeriesNav = memo(({ seriesName, currentOrder, articles }: ArticleSeriesNavProps) => {
  const sortedArticles = [...articles].sort((a, b) => a.order - b.order);
  const currentIndex = sortedArticles.findIndex((article) => article.order === currentOrder);
  const previousArticle = currentIndex > 0 ? sortedArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < sortedArticles.length - 1 ? sortedArticles[currentIndex + 1] : null;

  return (
    <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-amber-500/20">
      <CardContent className="p-4 md:p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-amber-500/50 text-amber-500">
              Series
            </Badge>
            <span className="text-sm font-medium">{seriesName}</span>
            <Badge variant="secondary" className="ml-auto">
              Part {currentOrder} of {articles.length}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {previousArticle ? (
              <Link
                href={`/blog/${previousArticle.slug}`}
                className="flex items-center gap-2 p-3 rounded-md border border-border/50 hover:border-amber-500/50 hover:bg-muted/50 transition-all group"
              >
                <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Previous</p>
                  <p className="text-sm font-medium truncate group-hover:text-amber-500 transition-colors">
                    {previousArticle.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <Link
                href={`/blog/${nextArticle.slug}`}
                className="flex items-center gap-2 p-3 rounded-md border border-border/50 hover:border-amber-500/50 hover:bg-muted/50 transition-all group md:justify-self-end"
              >
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-xs text-muted-foreground">Next</p>
                  <p className="text-sm font-medium truncate group-hover:text-amber-500 transition-colors">
                    {nextArticle.title}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-500 transition-colors" />
              </Link>
            ) : null}
          </div>

          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">All articles in this series:</p>
            <div className="space-y-1">
              {sortedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className={`flex items-center gap-2 text-sm p-2 rounded-md transition-colors ${
                    article.order === currentOrder
                      ? 'bg-amber-500/10 text-amber-500 font-medium'
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Badge
                    variant={article.order === currentOrder ? 'default' : 'outline'}
                    className="w-6 h-6 p-0 flex items-center justify-center text-xs"
                  >
                    {article.order}
                  </Badge>
                  <span className="truncate">{article.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ArticleSeriesNav.displayName = 'ArticleSeriesNav';
