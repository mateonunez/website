'use client';

import dynamic from 'next/dynamic';
import { RecentlyPlayedSkeleton } from './recently-played.skeleton';

const RecentlyPlayed = dynamic(
  () => import('@/components/mate/spotify/recently-played').then((mod) => mod.RecentlyPlayed),
  {
    loading: () => <RecentlyPlayedSkeleton />,
    ssr: false,
  },
);

export default function RecentlyPlayedWrapper() {
  return <RecentlyPlayed />;
}
