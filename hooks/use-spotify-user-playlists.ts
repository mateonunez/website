'use client';

import useSWR from 'swr';
import type { NormalizedPlaylist } from '@/types/spotify';

type PlaylistsResponse = {
  items: NormalizedPlaylist[];
  total: number;
  limit: number;
  offset: number;
};

export function useSpotifyUserPlaylists(userId: string, limit = 20, offset = 0, aggregate = true) {
  const key = userId
    ? `/api/spotify/users/${encodeURIComponent(userId)}/playlists?limit=${limit}&offset=${offset}&aggregate=${aggregate}`
    : null;

  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch user playlists');
    return (await res.json()) as PlaylistsResponse;
  };

  const { data, error, isLoading } = useSWR<PlaylistsResponse>(key, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 10 * 60 * 1000,
    keepPreviousData: true,
  });

  return {
    data: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError: error,
  };
}
