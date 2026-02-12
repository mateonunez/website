'use client';

import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CompactPlayer } from './compact-player-spotify';
import { FullPlayer } from './full-player-spotify';
import { useSpotifyPlayer } from './hooks/use-spotify-player';
import { NotPlayingState } from './now-playing-state';

type SpotifyPlayerProps = {
  variant?: 'full' | 'compact';
};

export function SpotifyPlayer({ variant = 'full' }: SpotifyPlayerProps) {
  const { mounted, currentlyPlaying, progress, simulatedTime, url, isError } = useSpotifyPlayer();

  if (!mounted) return null;

  const trackAnnouncement = currentlyPlaying?.isPlaying
    ? `Now playing: ${currentlyPlaying.title} by ${currentlyPlaying.artist}`
    : 'Spotify: Not playing';

  if (isError) {
    return (
      <Card className="relative overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-0 rounded-none max-w-dvw">
        <CardContent className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Unable to connect to Spotify</span>
        </CardContent>
      </Card>
    );
  }

  if (!currentlyPlaying || !currentlyPlaying.isPlaying) {
    return (
      <>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {trackAnnouncement}
        </div>
        <NotPlayingState variant={variant} url={url} />
      </>
    );
  }

  if (variant === 'full') {
    return (
      <>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {trackAnnouncement}
        </div>
        <FullPlayer currentlyPlaying={currentlyPlaying} progress={progress} simulatedTime={simulatedTime} />
      </>
    );
  }

  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {trackAnnouncement}
      </div>
      <CompactPlayer currentlyPlaying={currentlyPlaying} progress={progress} simulatedTime={simulatedTime} url={url} />
    </>
  );
}
