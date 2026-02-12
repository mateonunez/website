'use client';
import { useEffect, useRef, useState } from 'react';
import { useSpotify } from '@/hooks/use-spotify';
import config from '@/lib/config';

const PROGRESS_DELTA_THRESHOLD = 20000;

export function useSpotifyPlayer() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simulatedTime, setSimulatedTime] = useState(0);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const lastUpdateTimeRef = useRef<number>(Date.now());

  const { data: spotifyData, isLoading, isError } = useSpotify();
  const currentlyPlaying = spotifyData?.currentlyPlaying;

  useEffect(() => {
    setMounted(true);
    lastUpdateTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!currentlyPlaying?.isPlaying) {
      setProgress(0);
      setSimulatedTime(0);
      setCurrentSongId(null);
      lastUpdateTimeRef.current = Date.now();
      return;
    }

    const duration = Number(currentlyPlaying.duration);
    const actualProgress = Number(currentlyPlaying.progress);

    if (currentSongId !== currentlyPlaying.id) {
      setCurrentSongId(currentlyPlaying.id);
      setSimulatedTime(actualProgress);
      setProgress((actualProgress / duration) * 100);
      lastUpdateTimeRef.current = Date.now();
      return;
    }

    const delta = Math.abs(simulatedTime - actualProgress);
    if (delta > PROGRESS_DELTA_THRESHOLD) {
      setSimulatedTime(actualProgress);
      setProgress((actualProgress / duration) * 100);
      lastUpdateTimeRef.current = Date.now();
    }
  }, [mounted, currentlyPlaying, currentSongId, simulatedTime]);

  useEffect(() => {
    if (!mounted || !currentlyPlaying?.isPlaying) return;

    const duration = Number(currentlyPlaying.duration);
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = now;

      setSimulatedTime((prevSimulatedTime) => {
        const newSimulatedTime = prevSimulatedTime + elapsed;
        const clampedTime = newSimulatedTime > duration ? duration : newSimulatedTime;
        setProgress((clampedTime / duration) * 100);
        return clampedTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mounted, currentlyPlaying]);

  return {
    mounted,
    isLoading,
    isError,
    currentlyPlaying,
    progress,
    simulatedTime,
    url: currentlyPlaying?.isPlaying ? currentlyPlaying.url : `${config.baseUrl}/spotify`,
  };
}
