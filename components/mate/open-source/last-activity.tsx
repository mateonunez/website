'use client';

import { ExternalLink, GitBranch, GitCommit, Github, GitPullRequest, Loader2, MessageSquare, Star } from 'lucide-react';
import { memo, type ReactNode, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGithub } from '@/hooks/use-github';
import type { NormalizedGitHubActivity } from '@/types/github';

const ITEMS_PER_PAGE = 5;
const ACTIVITY_ICONS: Record<string, ReactNode> = {
  commit: <GitCommit className="h-4 w-4" />,
  pull_request: <GitPullRequest className="h-4 w-4" />,
  issue: <MessageSquare className="h-4 w-4" />,
  review: <GitBranch className="h-4 w-4" />,
  star: <Star className="h-4 w-4 text-amber-500" />,
  fork: <GitBranch className="h-4 w-4 text-amber-500" />,
  release: <GitBranch className="h-4 w-4 text-amber-500" />,
  other: <Github className="h-4 w-4" />,
};

const ACTIVITY_COLORS: Record<string, string> = {
  commit: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20',
  pull_request: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20',
  issue: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20',
  review: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20',
  star: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20',
  fork: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20',
  release: 'bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20',
  other: 'bg-neutral-500/10 text-neutral-700 dark:text-neutral-300 border border-neutral-500/20',
};

interface ActivityItemProps {
  activity: NormalizedGitHubActivity;
}

const ActivityItem = memo(({ activity }: ActivityItemProps) => {
  const icon = ACTIVITY_ICONS[activity.type] || ACTIVITY_ICONS.other;
  const badgeColor = ACTIVITY_COLORS[activity.type] || ACTIVITY_COLORS.other;

  const formattedDate = new Date(activity.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const timeAgo = getTimeAgo(new Date(activity.date));

  return (
    <div className="group flex items-start gap-2 sm:gap-3 rounded-lg p-2 sm:p-3 transition-all hover:bg-muted/50 hover:scale-[1.01] animate-in fade-in-50 duration-200">
      <div
        className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full ${badgeColor} transition-colors shadow-sm`}
      >
        {icon}
      </div>
      <div className="flex-1 space-y-1 sm:space-y-1.5 min-w-0">
        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-1">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 max-w-full">
            <p className="text-xs sm:text-sm font-medium leading-none truncate max-w-[150px] sm:max-w-[200px] md:max-w-none">
              {activity.title}
            </p>
            <Badge variant="secondary" className="hidden sm:inline-flex text-xs font-mono">
              {activity.type.replace('_', ' ')}
            </Badge>
            <Badge variant="outline" className="inline-flex sm:hidden text-xs px-1 py-0 h-4 font-mono">
              {activity.type.replace('_', ' ')}
            </Badge>
          </div>
          <time dateTime={activity.date} className="text-xs text-muted-foreground whitespace-nowrap">
            {timeAgo}
          </time>
        </div>
        <p className="text-xs text-muted-foreground flex flex-wrap items-center gap-1 sm:gap-1.5">
          <span className="font-medium text-foreground/80 truncate max-w-[120px] sm:max-w-none">
            {activity.repo.fullName}
          </span>
          <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>{formattedDate}</span>
        </p>
        {activity.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 sm:mt-1.5">{activity.description}</p>
        )}
        <div className="pt-1 sm:pt-2">
          <a
            href={activity.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs inline-flex items-center gap-1 sm:gap-1.5 text-muted-foreground hover:text-primary transition-colors group-hover:underline"
            aria-label={`View ${activity.title} on GitHub`}
          >
            View on GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
});

ActivityItem.displayName = 'ActivityItem';

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}y ago`;
}

export function LastActivity() {
  const { data, isLoading, isError } = useGithub();
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [activeTab, setActiveTab] = useState('all');

  const loadMoreItems = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  if (isLoading) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          Unable to load GitHub activities
        </CardContent>
      </Card>
    );
  }

  const { activities } = data;

  if (!activities) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          No GitHub activities available
        </CardContent>
      </Card>
    );
  }

  const { activities: activityList } = activities;

  if (!activityList || activityList.length === 0) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          No recent GitHub activities found
        </CardContent>
      </Card>
    );
  }

  const activityTypes = [...new Set(activityList.map((a) => a.type))].filter((type) => typeof type === 'string');

  const groupedActivities = activityTypes.reduce(
    (acc, type) => {
      acc[type] = activityList.filter((a) => a.type === type);
      return acc;
    },
    {} as Record<string, NormalizedGitHubActivity[]>,
  );

  const filteredActivities = activeTab === 'all' ? activityList : groupedActivities[activeTab] || [];
  const displayedActivities = filteredActivities.slice(0, visibleItems);
  const hasMoreItems = visibleItems < filteredActivities.length;

  const repositories = [...new Set(activityList.map((activity) => activity.repo.fullName))];

  return (
    <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
      <CardHeader className="p-3 sm:p-4 pb-0">
        <CardTitle className="text-base sm:text-lg flex items-center gap-1.5 sm:gap-2 font-hanken">
          <Github className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
          Latest GitHub Activity
        </CardTitle>
        <CardDescription className="text-xs">
          Contributing to {repositories.length} repositories with {activityList.length} activities
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0" aria-live="polite" aria-atomic="false">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="overflow-x-auto overflow-y-hidden">
            <TabsList className="w-full flex justify-start bg-muted/30 p-1.5 tabs-scrollbar">
              <div className="flex min-w-max gap-1.5 sm:gap-2 px-1.5 sm:px-2 pb-0.5">
                <TabsTrigger
                  value="all"
                  className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 h-9 sm:h-10 text-xs font-medium transition-all duration-200 hover:bg-muted/50 data-[state=active]:bg-background data-[state=active]:text-amber-500 data-[state=active]:font-semibold data-[state=active]:border-amber-500/50"
                >
                  <Github className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="truncate">All</span>
                </TabsTrigger>

                {activityTypes.map((type) => (
                  <TabsTrigger
                    key={type}
                    value={type}
                    className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 h-9 sm:h-10 text-xs font-medium transition-all duration-200 hover:bg-muted/50 data-[state=active]:bg-background data-[state=active]:text-amber-500 data-[state=active]:font-semibold data-[state=active]:border-amber-500/50"
                  >
                    <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0">
                      {ACTIVITY_ICONS[type]}
                    </span>
                    <span className="capitalize truncate">{type.replace('_', ' ')}</span>
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </div>
          <div className="p-2 sm:p-4">
            <TabsContent value="all" className="mt-0 space-y-1 sm:space-y-2">
              {displayedActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </TabsContent>

            {activityTypes.map((type) => (
              <TabsContent key={type} value={type} className="mt-0 space-y-1 sm:space-y-2">
                {groupedActivities[type]?.slice(0, visibleItems).map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </TabsContent>
            ))}

            {hasMoreItems && (
              <div className="pt-2 sm:pt-4 flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadMoreItems}
                  className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9 transition-all hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-500/30"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default memo(LastActivity);
