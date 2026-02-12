import dynamic from 'next/dynamic';
import { type JSX, memo } from 'react';
import AboutMeWrapper from '@/components/mate/about-me.wrapper';
import LatestArticlesWrapper from '@/components/mate/latest-articles.wrapper';
import NameHeadingWrapper from '@/components/mate/name-heading.wrapper';
import GitHubCommunityWrapper from '@/components/mate/open-source/github-community.wrapper';
import LastActivityWrapper from '@/components/mate/open-source/last-activity.wrapper';
import PlayerWrapper from '@/components/mate/spotify/player.wrapper';
import RecentlyPlayedWrapper from '@/components/mate/spotify/recently-played.wrapper';
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { Separator } from '@/components/ui/separator';
import { getProfilePageSchema } from '@/lib/seo/json-ld';

// Dynamic imports for heavy components
const TerminalWrapper = dynamic(() => import('@/components/mate/terminal/terminal.wrapper'), {
  loading: () => (
    <div className="rounded-md border bg-card text-card-foreground shadow animate-pulse">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm text-muted-foreground">Terminal</div>
      </div>
      <div className="h-[400px] bg-black rounded-b-xl" />
    </div>
  ),
});

const PlaylistsCarousel = dynamic(
  () => import('@/components/mate/spotify/playlists-carousel').then((mod) => ({ default: mod.PlaylistsCarousel })),
  {
    loading: () => (
      <div className="space-y-4">
        <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    ),
  },
);

const SectionTitle = memo(({ title, fontClass = '' }: { title: string; fontClass?: string }) => (
  <>
    <h2 className={`text-xl font-semibold ${fontClass}`}>{title}</h2>
    <Separator className="my-4" />
  </>
));

SectionTitle.displayName = 'SectionTitle';

const SidebarContent = memo(() => (
  <div className="col-span-12 md:col-span-5 lg:col-span-4 space-y-6">
    <SectionTitle title="I've been playing" />
    <RecentlyPlayedWrapper />
    <div className="mt-6">
      <SectionTitle title="Thank You 🫰" fontClass="font-bungee" />
      <GitHubCommunityWrapper />
    </div>
  </div>
));

const MainContent = memo(() => (
  <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-6">
    <SectionTitle title="Few words" />
    <LatestArticlesWrapper />
  </div>
));

const BottomContent = memo(() => (
  <div className="col-span-12 space-y-6 mt-6">
    <SectionTitle title="Open Source Activity" />
    <LastActivityWrapper />
  </div>
));

export default async function HomePage(): Promise<JSX.Element> {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }]} />
      <JsonLdScript data={getProfilePageSchema()} />
      <div className="flex-none">
        <PlayerWrapper />
        <NameHeadingWrapper />
      </div>
      <div className="flex-1 overflow-auto mx-auto max-w-7xl">
        <div className="container mx-auto p-4 md:p-6">
          <div className="space-y-6">
            <div className="mb-6">
              <TerminalWrapper />
            </div>
            <div className="mb-6">
              <AboutMeWrapper />
            </div>
            <div className="grid grid-cols-12 gap-6">
              <MainContent />
              <SidebarContent />
            </div>
            <div className="mb-6">
              <SectionTitle title="Personally selected" />
              <PlaylistsCarousel />
            </div>
            <BottomContent />
          </div>
        </div>
      </div>
    </>
  );
}
