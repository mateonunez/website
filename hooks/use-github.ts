'use client';

import useSWR from 'swr';
import { useUI } from '@/components/providers/ui-provider';

export function useGithub() {
  const { setGithubProfile, githubProfile, setLastActivities, lastActivities } = useUI();

  const { error: profileError, isLoading: profileLoading } = useSWR('/api/open-source/profile', {
    fetcher: async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      setGithubProfile(data);
      return data;
    },
    refreshInterval: 10 * 60 * 1000, // 10 minute
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const { error: activitiesError, isLoading: activitiesLoading } = useSWR('/api/open-source/last-activities', {
    fetcher: async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch GitHub activities');
      }
      const data = await res.json();
      setLastActivities(data);
      return data;
    },
    refreshInterval: 5 * 60 * 1000, // 5 minutes
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    data: {
      profile: githubProfile,
      activities: lastActivities,
    },
    isLoading: profileLoading || activitiesLoading,
    isError: profileError || activitiesError,
  };
}
