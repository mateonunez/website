'use client';

import dynamic from 'next/dynamic';
import { LastActivitySkeleton } from './last-activity.skeleton';

const LastActivity = dynamic(() => import('@/components/mate/last-activity').then((mod) => mod.LastActivity), {
  loading: () => <LastActivitySkeleton />,
  ssr: false,
});

export default function LastActivityWrapper() {
  return <LastActivity />;
}
