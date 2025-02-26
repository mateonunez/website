'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Music, Pause, Volume2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDuration } from '@/lib/helpers/date';

interface CompactPlayerProps {
  currentlyPlaying: any;
  progress: number;
  simulatedTime: number;
  url: string;
}

export function CompactPlayer({ currentlyPlaying, progress, simulatedTime, url }: CompactPlayerProps) {
  return (
    <Card className="relative overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-0 rounded-none max-w-dvw">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Link href={url} target="_blank" className="block shrink-0 group relative">
            <Avatar className="h-16 w-16 rounded-md">
              <AvatarImage
                src={currentlyPlaying.thumbnail}
                alt={currentlyPlaying.album}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <AvatarFallback className="rounded-md">
                <Music className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>

            <div className="absolute -right-1 -top-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button size="icon" variant="secondary" className="h-6 w-6 rounded-full" asChild>
                <Link href={url} target="_blank">
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </Link>

          <div className="flex flex-1 flex-col space-y-1 overflow-hidden">
            <Link
              href={url}
              target="_blank"
              className="inline-block overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
            >
              <span className="text-sm font-medium leading-none">{currentlyPlaying.title}</span>
            </Link>
            <div className="flex items-center gap-2">
              <Music className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{currentlyPlaying.artist}</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Pause className="h-3 w-3" />
                  <Volume2 className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="space-x-1 text-xs tabular-nums text-muted-foreground">
                    <span>{formatDuration(simulatedTime)}</span>
                    <span>/</span>
                    <span>{formatDuration(currentlyPlaying.duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0">
          <div
            className="h-1 bg-gradient-to-r from-green-500/40 to-green-500/60"
            style={{
              width: `${progress}%`,
              transition: 'width 1s linear',
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
