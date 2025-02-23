'use client';

import { useUI } from '@/components/legacy/ui/ui-context';
import useSWR from 'swr';

export function useGithub() {
  const { setGithubProfile, githubProfile } = useUI();

  const { data, error } = useSWR('/api/open-source/profile', {
    fetcher: async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      setGithubProfile(data);
      return data;
    },
    refreshInterval: 60 * 1000, // 1 minute
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    data: githubProfile,
    isLoading: !data && !error,
    isError: error,
  };
}
