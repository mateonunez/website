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
      <span className="text-[10px] font-medium truncate w-full">{follower.username}</span>
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
      <Card className="w-full bg-transparent border-none shadow-none rounded-none">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !githubData) {
    return (
      <Card className="w-full bg-transparent border-none shadow-none rounded-none">
        <CardContent className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          Unable to load GitHub data
        </CardContent>
      </Card>
    );
  }

  const { sponsors, followers, url } = githubData;
  const displayedSponsors = sponsors.slice(0, visibleSponsors);
  const displayedFollowers = followers.slice(0, visibleFollowers);
  const hasMoreSponsors = visibleSponsors < sponsors.length;
  const hasMoreFollowers = visibleFollowers < followers.length;

  return (
    <Card className="w-full bg-transparent border-none shadow-none rounded-none">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">GitHub Community</CardTitle>
        <CardDescription className="text-xs">My amazing sponsors and followers on GitHub</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="sponsors" className="w-full">
          <TabsList className="w-full grid grid-cols-2 rounded-none bg-muted/50">
            <TabsTrigger value="sponsors" className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500" />
              <span>Sponsors ({sponsors.length})</span>
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Followers ({followers.length})</span>
            </TabsTrigger>
          </TabsList>
          <div className="p-4">
            <TabsContent value="sponsors" className="mt-0">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {displayedSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.login} sponsor={sponsor} />
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-4">
                {hasMoreSponsors && (
                  <Button variant="outline" size="sm" onClick={loadMoreSponsors}>
                    Load More
                  </Button>
                )}
                <Button variant="outline" size="sm" className="gap-2 hover:text-rose-600 hover:bg-rose-100/10" asChild>
                  <a href={`${url}?tab=sponsors`} target="_blank" rel="noopener noreferrer">
                    Become a sponsor
                    <Heart className="h-4 w-4 text-rose-500" />
                  </a>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="followers" className="mt-0">
              <div className="flex flex-wrap justify-center gap-2">
                {displayedFollowers.map((follower) => (
                  <FollowerCard key={follower.username} follower={follower} />
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-4">
                {hasMoreFollowers && (
                  <Button variant="outline" size="sm" onClick={loadMoreFollowers}>
                    Load More
                  </Button>
                )}
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={`${url}?tab=followers`} target="_blank" rel="noopener noreferrer">
                    View all followers
                    <ExternalLink className="h-4 w-4" />
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
