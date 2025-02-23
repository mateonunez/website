import { Suspense } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Player } from '@/components/mate/player';
import { Terminal } from '@/components/mate/terminal/terminal';
import { LatestArticlesWrapper } from '@/components/mate/latest-articles.wrapper';
import { ArticlePreviewSkeleton } from '@/components/mate/article-preview.skeleton';
import { RecentlyPlayedSkeleton } from '@/components/mate/recently-played.skeleton';
import { GitHubCommunitySkeleton } from '@/components/mate/github-community.skeleton';
import type { JSX } from 'react';
import { GitHubCommunity } from '@/components/mate/github-community';
import { RecentlyPlayed } from '@/components/mate/recently-played';

export default async function HomePage(): Promise<JSX.Element> {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold font-hanken animate-in fade-in duration-1000 delay-200">Mateo Nunez</h1>
          </div>
        </div>
      </header>
      <div className="flex-none">
        <Player />
      </div>
      <main className="flex-1 overflow-auto mx-auto max-w-screen-lg">
        <div className="container mx-auto p-6">
          <Toaster />
          <div className="mb-8">
            <Terminal />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-6">
              <h2 className="text-xl font-semibold">Few words</h2>
              <Suspense
                fallback={
                  <div className="space-y-6">
                    <ArticlePreviewSkeleton />
                    <ArticlePreviewSkeleton />
                  </div>
                }
              >
                <LatestArticlesWrapper />
              </Suspense>
            </div>
            <div className="col-span-12 md:col-span-5 lg:col-span-4 space-y-6">
              <h2 className="text-xl font-semibold">I've been playing</h2>
              <Suspense fallback={<RecentlyPlayedSkeleton />}>
                <RecentlyPlayed />
              </Suspense>
              <h2 className="text-xl font-semibold font-bungee">Thank You 🫰</h2>
              <Suspense fallback={<GitHubCommunitySkeleton />}>
                <GitHubCommunity />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
