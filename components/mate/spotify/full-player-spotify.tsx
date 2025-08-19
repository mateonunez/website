'use client';

import { Clock, Music } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatDuration } from '@/lib/helpers/date';
import { cn } from '@/lib/utils';

interface FullPlayerProps {
  currentlyPlaying: any;
  progress: number;
  simulatedTime: number;
}

export function FullPlayer({ currentlyPlaying, progress, simulatedTime }: FullPlayerProps) {
  return (
    <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50 overflow-hidden">
      <CardHeader className="p-3 sm:p-4 pb-0">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2 font-hanken">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-amber-500" />
            <span>Now Playing</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="relative w-full sm:w-auto">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg mx-auto sm:mx-0">
              <AvatarImage src={currentlyPlaying.thumbnail} alt={currentlyPlaying.album} className="object-cover" />
              <AvatarFallback className="rounded-lg">
                <Music className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <Link
              href={currentlyPlaying.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'font-medium sm:text-lg block hover:underline truncate',
                currentlyPlaying.title.length > 30 ? 'text-base' : '',
              )}
            >
              {currentlyPlaying.title}
            </Link>

            <p className="text-sm text-muted-foreground truncate mt-1">{currentlyPlaying.artist}</p>

            <p className="text-xs text-muted-foreground mt-1">{currentlyPlaying.album}</p>

            <div className="mt-3">
              <Progress value={progress} className="h-1.5" />
              <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  <Clock className="inline-block h-3 w-3 mr-1" />
                  {formatDuration(simulatedTime)}
                </span>
                <span>{formatDuration(currentlyPlaying.duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
