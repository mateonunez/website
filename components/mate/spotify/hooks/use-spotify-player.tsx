'use client';

import { useState, useEffect } from 'react';
import { useSpotify } from '@/lib/hooks/use-spotify';
import config from '@/lib/config';

const PROGRESS_DELTA_THRESHOLD = 20000;

export function useSpotifyPlayer() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simulatedTime, setSimulatedTime] = useState(0);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  const { data: spotifyData, isLoading } = useSpotify();
  const currentlyPlaying = spotifyData?.currentlyPlaying;

  useEffect(() => {
    setMounted(true);

    if (!currentlyPlaying?.isPlaying) {
      setProgress(0);
      setSimulatedTime(0);
      setCurrentSongId(null);
      setLastUpdateTime(Date.now());
      return;
    }

    const songId = currentlyPlaying.id;
    const duration = Number(currentlyPlaying.duration);
    const actualProgress = Number(currentlyPlaying.progress);

    if (currentSongId !== songId) {
      setCurrentSongId(songId);
      setSimulatedTime(actualProgress);
      setProgress((actualProgress / duration) * 100);
      setLastUpdateTime(Date.now());
      return;
    }

    const delta = Math.abs(simulatedTime - actualProgress);
    if (delta > PROGRESS_DELTA_THRESHOLD) {
      setSimulatedTime(actualProgress);
      setProgress((actualProgress / duration) * 100);
      setLastUpdateTime(Date.now());
    }

    const interval = setInterval(() => {
      if (!currentlyPlaying.isPlaying) return;

      const now = Date.now();
      const elapsed = now - lastUpdateTime;
      setLastUpdateTime(now);

      setSimulatedTime((prev) => {
        const newTime = prev + elapsed;
        return newTime >= duration ? duration : newTime;
      });

      setProgress((simulatedTime / duration) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentlyPlaying, currentSongId, simulatedTime, lastUpdateTime]);

  return {
    mounted,
    isLoading,
    currentlyPlaying,
    progress,
    simulatedTime,
    url: currentlyPlaying?.isPlaying ? currentlyPlaying.url : `${config.baseUrl}/spotify`,
  };
}
