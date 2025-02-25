'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useGithub } from '@/lib/hooks/use-github';
import { Github, Loader2 } from 'lucide-react';
import { CalendarGrid } from '@/components/mate/calendar-grid';

export function GitHubContributionGraph() {
  const { data, isLoading, isError } = useGithub();

  if (isLoading) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data?.profile?.contributions?.calendar) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <Github className="h-5 w-5 text-muted-foreground" />
            <p>Unable to load GitHub contribution data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { calendar } = data.profile.contributions;
  const weeks = calendar.weeks;
  const total = calendar.totalContributions;

  return (
    <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
      <CardContent className="p-4">
        <CalendarGrid weeks={weeks} totalContributions={total} />
      </CardContent>
    </Card>
  );
}
