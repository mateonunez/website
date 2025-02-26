'use client';

import dynamic from 'next/dynamic';
import { PlayerSkeleton } from './player.skeleton';

const SpotifyPlayer = dynamic(
  () => import('@/components/mate/spotify/spotify-player').then((mod) => mod.SpotifyPlayer),
  {
    loading: () => <PlayerSkeleton />,
    ssr: false,
  },
);

export default function PlayerWrapper() {
  return <SpotifyPlayer variant="compact" />;
}
