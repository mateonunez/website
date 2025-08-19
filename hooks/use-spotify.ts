'use client';

import useSWR from 'swr';
import { useUI } from '@/components/providers/ui-provider';

export function useSpotify() {
  const { setSpotifyListening, setSpotifyRecentlyPlayed, listening, recentlyPlayed } = useUI();

  const { error: currentError, isLoading: currentLoading } = useSWR('/api/spotify/currently-listening', {
    fetcher: async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      setSpotifyListening(data);
      return data;
    },
    refreshInterval: 20 * 1000, // 20 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const { error: recentError, isLoading: recentLoading } = useSWR('/api/spotify/recently-played', {
    fetcher: async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      setSpotifyRecentlyPlayed(data);
      return data;
    },
    refreshInterval: 10 * 60 * 1000, // 10 minute
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    data: {
      currentlyPlaying: listening,
      recentlyPlayed: recentlyPlayed,
    },
    isLoading: currentLoading || recentLoading,
    isError: currentError || recentError,
  };
}
