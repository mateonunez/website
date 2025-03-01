'use client';

import { CompactPlayer } from './compact-player-spotify';
import { FullPlayer } from './full-player-spotify';
import { useSpotifyPlayer } from './hooks/use-spotify-player';
// import { LoadingState } from './loading-state';
import { NotPlayingState } from './now-playing-state';

type SpotifyPlayerProps = {
  variant?: 'full' | 'compact';
};

export function SpotifyPlayer({ variant = 'full' }: SpotifyPlayerProps) {
  const { mounted, currentlyPlaying, progress, simulatedTime, url } = useSpotifyPlayer();

  if (!mounted) return null;

  if (!currentlyPlaying || !currentlyPlaying.isPlaying) {
    return <NotPlayingState variant={variant} url={url} />;
  }

  if (variant === 'full') {
    return <FullPlayer currentlyPlaying={currentlyPlaying} progress={progress} simulatedTime={simulatedTime} />;
  }

  return (
    <CompactPlayer currentlyPlaying={currentlyPlaying} progress={progress} simulatedTime={simulatedTime} url={url} />
  );
}
