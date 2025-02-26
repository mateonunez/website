import { memo, type JSX } from 'react';
import { Toaster } from '@/components/ui/sonner';
import TerminalWrapper from '@/components/mate/terminal/terminal.wrapper';
import PlayerWrapper from '@/components/mate/player.wrapper';
import RecentlyPlayedWrapper from '@/components/mate/recently-played.wrapper';
import LatestArticlesWrapper from '@/components/mate/latest-articles.wrapper';
import { Separator } from '@/components/ui/separator';
import GitHubCommunityWrapper from '@/components/mate/open-source/github-community.wrapper';
import LastActivityWrapper from '@/components/mate/open-source/last-activity.wrapper';

const Header = memo(() => (
  <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
    <div className="flex items-center gap-2 px-4 w-full">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold font-hanken animate-in fade-in duration-1000 delay-200">Mateo Nunez</h1>
      </div>
    </div>
  </header>
));

const SectionTitle = memo(({ title, fontClass = '' }: { title: string; fontClass?: string }) => (
  <>
    <h2 className={`text-xl font-semibold ${fontClass}`}>{title}</h2>
    <Separator className="my-4" />
  </>
));

SectionTitle.displayName = 'SectionTitle';

const SidebarContent = memo(() => (
  <div className="col-span-12 md:col-span-5 lg:col-span-4 space-y-4">
    <SectionTitle title="I've been playing" />
    <RecentlyPlayedWrapper />

    <div className="mt-6">
      <SectionTitle title="Thank You 🫰" fontClass="font-bungee" />
      <GitHubCommunityWrapper />
    </div>
  </div>
));

const MainContent = memo(() => (
  <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-4">
    <SectionTitle title="Few words" />
    <LatestArticlesWrapper />
  </div>
));

const BottomContent = memo(() => (
  <div className="col-span-12 space-y-4 mt-6">
    <SectionTitle title="Open Source Activity" />
    <LastActivityWrapper />
  </div>
));

export default async function HomePage(): Promise<JSX.Element> {
  return (
    <>
      <Header />
      <div className="flex-none">
        <PlayerWrapper />
      </div>
      <div className="flex-1 overflow-auto mx-auto lg:max-w-screen-lg max-w-dvw">
        <div className="container mx-auto p-6">
          <Toaster />
          <div className="mb-8">
            <TerminalWrapper />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <MainContent />
            <SidebarContent />
          </div>
          <BottomContent />
        </div>
      </div>
    </>
  );
}
