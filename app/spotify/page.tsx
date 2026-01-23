import { Loader2, Music } from 'lucide-react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import type { JSX } from 'react';
import { memo, Suspense } from 'react';
import { Main } from '@/components/mate/main';
import { PageHeader } from '@/components/mate/page-header';
import { SpotifyProfileCard } from '@/components/mate/spotify/profile-card';
import { RecentlyPlayed } from '@/components/mate/spotify/recently-played';
import { SpotifyPlayer } from '@/components/mate/spotify/spotify-player';
import { TopArtists } from '@/components/mate/spotify/top-artists';
import { TopTracks } from '@/components/mate/spotify/top-tracks';
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema';
import { Card, CardContent } from '@/components/ui/card';
import meta from '@/lib/config/metadata';

// Dynamic import for heavy carousel component
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

export const metadata: Metadata = {
  title: 'Spotify Profile - Music & Playlists',
  description: `What music does ${meta.author.name} listen to while coding? Discover curated playlists for developers, current listening activity, top artists and tracks. Code needs a soundtrack - find yours here.`,
  keywords: [
    ...meta.keywords,
    'spotify',
    'music',
    'playlist',
    'artists',
    'tracks',
    'coding music',
    'developer playlists',
    'programming soundtrack',
  ],
};

const Header = memo(() => (
  <PageHeader
    title="My Spotify Profile"
    subtitle="Discover my music taste and listening habits"
    icon={<Music />}
    breadcrumbItems={[
      {
        label: 'Spotify',
        href: '/spotify',
      },
    ]}
  />
));

const TopItems = memo(() => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Suspense
      fallback={
        <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
          </CardContent>
        </Card>
      }
    >
      <TopArtists />
    </Suspense>
    <Suspense
      fallback={
        <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
          </CardContent>
        </Card>
      }
    >
      <TopTracks />
    </Suspense>
  </div>
));

const CurrentlyListening = memo(() => (
  <Suspense
    fallback={
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
        </CardContent>
      </Card>
    }
  >
    <SpotifyPlayer variant="full" />
  </Suspense>
));

export default function SpotifyPage(): JSX.Element {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Spotify', href: '/spotify' }]} />
      <Header />
      <Main className="overflow-x-hidden overflow-y-auto">
        <div className="space-y-8">
          <SpotifyProfileCard />
          <CurrentlyListening />
          <PlaylistsCarousel />
          <TopItems />
          <RecentlyPlayed />
        </div>
      </Main>
    </>
  );
}
