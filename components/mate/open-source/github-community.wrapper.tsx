'use client';

import dynamic from 'next/dynamic';
import { GitHubCommunitySkeleton } from './github-community.skeleton';

const GitHubCommunity = dynamic(
  () => import('@/components/mate/open-source/github-community').then((mod) => mod.GitHubCommunity),
  {
    loading: () => <GitHubCommunitySkeleton />,
    ssr: false,
  },
);

export default function GitHubCommunityWrapper() {
  return <GitHubCommunity />;
}
