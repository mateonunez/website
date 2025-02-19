'use client';

import { useUI } from '@/components/legacy/ui/ui-context';
import useSWR from 'swr';

export function useSpotify() {
  const { setSpotifyListening, listening } = useUI();

  const { error, isLoading } = useSWR('/api/spotify/currently-listening', {
    fetcher: async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      setSpotifyListening(data);
      return data;
    },
    refreshInterval: 10 * 1000, // 10 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    data: listening,
    isLoading: isLoading,
    isError: error,
  };
}
