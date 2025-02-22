import { Suspense } from 'react';
import { AppSidebar } from '@/components/mate/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { Player } from '@/components/mate/player';
import { Terminal } from '@/components/mate/terminal';
import { LatestArticlesWrapper } from '@/components/mate/latest-articles.wrapper';
import { RecentlyPlayedWrapper } from '@/components/mate/recently-played.wrapper';
import { GitHubCommunityWrapper } from '@/components/mate/github-community.wrapper';
import { ArticlePreviewSkeleton } from '@/components/mate/article-preview.skeleton';
import { RecentlyPlayedSkeleton } from '@/components/mate/recently-played.skeleton';
import { GitHubCommunitySkeleton } from '@/components/mate/github-community.skeleton';
import type { JSX } from 'react';

export default async function HomePage(): Promise<JSX.Element> {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2 mx-auto">
              <h1 className="text-2xl text-center font-bold">Mateo Nunez's Website</h1>
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
                <h2 className="text-xl font-semibold">Latest Articles</h2>
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
                <h2 className="text-xl font-semibold">Recently Played</h2>
                <Suspense fallback={<RecentlyPlayedSkeleton />}>
                  <RecentlyPlayedWrapper />
                </Suspense>
                <h2 className="text-xl font-semibold">GitHub Community</h2>
                <Suspense fallback={<GitHubCommunitySkeleton />}>
                  <GitHubCommunityWrapper />
                </Suspense>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
