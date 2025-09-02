'use client';

import { ExternalLink, Music } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useSpotifyUserPlaylists } from '@/hooks/use-spotify-user-playlists';
import personal from '@/lib/config/personal';

export function PlaylistsCarousel() {
  const userId = personal.social.spotify;
  console.log({ userId });
  const { data: playlists, isLoading } = useSpotifyUserPlaylists(userId);

  console.log({ playlists });

  if (isLoading) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="p-6 h-[220px] animate-pulse" />
      </Card>
    );
  }

  if (!playlists.length) return null;

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-hanken">Playlists</h2>
        <div className="text-xs text-muted-foreground">{playlists.length} total</div>
      </div>
      <div className="relative">
        <Carousel opts={{ align: 'start', loop: false }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {playlists.map((pl) => (
              <CarouselItem
                key={pl.id}
                className="pl-2 md:pl-4 basis-2/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Link href={pl.url} target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden group border border-border/50 hover:border-amber-500/30 transition-all">
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        {pl.cover ? (
                          <Image
                            src={pl.cover}
                            alt={pl.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center bg-muted">
                            <Music className="h-10 w-10 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                          <div className="text-white text-sm font-medium truncate">{pl.name}</div>
                          <div className="text-white/80 text-xs truncate">{pl.owner}</div>
                        </div>
                      </div>
                      <div className="p-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{pl.tracks} tracks</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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
