'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import type { NormalizedGitHubUser } from '@/types/github';
import { Users, Heart, ExternalLink } from 'lucide-react';

interface GitHubCommunityProps {
  profile: NormalizedGitHubUser;
}

export function GitHubCommunity({ profile }: GitHubCommunityProps) {
  const { sponsors, followers } = profile;

  return (
    <Card className="w-full bg-transparent max-h-[600px] overflow-auto border-none shadow-none rounded-none">
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
              <span>Followers (100+)</span>
            </TabsTrigger>
          </TabsList>
          <div className="p-4">
            <TabsContent value="sponsors" className="mt-0">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {sponsors.map((sponsor) => (
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
                        <AvatarImage src={sponsor.avatarUrl} alt={sponsor.login} />
                        <AvatarFallback>{sponsor.login[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium truncate w-full">{sponsor.login}</span>
                      {sponsor.bio && <p className="text-xs text-muted-foreground line-clamp-1">{sponsor.bio}</p>}
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" className="gap-2 hover:text-rose-600 hover:bg-rose-100/10" asChild>
                  <a href={`${profile.url}?tab=sponsors`} target="_blank" rel="noopener noreferrer">
                    Become a sponsor
                    <Heart className="h-4 w-4 text-rose-500" />
                  </a>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="followers" className="mt-0">
              <div className="flex flex-wrap justify-center gap-2">
                {followers.edges.map(({ node: follower }) => (
                  <a
                    key={follower.login}
                    href={follower.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-1 rounded-lg p-1.5 text-center transition-all hover:bg-muted/50 hover:scale-105 w-[calc(20%-8px)] min-w-[60px]"
                    aria-label={`View ${follower.login}'s GitHub profile`}
                  >
                    <Avatar className="h-8 w-8 transition-transform group-hover:scale-110">
                      <AvatarImage src={follower.avatarUrl} alt={follower.login} />
                      <AvatarFallback>{follower.login[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] font-medium truncate w-full">{follower.login}</span>
                  </a>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={`${profile.url}?tab=followers`} target="_blank" rel="noopener noreferrer">
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
