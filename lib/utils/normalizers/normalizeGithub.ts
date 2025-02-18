import type {
  GitHubUser,
  GitHubRepository,
  GitHubContributionCalendar,
  GitHubRepositoryContribution,
  NormalizedGitHubUser,
  NormalizedGitHubRepository,
} from '@/types/github';

interface NormalizedFollower {
  avatar: string;
  username: string;
  url: string;
}

interface NormalizedRepository {
  name: string;
  url: string;
  description: string | null;
  pushedAt: string;
  stars: number;
  forks: number;
  language?: string;
  languageColor?: string;
}

interface NormalizedContributions {
  lastWeek: {
    from: string;
    to: string;
    contributions: number;
  };
  activity: Array<{
    dates: Array<{ occurredAt: string; commitCount: number }>;
    total: number;
    repository: NormalizedGitHubRepository | null;
    private: boolean;
  }>;
  total: number;
}

interface NormalizedSponsor {
  avatar: string;
  bio: string | null;
  login: string;
  url: string;
  repositories: NormalizedRepository[];
}

interface NormalizedGitHubProfile {
  avatar: string;
  bio: string | null;
  company: string | null;
  email: string | null;
  followers: NormalizedFollower[];
  location: string | null;
  username: string;
  url: string;
  sponsors: NormalizedSponsor[];
  repositories: NormalizedRepository[];
  contributions: NormalizedContributions;
}

function normalizeGitHubProfile({
  avatarUrl,
  bio,
  company,
  email,
  followers,
  login,
  location,
  url,
  sponsorshipsAsMaintainer: sponsors,
  repositories,
  contributionsCollection: contributions,
}: GitHubUser): NormalizedGitHubProfile {
  return {
    avatar: avatarUrl,
    bio,
    company,
    email,
    followers: normalizeFollowers(followers),
    location,
    username: login,
    url,
    sponsors: sponsors.edges.map((sponsor) => ({
      avatar: sponsor.node.sponsor.avatarUrl,
      bio: sponsor.node.sponsor.bio,
      login: sponsor.node.sponsor.login,
      url: sponsor.node.sponsor.url,
      repositories: normalizeRepositories(sponsor.node.sponsor.repositories.edges.map((repo) => repo.node)),
    })),
    repositories: normalizeRepositories(repositories.edges.map((repo) => repo.node)),
    contributions: normalizeContributions(contributions),
  };
}

function normalizeFollower({ avatarUrl, login, url }: GitHubUser['followers']['edges'][0]['node']): NormalizedFollower {
  return {
    avatar: avatarUrl,
    username: login,
    url,
  };
}

function normalizeFollowers(followers: GitHubUser['followers']): NormalizedFollower[] {
  const normalizedFollowers: NormalizedFollower[] = [];
  for (const follower of followers.edges) {
    normalizedFollowers.push(normalizeFollower(follower.node));
  }
  return normalizedFollowers;
}

function normalizeRepositories(repositories: GitHubRepository[]): NormalizedRepository[] {
  const normalizedRepositories: NormalizedRepository[] = [];
  for (const repository of repositories) {
    normalizedRepositories.push(normalizeRepository(repository));
  }
  return normalizedRepositories;
}

export function normalizeRepository(repository: GitHubRepository): NormalizedGitHubRepository {
  return {
    name: repository.name,
    url: repository.url,
    description: repository.description,
    pushedAt: repository.pushedAt,
    stars: repository.stargazerCount,
    forks: repository.forkCount,
    language: repository.primaryLanguage?.name ?? null,
    languageColor: repository.primaryLanguage?.color ?? null,
  };
}

function normalizeContributions(contributions: GitHubUser['contributionsCollection']): NormalizedContributions {
  const lastWeek = normalizeWeekContributions(contributions.contributionCalendar.weeks[0]);
  const total = contributions.contributionCalendar.totalContributions;
  const activity = normalizeActivity(contributions.commitContributionsByRepository);

  return {
    lastWeek,
    activity,
    total,
  };
}

function normalizeWeekContributions(week: GitHubContributionCalendar['weeks'][0]): NormalizedContributions['lastWeek'] {
  const { contributionDays } = week;
  const firstDay = contributionDays[0].date;
  const lastDay = contributionDays.at(-1).date;

  return {
    from: firstDay,
    to: lastDay,
    contributions: contributionDays.reduce((acc, day) => acc + day.contributionCount, 0),
  };
}

function normalizeActivity(repositories: GitHubRepositoryContribution[]): NormalizedContributions['activity'] {
  const activity = repositories.map(({ contributions, repository }) => ({
    dates: contributions.nodes,
    total: contributions.totalCount,
    repository: repository.isPrivate ? null : normalizeRepository(repository),
    private: repository.isPrivate ?? false,
  }));

  return activity.sort((a, b) => b.total - a.total);
}

export function normalizeGitHubUser(user: GitHubUser): NormalizedGitHubUser {
  return {
    avatar: user.avatarUrl,
    bio: user.bio,
    company: user.company,
    followers: user.followers,
    email: user.email,
    login: user.login,
    username: user.login,
    location: user.location,
    url: user.url,
    sponsors: user.sponsorshipsAsMaintainer.edges.map((edge) => edge.node.sponsor),
    repositories: user.repositories.edges.map((edge) => normalizeRepository(edge.node)),
    contributions: {
      total: user.contributionsCollection.contributionCalendar.totalContributions,
      calendar: user.contributionsCollection.contributionCalendar,
      byRepository: user.contributionsCollection.commitContributionsByRepository.map((contribution) => ({
        repository: normalizeRepository(contribution.repository),
        total: contribution.contributions.totalCount,
        commits: contribution.contributions.nodes,
      })),
    },
  };
}

export {
  normalizeGitHubProfile,
  normalizeFollower,
  normalizeFollowers,
  normalizeRepositories,
  normalizeContributions,
  normalizeWeekContributions,
  normalizeActivity,
};
