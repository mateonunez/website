'use client';

import useSWR from 'swr';
import { useUI } from '@/components/providers/ui-provider';
import type { TopData } from '@/types/spotify';

export function useSpotifyTop() {
  const { setSpotifyTopArtists, setSpotifyTopTracks, topArtists, topTracks } = useUI();

  const { error, isLoading } = useSWR<TopData>(
    '/api/spotify/top',
    async (url: string) => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to fetch top data');
        }
        const data = await res.json();

        setSpotifyTopArtists(data.artists || []);
        setSpotifyTopTracks(data.tracks || []);

        return data;
      } catch (error) {
        console.error('Error fetching Spotify top data:', error);
        throw error;
      }
    },
    {
      refreshInterval: 3600000, // 1 hour
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  return {
    data: {
      artists: topArtists || [],
      tracks: topTracks || [],
    },
    isLoading,
    isError: error,
  };
}
