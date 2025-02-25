'use client';

import { useState, memo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, GitFork, Code, ExternalLink, Search, Clock, ArrowUpDown, Loader2 } from 'lucide-react';
import { useGithub } from '@/lib/hooks/use-github';
import type { NormalizedGitHubRepository } from '@/types/github';

interface RepositoriesShowcaseProps {
  featured?: boolean;
  limit?: number;
}

type SortOption = 'stars' | 'forks' | 'recent' | 'name';

const RepositoryCard = memo(({ repository }: { repository: NormalizedGitHubRepository }) => {
  const formattedDate = new Date(repository.pushedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const timeAgo = getTimeAgo(new Date(repository.pushedAt));

  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-md hover:border-amber-500/30 hover:bg-amber-500/5">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-medium truncate">{repository.name}</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" asChild>
            <a
              href={repository.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${repository.name} on GitHub`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        {repository.description && (
          <CardDescription className="line-clamp-2 h-10 text-sm sm:text-base">{repository.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        {repository.language && (
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: repository.languageColor || '#ccc' }} />
              <span className="text-xs text-muted-foreground">{repository.language}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs">{repository.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" />
            <span className="text-xs">{repository.forks}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Badge variant="outline" className="text-xs gap-1 whitespace-nowrap">
            <Clock className="h-3 w-3" />
            <span title={formattedDate}>{timeAgo}</span>
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
});

RepositoryCard.displayName = 'RepositoryCard';

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

export function RepositoriesShowcase({ featured = false, limit = featured ? 6 : 12 }: RepositoriesShowcaseProps) {
  const { data, isLoading, isError } = useGithub();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('stars');
  const [currentTab, setCurrentTab] = useState('all');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
      </div>
    );
  }

  if (isError || !data?.profile) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          Unable to load repositories
        </CardContent>
      </Card>
    );
  }

  const { repositories } = data.profile;

  if (!repositories || repositories.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          No repositories available
        </CardContent>
      </Card>
    );
  }

  // Extract unique languages from repositories
  const languages = Array.from(new Set(repositories.map((repo) => repo.language).filter(Boolean) as string[]));

  // Filter repositories based on search term and selected language only
  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = currentTab === 'all' || repo.language === currentTab;

    return matchesSearch && matchesLanguage;
  });

  // Sort repositories based on selected sort option
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

  // Limit the number of repositories to display
  const displayedRepos = sortedRepos.slice(0, limit);

  // If no repos match filters, show a message
  if (displayedRepos.length === 0) {
    return (
      <Card className="w-full border border-border/50">
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
    <div className="space-y-4">
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
          <TabsList className="flex overflow-x-auto pb-px h-auto tabs-scrollbar w-full">
            <div className="flex min-w-max gap-1 p-0.5">
              <TabsTrigger value="all" className="rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-xs h-7 sm:h-8">
                All
              </TabsTrigger>
              {languages.map((language) => (
                <TabsTrigger
                  key={language}
                  value={language}
                  className="rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-xs h-7 sm:h-8"
                >
                  {language}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </Tabs>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {displayedRepos.map((repo) => (
          <RepositoryCard key={repo.url} repository={repo} />
        ))}
      </div>

      {featured && repositories.length > limit && (
        <div className="flex justify-center mt-4 sm:mt-6">
          <Button variant="outline" className="gap-2 w-full sm:w-auto" asChild>
            <a href="/open-source/projects">
              <span>View all projects</span>
              <Code className="h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
