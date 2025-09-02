'use client';

import { ExternalLink, Loader2, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSpotifyTop } from '@/hooks/use-spotify-top';

export function TopArtists() {
  const [mounted, setMounted] = useState(false);
  const { data, isLoading } = useSpotifyTop();
  const artists = data.artists;

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

  if (!artists.length) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          No top artists found
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
      <CardHeader className="p-3 sm:p-4 pb-0">
        <CardTitle className="text-base sm:text-lg flex items-center gap-1.5 sm:gap-2 font-hanken">
          <Users className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
          Top Artists
        </CardTitle>
        <CardDescription className="text-xs">My most played artists in the last month</CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-3">
          {artists.map((artist) => {
            const genres: string[] = Array.isArray(artist.genres) ? artist.genres : [];
            const visibleGenres = genres.slice(0, 2);
            const remainingGenresCount = Math.max(genres.length - visibleGenres.length, 0);
            return (
              <Card
                key={artist.id}
                className="overflow-hidden border border-border/50 group hover:border-amber-500/30 transition-all"
              >
                <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 rounded-md">
                    <AvatarImage src={artist.image} alt={artist.name} className="object-cover" />
                    <AvatarFallback className="rounded-md">{artist.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <h3 className="font-medium truncate" title={artist.name}>
                          {artist.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-1">
                          {visibleGenres.map((genre, index) => (
                            <Badge key={index} variant="secondary" className="text-xs whitespace-nowrap">
                              {genre}
                            </Badge>
                          ))}
                          {remainingGenresCount > 0 && (
                            <Badge variant="outline" className="text-xs whitespace-nowrap">
                              +{remainingGenresCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Link
                        href={artist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
              <span>View Profile</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
