import { ArrowRight, CalendarDays } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ShareButton } from '@/components/ui/share-button';
import { dateForHumans } from '@/lib/helpers/date';
import { buildCanonicalUrl } from '@/lib/utils/sharing/url-builder';
import type { ArticleFrontmatter } from '@/types/article';
import type { ShareableArticle } from '@/types/sharing';
import { AnimatedItem } from '../ui/animated-container';

type ArticlePreviewProps = Pick<
  ArticleFrontmatter,
  'author' | 'date' | 'title' | 'description' | 'image' | 'slug' | 'tags'
> & {
  priority?: boolean;
};

export function ArticlePreview({
  author,
  date,
  title,
  description,
  image,
  slug,
  tags,
  priority = false,
}: ArticlePreviewProps) {
  const MAX_VISIBLE_TAGS = 5;
  const visibleTags = (tags ?? []).slice(0, MAX_VISIBLE_TAGS);
  const remainingTagsCount = (tags?.length ?? 0) - visibleTags.length;
  return (
    <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 card-hover-lift hover:border-amber-500/30 overflow-hidden">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative h-[200px] md:h-[260px] w-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900/80 to-gray-900/20" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-x-0 bottom-0 z-20 p-4 md:p-6">
            <CardTitle className="line-clamp-2 text-lg md:text-xl text-white">{title}</CardTitle>
          </div>
        </div>
      </Link>

      <CardContent className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.image} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium leading-none">{author.name}</p>
            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              <time dateTime={date}>{dateForHumans(date)}</time>
            </div>
          </div>
        </div>

        <CardDescription className="line-clamp-2 text-sm md:text-base">{description}</CardDescription>

        {tags && tags.length > 0 && (
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
        )}

        <AnimatedItem delay={0.3}>
          <div className="flex justify-center items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/blog/${slug}`}>
                Read Full Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <ShareButton
              content={
                {
                  type: 'article',
                  url: buildCanonicalUrl('article', slug),
                  title,
                  description,
                  image,
                  tags,
                  author: author.name,
                  date,
                } as ShareableArticle
              }
              variant="outline"
              size="icon"
              showTooltip
              tooltipText="Share article"
            />
          </div>
        </AnimatedItem>
      </CardContent>
    </Card>
  );
}
