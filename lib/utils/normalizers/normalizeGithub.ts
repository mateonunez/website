import type {
  GitHubUser,
  GitHubRepository,
  GitHubContributionCalendar,
  GitHubRepositoryContribution,
  NormalizedGitHubUser,
  NormalizedGitHubRepository,
  GitHubSponsor,
  NormalizedGitHubSponsor,
  GitHubActivitiesResponse,
  LastActivitiesData,
  NormalizedGitHubActivity,
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
    followers: normalizeFollowers(user.followers),
    email: user.email,
    login: user.login,
    username: user.login,
    location: user.location,
    url: user.url,
    sponsors: user.sponsorshipsAsMaintainer.edges.map((edge) => normalizeSponsor(edge.node.sponsor)),
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

function normalizeSponsor(sponsor: GitHubSponsor): NormalizedGitHubSponsor {
  return {
    avatar: sponsor.avatarUrl,
    bio: sponsor.bio,
    login: sponsor.login,
    url: sponsor.url,
    repositories: sponsor.repositories.edges.map((edge) => normalizeRepository(edge.node)),
  };
}

export function normalizeGitHubActivities(data: GitHubActivitiesResponse['viewer']): LastActivitiesData {
  const activities: NormalizedGitHubActivity[] = [];
  const activeRepositories: Set<string> = new Set();

  function getRepoInfo(repository: any): {
    name: string;
    fullName: string;
    url: string;
  } {
    const repoName = repository.name;
    const repoOwner = repository.owner.login;
    const repoFullName = `${repoOwner}/${repoName}`;
    return { name: repoName, fullName: repoFullName, url: repository.url };
  }

  if (data.contributionsCollection?.commitContributionsByRepository) {
    data.contributionsCollection.commitContributionsByRepository.forEach((repoContrib) => {
      if (!repoContrib.repository.isPrivate) {
        const repo = getRepoInfo(repoContrib.repository);
        activeRepositories.add(repo.fullName);

        repoContrib.contributions.nodes.forEach((commit) => {
          activities.push({
            id: `commit-${repo.fullName}-${commit.occurredAt}`,
            type: 'commit',
            title: `Committed ${commit.commitCount} ${commit.commitCount === 1 ? 'time' : 'times'}`,
            description: `in ${repo.fullName}`,
            repo,
            date: commit.occurredAt,
            url: `${repo.url}/commits`,
          });
        });
      }
    });
  }

  if (data.pullRequests?.nodes) {
    data.pullRequests.nodes.forEach((pr) => {
      if (!pr.repository.isPrivate) {
        const repo = getRepoInfo(pr.repository);
        activeRepositories.add(repo.fullName);

        let stateDesc = '';
        if (pr.merged) {
          stateDesc = '(merged)';
        } else if (pr.closed) {
          stateDesc = '(closed)';
        } else {
          stateDesc = '(open)';
        }

        activities.push({
          id: pr.id,
          type: 'pull_request',
          title: pr.title,
          description: `Pull request ${stateDesc} in ${repo.fullName}`,
          repo,
          date: pr.createdAt,
          url: pr.url,
        });
      }
    });
  }

  if (data.issues?.nodes) {
    data.issues.nodes.forEach((issue) => {
      if (!issue.repository.isPrivate) {
        const repo = getRepoInfo(issue.repository);
        activeRepositories.add(repo.fullName);

        activities.push({
          id: issue.id,
          type: 'issue',
          title: issue.title,
          description: `Issue ${issue.closed ? '(closed)' : '(open)'} in ${repo.fullName}`,
          repo,
          date: issue.createdAt,
          url: issue.url,
        });
      }
    });
  }

  if (data.starredRepositories?.edges) {
    data.starredRepositories.edges.forEach((edge) => {
      const repo = edge.node;
      if (!repo.isPrivate) {
        const repoInfo = getRepoInfo(repo);
        activeRepositories.add(repoInfo.fullName);

        activities.push({
          id: repo.id,
          type: 'star',
          title: `Starred ${repoInfo.fullName}`,
          description: repo.description || `Repository with ${repo.stargazers.totalCount} stars`,
          repo: repoInfo,
          date: edge.starredAt,
          url: repo.url,
        });
      }
    });
  }

  // Sort activities by date (most recent first)
  const sortedActivities = activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    activities: sortedActivities,
    activeRepositories: Array.from(activeRepositories),
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
  normalizeSponsor,
};
