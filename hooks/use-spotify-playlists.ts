'use client';

import useSWR from 'swr';
import type { NormalizedPlaylist } from '@/types/spotify';

type PlaylistsResponse = {
  items: NormalizedPlaylist[];
  total: number;
};

export function useSpotifyPlaylists() {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch playlists');
    return (await res.json()) as PlaylistsResponse;
  };

  const { data, error, isLoading } = useSWR<PlaylistsResponse>('/api/spotify/playlists', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 5 * 60 * 1000,
  });

  return {
    data: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError: error,
  };
}
