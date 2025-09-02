import { Loader2, Music } from 'lucide-react';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import { memo, Suspense } from 'react';
import { PageHeader } from '@/components/mate/page-header';
import { PlaylistsCarousel } from '@/components/mate/spotify/playlists-carousel';
import { SpotifyProfileCard } from '@/components/mate/spotify/profile-card';
import { RecentlyPlayed } from '@/components/mate/spotify/recently-played';
import { SpotifyPlayer } from '@/components/mate/spotify/spotify-player';
import { TopArtists } from '@/components/mate/spotify/top-artists';
import { TopTracks } from '@/components/mate/spotify/top-tracks';
import { Card, CardContent } from '@/components/ui/card';
import meta from '@/lib/config/metadata';

export const metadata: Metadata = {
  title: 'Spotify Profile',
  description: `Discover ${meta.author.name}'s music taste. Check out what I'm currently listening to and my top artists and tracks. ${meta.description}`,
  keywords: [...meta.keywords, 'spotify', 'music', 'playlist', 'artists', 'tracks'],
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
      <Header />
      <main className="flex-1 overflow-x-hidden overflow-y-auto mx-auto lg:max-w-screen-lg">
        <div className="container mx-auto p-6">
          <div className="space-y-8">
            <SpotifyProfileCard />
            <CurrentlyListening />
            <PlaylistsCarousel />
            <TopItems />
            <RecentlyPlayed />
          </div>
        </div>
      </main>
    </>
  );
}
