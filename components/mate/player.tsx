'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import config from '@/lib/config';
import { ExternalLink, Music, Pause, Play, Radio, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSpotify } from '@/lib/hooks/use-spotify';

const PROGRESS_DELTA_THRESHOLD = 20000;

export function Player() {
  const { data: spotifyData } = useSpotify();
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [simulatedTime, setSimulatedTime] = useState(0);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  const url = spotifyData?.currentlyPlaying?.isPlaying ? spotifyData.currentlyPlaying.url : `${config.baseUrl}/spotify`;

  useEffect(() => {
    if (!spotifyData?.currentlyPlaying?.isPlaying) {
      setSimulatedProgress(0);
      setSimulatedTime(0);
      setCurrentSongId(null);
      setLastUpdateTime(Date.now());
      return;
    }

    const songId = spotifyData.currentlyPlaying.id;
    const duration = Number(spotifyData.currentlyPlaying.duration);
    const actualProgress = Number(spotifyData.currentlyPlaying.progress);

    if (currentSongId !== songId) {
      setCurrentSongId(songId);
      setSimulatedTime(actualProgress);
      setSimulatedProgress((actualProgress / duration) * 100);
      setLastUpdateTime(Date.now());
      return;
    }

    const delta = Math.abs(simulatedTime - actualProgress);
    if (delta > PROGRESS_DELTA_THRESHOLD) {
      setSimulatedTime(actualProgress);
      setSimulatedProgress((actualProgress / duration) * 100);
      setLastUpdateTime(Date.now());
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastUpdateTime;
      setLastUpdateTime(now);

      setSimulatedTime((prev) => {
        const newTime = prev + elapsed;
        return newTime >= duration ? duration : newTime;
      });

      setSimulatedProgress((_prev) => {
        const newProgress = (simulatedTime / duration) * 100;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [spotifyData, currentSongId, simulatedTime]);

  return (
    <Card className="relative overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-0 rounded-none max-w-dvw">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Link
            href={url}
            target={spotifyData?.currentlyPlaying?.isPlaying ? '_blank' : '_self'}
            className="block shrink-0 group relative"
          >
            <Avatar className="h-16 w-16 rounded-md">
              {spotifyData?.currentlyPlaying?.isPlaying ? (
                <AvatarImage
                  src={spotifyData.currentlyPlaying.thumbnail}
                  alt={spotifyData.currentlyPlaying.album}
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
              target={spotifyData?.currentlyPlaying?.isPlaying ? '_blank' : '_self'}
              className="inline-block overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
            >
              <span className="text-sm font-medium leading-none">
                {spotifyData?.currentlyPlaying?.isPlaying ? spotifyData.currentlyPlaying.title : 'Not Playing'}
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Music className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                {spotifyData?.currentlyPlaying?.isPlaying ? spotifyData.currentlyPlaying.artist : 'Spotify'}
              </p>
            </div>

            {spotifyData?.currentlyPlaying?.isPlaying && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {spotifyData?.currentlyPlaying?.isPlaying ? (
                      <Pause className="h-3 w-3" />
                    ) : (
                      <Play className="h-3 w-3" />
                    )}
                    <Volume2 className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="space-x-1 text-xs tabular-nums text-muted-foreground">
                      <span>{formatTime(simulatedTime)}</span>
                      <span>/</span>
                      <span>{formatTime(spotifyData.currentlyPlaying.duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {spotifyData?.currentlyPlaying?.isPlaying && (
          <div className="absolute top-0 left-0 right-0">
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
