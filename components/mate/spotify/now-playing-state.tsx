'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Music, Pause, Radio } from 'lucide-react';
import Link from 'next/link';

interface NotPlayingStateProps {
  variant: 'full' | 'compact';
  url: string;
}

export function NotPlayingState({ variant, url }: NotPlayingStateProps) {
  if (variant === 'full') {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8 min-h-[140px]">
          <div className="flex flex-col items-center gap-2">
            <Pause className="h-9 w-9 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Not playing anything right now</span>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="relative overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-0 rounded-none max-w-dvw">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Link href={url} className="block shrink-0 group relative">
            <Avatar className="h-16 w-16 rounded-md">
              <AvatarFallback className="rounded-md bg-gradient-to-br from-green-400 to-green-600">
                <Radio className="h-8 w-8 text-white" />
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-1 flex-col space-y-1 overflow-hidden">
            <Link href={url} className="inline-block overflow-hidden text-ellipsis whitespace-nowrap hover:underline">
              <span className="text-sm font-medium leading-none">Not Playing</span>
            </Link>
            <div className="flex items-center gap-2">
              <Music className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Spotify</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
