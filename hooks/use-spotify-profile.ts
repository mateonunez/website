'use client';

import useSWR from 'swr';
import type { NormalizedSpotifyProfile } from '@/types/spotify';

export function useSpotifyProfile() {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch Spotify profile');
    return (await res.json()) as NormalizedSpotifyProfile;
  };

  const { data, error, isLoading } = useSWR<NormalizedSpotifyProfile>('/api/spotify/profile', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 5 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    isError: error,
  };
}
