'use client';

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { dateForHumans } from '@/lib/helpers/date';
import type { ArticleFrontmatter } from '@/types/article';
import { CalendarDays } from 'lucide-react';

type ArticlePreviewProps = Pick<
  ArticleFrontmatter,
  'author' | 'date' | 'title' | 'description' | 'image' | 'slug' | 'tags'
>;

export function ArticlePreview({ author, date, title, description, image, slug, tags }: ArticlePreviewProps) {
  return (
    <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href={`/blog/${slug}`}>
        <div className="relative h-[200px] sm:h-[300px] lg:h-[400px] w-full overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900/80 to-gray-900/20" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-xl"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 z-20 p-6">
            <CardTitle className="line-clamp-2 text-xl sm:text-2xl lg:text-3xl text-white">{title}</CardTitle>
          </div>
        </div>
      </Link>

      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.image} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium leading-none">{author.name}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              <time dateTime={date}>{dateForHumans(date)}</time>
            </div>
          </div>
        </div>

        <CardDescription className="line-clamp-2 text-sm sm:text-base">{description}</CardDescription>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-mono text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
