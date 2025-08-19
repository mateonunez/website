'use client';

import { Clock, ExternalLink, Loader2, Music } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSpotifyTop } from '@/hooks/use-spotify-top';

const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
};

export function TopTracks() {
  const [mounted, setMounted] = useState(false);
  const { data, isLoading } = useSpotifyTop();
  const tracks = data.tracks;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isLoading) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
        </CardContent>
      </Card>
    );
  }

  if (!tracks.length) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          No top tracks found
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
      <CardHeader className="p-3 sm:p-4 pb-0">
        <CardTitle className="text-base sm:text-lg flex items-center gap-1.5 sm:gap-2 font-hanken">
          <Music className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
          Top Tracks
        </CardTitle>
        <CardDescription className="text-xs">My most played tracks in the last month</CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-3">
          {tracks.map((track) => (
            <Card
              key={track.id}
              className="overflow-hidden border border-border/50 group hover:border-amber-500/30 transition-all"
            >
              <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12 rounded-md flex-shrink-0">
                  <AvatarImage src={track.thumbnail} alt={track.album} className="object-cover" />
                  <AvatarFallback className="rounded-md">
                    <Music className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <a
                        href={track.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium truncate block hover:underline"
                        title={track.title}
                      >
                        {track.title.length > 28 ? `${track.title.slice(0, 28)}...` : track.title}
                      </a>
                      <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        <Clock className="inline-block h-3 w-3 mr-1" />
                        {formatDuration(track.duration)}
                      </span>
                      <Link
                        href={track.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-xs sm:text-sm h-8 sm:h-9 transition-all hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-500/30"
          >
            <Link
              href="https://open.spotify.com/user/21gqji7knqbwktogz5nbfdmfa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <span>Open Spotify</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
