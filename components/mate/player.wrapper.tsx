'use client';

import dynamic from 'next/dynamic';
import { PlayerSkeleton } from './player.skeleton';

const Player = dynamic(() => import('@/components/mate/player').then((mod) => mod.Player), {
  loading: () => <PlayerSkeleton />,
  ssr: false,
});

export default function PlayerWrapper() {
  return <Player />;
}
