'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Headphones } from 'lucide-react';

interface LoadingStateProps {
  variant: 'full' | 'compact';
}

export function LoadingState({ variant }: LoadingStateProps) {
  if (variant === 'full') {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8 min-h-[140px]">
          <div className="flex flex-col items-center gap-2">
            <Headphones className="h-10 w-10 text-amber-500" />
            <span className="text-sm text-muted-foreground animate-pulse">Loading music status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="relative overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-0 rounded-none max-w-dvw">
      <CardContent className="p-4">
        <div className="flex items-center justify-center">
          <Headphones className="h-6 w-6 text-amber-500" />
          <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
        </div>
      </CardContent>
    </Card>
  );
}
