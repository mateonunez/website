import { type JSX, memo } from 'react';
import AboutMeWrapper from '@/components/mate/about-me.wrapper';
import LatestArticlesWrapper from '@/components/mate/latest-articles.wrapper';
import NameHeadingWrapper from '@/components/mate/name-heading.wrapper';
import GitHubCommunityWrapper from '@/components/mate/open-source/github-community.wrapper';
import LastActivityWrapper from '@/components/mate/open-source/last-activity.wrapper';
import PlayerWrapper from '@/components/mate/spotify/player.wrapper';
import RecentlyPlayedWrapper from '@/components/mate/spotify/recently-played.wrapper';
import TerminalWrapper from '@/components/mate/terminal/terminal.wrapper';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/sonner';

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
      <div className="flex-none">
        <PlayerWrapper />
        <NameHeadingWrapper />
      </div>
      <div className="flex-1 overflow-auto mx-auto max-w-7xl">
        <div className="container mx-auto p-4 md:p-6">
          <Toaster />
          <div className="space-y-6">
            <div className="mb-6">
              <TerminalWrapper />
            </div>
            <div className="grid grid-cols-12 gap-6">
              <MainContent />
              <SidebarContent />
            </div>
            <div className="mb-6">
              <AboutMeWrapper />
            </div>
            <BottomContent />
          </div>
        </div>
      </div>
    </>
  );
}
