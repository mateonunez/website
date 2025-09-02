'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type SkeletonProps = {
  showHeader?: boolean;
};

export function PlaylistsCarouselSkeleton({ showHeader = true }: SkeletonProps) {
  const placeholders = Array.from({ length: 8 });

  return (
    <div className="relative">
      {showHeader && (
        <div className="mb-3 flex items-center justify-between">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-3 w-16 bg-muted rounded animate-pulse" />
        </div>
      )}
      <div className="relative">
        <Carousel opts={{ align: 'start', loop: false }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {placeholders.map((_, idx) => (
              <CarouselItem
                key={idx}
                className="pl-2 md:pl-4 basis-2/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Card className="overflow-hidden border border-border/50">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <div className="absolute inset-0 bg-muted animate-pulse" />
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <div className="h-3 w-3/4 bg-black/30 rounded" />
                        <div className="mt-2 h-3 w-1/2 bg-black/20 rounded" />
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
}
