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

// Normalized types for the UI
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

export interface NormalizedGitHubUser {
  avatar: string;
  bio: string | null;
  company: string | null;
  followers: {
    edges: Array<{
      node: GitHubFollower;
    }>;
  };
  email: string | null;
  login: string;
  username: string;
  location: string | null;
  url: string;
  sponsors: GitHubSponsor[];
  repositories: NormalizedGitHubRepository[];
  contributions: {
    total: number;
    calendar: GitHubContributionCalendar;
    byRepository: Array<{
      repository: NormalizedGitHubRepository;
      total: number;
      commits: GitHubContribution[];
    }>;
  };
}
