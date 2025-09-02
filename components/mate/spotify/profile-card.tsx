'use client';

import { ExternalLink, Users } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useSpotifyProfile } from '@/hooks/use-spotify-profile';

export function SpotifyProfileCard() {
  const { data, isLoading } = useSpotifyProfile();

  if (isLoading) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="p-4 h-[96px] animate-pulse" />
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
      <CardContent className="p-4 flex items-center gap-4">
        <Avatar className="h-14 w-14 rounded-md">
          <AvatarImage src={data.avatar ?? undefined} alt={data.name} />
          <AvatarFallback className="rounded-md">{data.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium truncate">{data.name}</h3>
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {data.followers.toLocaleString()} followers
                </span>
                {data.country && <span>• {data.country}</span>}
              </div>
            </div>
            <Link
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
