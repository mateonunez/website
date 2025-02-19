'use client';

import { useEffect, useState } from 'react';
import type { SpotifyRecentlyPlayed, SpotifyTrack } from '@/types/spotify';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Music } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RecentlyPlayedProps {
  items: SpotifyRecentlyPlayed['items'];
}

export default function RecentlyPlayed({ items }: RecentlyPlayedProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 max-h-[600px] overflow-auto">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">Recently Played</CardTitle>
        <CardDescription className="text-xs">My recently played songs on Spotify</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {/* Card list for screens below sm (640px) */}
        <div className="block sm:hidden p-4 space-y-4 overflow-auto">
          {items.map((item, index) => (
            <Card key={`${item.track.id}-${index}`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.track.album.images[0]?.url} alt={item.track.album.name} />
                    <AvatarFallback>
                      <Music className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <a
                      href={item.track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium truncate block hover:underline"
                      title={item.track.name}
                    >
                      {item.track.name.length > 20 ? `${item.track.name.slice(0, 20)}...` : item.track.name}
                    </a>
                    <div className="mt-1 space-y-1">
                      <div className="text-sm text-muted-foreground truncate">
                        {item.track.artists.map((artist) => artist.name).join(', ')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Clock className="inline-block h-3 w-3 mr-1" />
                        {formatDuration(item.track.duration_ms)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(item.played_at), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Table for sm and larger screens */}
        <div className="hidden sm:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 p-2" />
                <TableHead className="p-2">Track</TableHead>
                <TableHead className="hidden sm:table-cell p-2">Artist</TableHead>
                <TableHead className="hidden lg:table-cell p-2">Duration</TableHead>
                <TableHead className="hidden md:table-cell p-2">Played</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => {
                const track = item.track as SpotifyTrack;
                return (
                  <TableRow key={`${track.id}-${index}`} className="group hover:bg-muted/50 border-b last:border-b-0">
                    <TableCell className="p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={track.album.images[0]?.url} alt={track.album.name} />
                        <AvatarFallback>
                          <Music className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="p-2">
                      <a
                        href={track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium truncate block hover:underline"
                        title={track.name}
                      >
                        {track.name.length > 20 ? `${track.name.slice(0, 20)}...` : track.name}
                      </a>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell p-2 max-w-[150px] truncate">
                      {track.artists.map((artist) => artist.name).join(', ')}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell p-2 text-sm text-muted-foreground whitespace-nowrap">
                      <Clock className="mr-1 inline-block h-3 w-3" />
                      {formatDuration(track.duration_ms)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell p-2 text-sm text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(item.played_at), { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
