'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Music } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useSpotify } from '@/lib/hooks/use-spotify';
import { Button } from '@/components/ui/button';

const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
};

const ITEMS_PER_PAGE = 10;

export function RecentlyPlayed() {
  const [mounted, setMounted] = useState(false);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const { data: spotifyData, isLoading } = useSpotify();

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  if (!mounted) return null;
  if (isLoading) return null;
  if (!spotifyData?.recentlyPlayed?.length) return null;

  const displayedItems = spotifyData.recentlyPlayed.slice(0, visibleItems);
  const hasMore = visibleItems < spotifyData.recentlyPlayed.length;

  return (
    <Card className="w-full bg-transparent border-none shadow-none rounded-none">
      <CardContent className="p-0">
        <div className="block sm:hidden space-y-4">
          {displayedItems.map((item, index) => (
            <Card key={`${item.id}-${index}`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.thumbnail} alt={item.album} />
                    <AvatarFallback>
                      <Music className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium truncate block hover:underline"
                      title={item.title}
                    >
                      {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                    </a>
                    <div className="mt-1 space-y-1">
                      <div className="text-sm text-muted-foreground truncate">{item.artist}</div>
                      <div className="text-sm text-muted-foreground">
                        <Clock className="inline-block h-3 w-3 mr-1" />
                        {formatDuration(item.duration)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(item.playedAt), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
              {displayedItems.map((item, index) => (
                <TableRow key={`${item.id}-${index}`} className="group hover:bg-muted/50 border-b last:border-b-0">
                  <TableCell className="p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.thumbnail} alt={item.album} />
                      <AvatarFallback>
                        <Music className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="p-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium truncate block hover:underline"
                      title={item.title}
                    >
                      {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                    </a>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell p-2 max-w-[150px] truncate">{item.artist}</TableCell>
                  <TableCell className="hidden lg:table-cell p-2 text-sm text-muted-foreground whitespace-nowrap">
                    <Clock className="mr-1 inline-block h-3 w-3" />
                    {formatDuration(item.duration)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell p-2 text-sm text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(new Date(item.playedAt), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {hasMore && (
          <div className="mt-4 flex justify-center">
            <Button variant="outline" onClick={loadMore} className="text-sm">
              Load More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
