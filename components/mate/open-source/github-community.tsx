'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Users, Heart, ExternalLink, Loader2 } from 'lucide-react';
import { useGithub } from '@/lib/hooks/use-github';
import type { NormalizedGitHubFollower, NormalizedGitHubSponsor } from '@/types/github';
import { useState } from 'react';

const ITEMS_PER_PAGE = 10;

interface SponsorCardProps {
  sponsor: NormalizedGitHubSponsor;
}

interface FollowerCardProps {
  follower: NormalizedGitHubFollower;
}

function SponsorCard({ sponsor }: SponsorCardProps) {
  return (
    <a
      key={sponsor.login}
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center gap-2 rounded-lg p-2 text-center transition-all hover:bg-muted/50 hover:scale-105 w-[calc(33.33%-8px)] sm:w-[calc(50%-16px)] md:w-[calc(50%-16px)]"
      aria-label={`View ${sponsor.login}'s GitHub profile`}
    >
      <div className="relative">
        <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 blur-sm" />
        <Avatar className="h-12 w-12 border-2 border-rose-500/20 transition-transform group-hover:scale-110">
          <AvatarImage src={sponsor.avatar} alt={sponsor.login} />
          <AvatarFallback>{sponsor.login[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium truncate w-full">{sponsor.login}</span>
        {sponsor.bio && <p className="text-xs text-muted-foreground line-clamp-1">{sponsor.bio}</p>}
      </div>
    </a>
  );
}

function FollowerCard({ follower }: FollowerCardProps) {
  return (
    <a
      key={follower.username}
      href={follower.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-1 rounded-lg p-1.5 text-center transition-all hover:bg-muted/50 hover:scale-105 w-[calc(20%-8px)] min-w-[60px]"
      aria-label={`View ${follower.username}'s GitHub profile`}
    >
      <Avatar className="h-8 w-8 transition-transform group-hover:scale-110">
        <AvatarImage src={follower.avatar} alt={follower.username} />
        <AvatarFallback>{follower.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="text-xs font-medium truncate w-full">{follower.username}</span>
    </a>
  );
}

export function GitHubCommunity() {
  const { data: githubData, isLoading, isError } = useGithub();
  const [visibleSponsors, setVisibleSponsors] = useState(ITEMS_PER_PAGE);
  const [visibleFollowers, setVisibleFollowers] = useState(ITEMS_PER_PAGE);

  const loadMoreSponsors = () => {
    setVisibleSponsors((prev) => prev + ITEMS_PER_PAGE);
  };

  const loadMoreFollowers = () => {
    setVisibleFollowers((prev) => prev + ITEMS_PER_PAGE);
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

  if (isError || !githubData) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          Unable to load GitHub data
        </CardContent>
      </Card>
    );
  }

  const { sponsors, followers, url } = githubData.profile;
  const displayedSponsors = sponsors.slice(0, visibleSponsors);
  const displayedFollowers = followers.slice(0, visibleFollowers);
  const hasMoreSponsors = visibleSponsors < sponsors.length;
  const hasMoreFollowers = visibleFollowers < followers.length;

  return (
    <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
      <CardHeader className="p-3 sm:p-4 pb-0">
        <CardTitle className="text-base sm:text-lg flex items-center gap-1.5 sm:gap-2 font-hanken">
          <Users className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
          GitHub Community
        </CardTitle>
        <CardDescription className="text-xs">My amazing sponsors and followers on GitHub</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="sponsors" className="w-full">
          <div className="overflow-x-auto overflow-y-hidden">
            <TabsList className="w-full flex justify-start bg-muted/30 p-1.5 tabs-scrollbar">
              <div className="flex min-w-max gap-1.5 sm:gap-2 px-1.5 sm:px-2 pb-0.5">
                <TabsTrigger
                  value="sponsors"
                  className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 h-9 sm:h-10 text-xs font-medium transition-all duration-200 hover:bg-muted/50 data-[state=active]:bg-background data-[state=active]:text-amber-500 data-[state=active]:font-semibold data-[state=active]:border-amber-500/50"
                >
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500" />
                  <span className="truncate">Sponsors ({sponsors.length})</span>
                </TabsTrigger>
                <TabsTrigger
                  value="followers"
                  className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 h-9 sm:h-10 text-xs font-medium transition-all duration-200 hover:bg-muted/50 data-[state=active]:bg-background data-[state=active]:text-amber-500 data-[state=active]:font-semibold data-[state=active]:border-amber-500/50"
                >
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="truncate">Followers ({followers.length})</span>
                </TabsTrigger>
              </div>
            </TabsList>
          </div>
          <div className="p-2 sm:p-4">
            <TabsContent value="sponsors" className="mt-0 space-y-1 sm:space-y-2">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {displayedSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.login} sponsor={sponsor} />
                ))}
              </div>
              {hasMoreSponsors && (
                <div className="pt-2 sm:pt-4 flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadMoreSponsors}
                    className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9 transition-all hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-500/30"
                  >
                    Load More
                  </Button>
                </div>
              )}
              <div className="pt-2 sm:pt-4 flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto gap-2 text-xs sm:text-sm h-8 sm:h-9 transition-all hover:bg-rose-500/10 hover:text-rose-700 dark:hover:text-rose-300 hover:border-rose-500/30"
                  asChild
                >
                  <a href={`${url}?tab=sponsors`} target="_blank" rel="noopener noreferrer">
                    Become a sponsor
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500" />
                  </a>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="followers" className="mt-0 space-y-1 sm:space-y-2">
              <div className="flex flex-wrap justify-center gap-2">
                {displayedFollowers.map((follower) => (
                  <FollowerCard key={follower.username} follower={follower} />
                ))}
              </div>
              {hasMoreFollowers && (
                <div className="pt-2 sm:pt-4 flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadMoreFollowers}
                    className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9 transition-all hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-500/30"
                  >
                    Load More
                  </Button>
                </div>
              )}
              <div className="pt-2 sm:pt-4 flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto gap-2 text-xs sm:text-sm h-8 sm:h-9 transition-all hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-500/30"
                  asChild
                >
                  <a href={`${url}?tab=followers`} target="_blank" rel="noopener noreferrer">
                    View all followers
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
