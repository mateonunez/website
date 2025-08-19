'use client';

import { ArrowUpDown, Clock, Code, ExternalLink, GitFork, Loader2, Search, Star } from 'lucide-react';
import { memo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGithub } from '@/hooks/use-github';
import { formatDate, getTimeAgo } from '@/lib/helpers/date';
import type { NormalizedGitHubRepository } from '@/types/github';

interface RepositoriesShowcaseProps {
  featured?: boolean;
  limit?: number;
}

type SortOption = 'stars' | 'forks' | 'recent' | 'name';

const RepositoryCard = memo(({ repository }: { repository: NormalizedGitHubRepository }) => {
  const formattedDate = formatDate(new Date(repository.pushedAt));
  const timeAgo = getTimeAgo(new Date(repository.pushedAt));

  return (
    <Card className="flex flex-col h-full w-full transition-all duration-300 hover:shadow-md hover:border-amber-500/30 hover:bg-amber-500/5">
      <CardHeader className="p-3 sm:p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-sm sm:text-base font-medium truncate" title={repository.name}>
              {repository.name}
            </CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" asChild>
            <a
              href={repository.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${repository.name} on GitHub`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
        <div className="min-h-[2.5rem] mt-1">
          {repository.description && (
            <CardDescription className="line-clamp-2 text-xs">{repository.description}</CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-3 sm:p-4 pt-0 pb-2">
        {repository.language && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: repository.languageColor || '#ccc' }}
              />
              <span className="text-xs text-muted-foreground">{repository.language}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-1 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-500" />
            <span className="text-xs text-muted-foreground">{repository.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            <span className="text-xs text-muted-foreground">{repository.forks}</span>
          </div>
        </div>
        <Badge variant="outline" className="text-xs gap-1 whitespace-nowrap px-1.5 py-0.5 h-5">
          <Clock className="h-2.5 w-2.5" />
          <span title={formattedDate}>{timeAgo}</span>
        </Badge>
      </CardFooter>
    </Card>
  );
});

RepositoryCard.displayName = 'RepositoryCard';

export function RepositoriesShowcase({ featured = false, limit = featured ? 6 : 12 }: RepositoriesShowcaseProps) {
  const { data, isLoading, isError } = useGithub();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [currentTab, setCurrentTab] = useState('all');

  if (isLoading) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data?.profile) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          Unable to load repositories
        </CardContent>
      </Card>
    );
  }

  const { repositories } = data.profile;

  if (!repositories || repositories.length === 0) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          No repositories available
        </CardContent>
      </Card>
    );
  }

  const languages = Array.from(new Set(repositories.map((repo) => repo.language).filter(Boolean) as string[]));

  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = currentTab === 'all' || repo.language === currentTab;

    return matchesSearch && matchesLanguage;
  });

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    switch (sortBy) {
      case 'stars':
        return b.stars - a.stars;
      case 'forks':
        return b.forks - a.forks;
      case 'recent':
        return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const displayedRepos = sortedRepos.slice(0, limit);

  if (displayedRepos.length === 0) {
    return (
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardContent className="flex flex-col items-center justify-center p-8 text-sm text-muted-foreground">
          <p>No repositories match your filters</p>
          {searchTerm && (
            <Button variant="link" onClick={() => setSearchTerm('')} className="mt-2">
              Clear search
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
      <CardHeader className="p-3 sm:p-4 pb-0">
        <CardTitle className="text-base sm:text-lg flex items-center gap-1.5 sm:gap-2 font-hanken">
          <Code className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
          GitHub Repositories
        </CardTitle>
        <CardDescription className="text-xs">
          {featured ? 'Featured open source projects on GitHub' : `${repositories.length} repositories available`}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <div className="p-2 sm:p-4 space-y-3 sm:space-y-4">
          {!featured && (
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center justify-between">
              <div className="relative w-full sm:w-auto sm:flex-grow sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search repositories..."
                  className="pl-9 h-9 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select defaultValue={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="h-9 w-full sm:w-[180px] gap-1">
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stars">Most Stars</SelectItem>
                    <SelectItem value="forks">Most Forks</SelectItem>
                    <SelectItem value="recent">Recently Updated</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {!featured && languages.length > 0 && (
            <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
              <div className="overflow-x-auto overflow-y-hidden">
                <TabsList className="w-full flex justify-start bg-muted/30 p-1.5 tabs-scrollbar">
                  <div className="flex min-w-max gap-1.5 sm:gap-2 px-1.5 sm:px-2 pb-0.5">
                    <TabsTrigger
                      value="all"
                      className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 h-9 sm:h-10 text-xs font-medium transition-all duration-200 hover:bg-muted/50 data-[state=active]:bg-background data-[state=active]:text-amber-500 data-[state=active]:font-semibold data-[state=active]:border-amber-500/50"
                    >
                      <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate">All</span>
                    </TabsTrigger>
                    {languages.map((language) => (
                      <TabsTrigger
                        key={language}
                        value={language}
                        className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 h-9 sm:h-10 text-xs font-medium transition-all duration-200 hover:bg-muted/50 data-[state=active]:bg-background data-[state=active]:text-amber-500 data-[state=active]:font-semibold data-[state=active]:border-amber-500/50"
                      >
                        <span className="truncate">{language}</span>
                      </TabsTrigger>
                    ))}
                  </div>
                </TabsList>
              </div>
            </Tabs>
          )}

          <div
            className="w-full grid gap-3 sm:gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
            }}
          >
            {displayedRepos.map((repo) => (
              <RepositoryCard key={repo.url} repository={repo} />
            ))}
          </div>

          {featured && repositories.length > limit && (
            <div className="pt-2 sm:pt-4 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto gap-2 text-xs sm:text-sm h-8 sm:h-9 transition-all hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-500/30"
                asChild
              >
                <a href="/open-source/projects">
                  <span>View all projects</span>
                  <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
