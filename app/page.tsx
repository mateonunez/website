import { memo } from 'react';
import { Toaster } from '@/components/ui/sonner';
import dynamic from 'next/dynamic';
import type { JSX } from 'react';
import { ArticlePreviewSkeleton } from '@/components/mate/article-preview.skeleton';
import { RecentlyPlayedSkeleton } from '@/components/mate/recently-played.skeleton';
import { GitHubCommunitySkeleton } from '@/components/mate/github-community.skeleton';

const Header = memo(() => (
  <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
    <div className="flex items-center gap-2 px-4 w-full">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold font-hanken animate-in fade-in duration-1000 delay-200">Mateo Nunez</h1>
      </div>
    </div>
  </header>
));

const Terminal = dynamic(() => import('@/components/mate/terminal/terminal').then(({ Terminal }) => Terminal), {
  loading: () => <div className="h-10 w-full bg-gray-200 rounded animate-pulse" aria-label="Loading terminal" />,
});

const Player = dynamic(() => import('@/components/mate/player').then(({ Player }) => Player), {
  loading: () => <div className="h-16 w-full bg-gray-200 rounded animate-pulse" aria-label="Loading player" />,
});

const LatestArticlesWrapper = dynamic(
  () => import('@/components/mate/latest-articles.wrapper').then(({ LatestArticlesWrapper }) => LatestArticlesWrapper),
  {
    loading: () => (
      <div className="space-y-6">
        <ArticlePreviewSkeleton />
        <ArticlePreviewSkeleton />
      </div>
    ),
  },
);
const RecentlyPlayed = dynamic(
  () => import('@/components/mate/recently-played').then(({ RecentlyPlayed }) => RecentlyPlayed),
  {
    loading: () => <RecentlyPlayedSkeleton />,
  },
);
const GitHubCommunity = dynamic(
  () => import('@/components/mate/github-community').then(({ GitHubCommunity }) => GitHubCommunity),
  {
    loading: () => <GitHubCommunitySkeleton />,
  },
);

const SidebarContent = memo(() => (
  <div className="col-span-12 md:col-span-5 lg:col-span-4 space-y-6">
    <h2 className="text-xl font-semibold">I've been playing</h2>
    <RecentlyPlayed />
    <h2 className="text-xl font-semibold font-bungee">Thank You 🫰</h2>
    <GitHubCommunity />
  </div>
));

const MainContent = memo(() => (
  <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-6">
    <h2 className="text-xl font-semibold">Few words</h2>
    <LatestArticlesWrapper />
  </div>
));

export default async function HomePage(): Promise<JSX.Element> {
  return (
    <>
      <Header />
      <div className="flex-none">
        <Player />
      </div>
      <main className="flex-1 overflow-auto mx-auto lg:max-w-screen-lg max-w-dvw">
        <div className="container mx-auto p-6">
          <Toaster />
          <div className="mb-8">
            <Terminal />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <MainContent />
            <SidebarContent />
          </div>
        </div>
      </main>
    </>
  );
}
