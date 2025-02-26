export interface GitHubLanguage {
  name: string;
  color: string;
}

export interface GitHubRepository {
  name: string;
  url: string;
  description: string | null;
  pushedAt: string;
  stargazerCount: number;
  forkCount: number;
  isPrivate?: boolean;
  primaryLanguage: GitHubLanguage | null;
  owner: {
    login: string;
  };
  readme?: {
    text: string;
  };
}

export interface GitHubContribution {
  occurredAt: string;
  commitCount: number;
}

export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

export interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

export interface GitHubRepositoryContribution {
  repository: GitHubRepository;
  contributions: {
    totalCount: number;
    nodes: GitHubContribution[];
  };
}

export interface GitHubFollower {
  avatarUrl: string;
  login: string;
  url: string;
}

export interface GitHubSponsor {
  avatarUrl: string;
  bio: string | null;
  login: string;
  url: string;
  repositories: {
    edges: Array<{
      node: GitHubRepository;
    }>;
  };
}

export interface GitHubUser {
  avatarUrl: string;
  bio: string | null;
  company: string | null;
  followers: {
    edges: Array<{
      node: GitHubFollower;
    }>;
  };
  email: string | null;
  login: string;
  location: string | null;
  url: string;
  sponsorshipsAsMaintainer: {
    totalCount: number;
    edges: Array<{
      node: {
        sponsor: GitHubSponsor;
      };
    }>;
  };
  repositories: {
    edges: Array<{
      node: GitHubRepository;
    }>;
  };
  contributionsCollection: {
    contributionCalendar: GitHubContributionCalendar;
    commitContributionsByRepository: GitHubRepositoryContribution[];
  };
}

export interface GitHubReadmeResponse {
  repository: {
    readme: {
      text: string;
    };
  };
}

export interface GitHubRepositoryResponse {
  repository: GitHubRepository | null;
}

export interface NormalizedGitHubRepository {
  name: string;
  url: string;
  description: string | null;
  pushedAt: string;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string | null;
}

export interface NormalizedGitHubFollower {
  avatar: string;
  username: string;
  url: string;
}

export interface NormalizedGitHubSponsor {
  avatar: string;
  bio: string | null;
  login: string;
  url: string;
  repositories: NormalizedGitHubRepository[];
}

export interface NormalizedGitHubUser {
  avatar: string;
  bio: string | null;
  company: string | null;
  email: string | null;
  username: string;
  location: string | null;
  url: string;
  sponsors: NormalizedGitHubSponsor[];
  followers: NormalizedGitHubFollower[];
  repositories: NormalizedGitHubRepository[];
  login: string;
}

export interface GitHubActivityType {
  name: string;
  color?: string;
  icon?: string;
}

export interface GitHubActivity {
  id: string;
  type: 'commit' | 'pull_request' | 'issue' | 'review' | 'fork' | 'star' | 'release' | 'other';
  title: string;
  description?: string;
  repo: {
    name: string;
    url: string;
    owner: string;
  };
  createdAt: string;
  url: string;
  actor?: {
    login: string;
    avatarUrl: string;
    url: string;
  };
}

export interface GitHubActivitiesResponse {
  viewer: {
    login: string;
    contributionsCollection: {
      commitContributionsByRepository: GitHubRepositoryContribution[];
    };
    pullRequests: {
      nodes: Array<{
        id: string;
        title: string;
        url: string;
        createdAt: string;
        closed: boolean;
        merged: boolean;
        state: string;
        repository: {
          name: string;
          url: string;
          isPrivate: boolean;
        };
      }>;
    };
    issues: {
      nodes: Array<{
        id: string;
        title: string;
        url: string;
        createdAt: string;
        closed: boolean;
        state: string;
        repository: {
          name: string;
          url: string;
          isPrivate: boolean;
        };
      }>;
    };
    starredRepositories: {
      edges: Array<{
        starredAt: string;
        node: {
          id: string;
          name: string;
          url: string;
          isPrivate: boolean;
          owner: {
            login: string;
          };
          stargazers: {
            totalCount: number;
          };
          description: string;
          createdAt: string;
        };
      }>;
    };
  };
}

export interface NormalizedGitHubActivity {
  id: string;
  type: GitHubActivity['type'];
  title: string;
  description?: string;
  repo: {
    name: string;
    fullName: string;
    url: string;
  };
  date: string;
  url: string;
  actor?: {
    username: string;
    avatar: string;
    url: string;
  };
}

export interface LastActivitiesData {
  activities: NormalizedGitHubActivity[];
  activeRepositories: string[];
}
