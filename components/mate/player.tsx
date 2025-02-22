'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import config from '@/lib/config';
import { ExternalLink, Music, Pause, Play, Radio, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSpotify } from '@/lib/hooks/use-spotify';

export function Player() {
  const { data: spotifyData } = useSpotify();
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [simulatedTime, setSimulatedTime] = useState(0);
  const url = spotifyData?.isPlaying ? spotifyData.url : `${config.baseUrl}/spotify`;

  // Update simulated progress every second
  useEffect(() => {
    if (!spotifyData?.isPlaying) {
      setSimulatedProgress(0);
      setSimulatedTime(0);
      return;
    }

    const duration = Number(spotifyData.duration);
    const currentProgress = Number(spotifyData.progress);
    const shouldReset = simulatedTime === 0 || Math.abs(simulatedTime - currentProgress) > 2000;

    if (shouldReset) {
      setSimulatedProgress((currentProgress / duration) * 100);
      setSimulatedTime(currentProgress);
    }

    const progressIncrement = (100 / duration) * 1000;
    const timeIncrement = 1000;

    const interval = setInterval(() => {
      setSimulatedProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + progressIncrement;
      });

      setSimulatedTime((prev) => {
        if (prev >= duration) return 0;
        return prev + timeIncrement;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [spotifyData]);

  return (
    <Card className="relative overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-0 rounded-none max-w-dvw">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Link
            href={url}
            target={spotifyData?.isPlaying ? '_blank' : '_self'}
            className="block shrink-0 group relative"
          >
            <Avatar className="h-16 w-16 rounded-md">
              {spotifyData?.isPlaying ? (
                <AvatarImage
                  src={spotifyData.thumbnail}
                  alt={spotifyData.album}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <AvatarFallback className="rounded-md bg-gradient-to-br from-green-400 to-green-600">
                  <Radio className="h-8 w-8 text-white" />
                </AvatarFallback>
              )}
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
              target={spotifyData?.isPlaying ? '_blank' : '_self'}
              className="inline-block overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
            >
              <span className="text-sm font-medium leading-none">
                {spotifyData?.isPlaying ? spotifyData.title : 'Not Playing'}
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Music className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{spotifyData?.isPlaying ? spotifyData.artist : 'Spotify'}</p>
            </div>
            {spotifyData?.isPlaying && (
              <div className="flex flex-col gap-1.5">
                <Progress value={simulatedProgress} className="h-1" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0" disabled={!spotifyData?.isPlaying}>
                      {spotifyData?.isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                    <Volume2 className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="space-x-1 text-xs tabular-nums text-muted-foreground">
                      <span>{formatTime(simulatedTime)}</span>
                      <span>/</span>
                      <span>{formatTime(spotifyData.duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {spotifyData?.isPlaying && (
          <div className="absolute bottom-0 left-0 right-0">
            <div
              className="h-1 bg-gradient-to-r from-green-500/40 to-green-500/60"
              style={{
                width: `${simulatedProgress}%`,
                transition: 'width 1s linear',
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
