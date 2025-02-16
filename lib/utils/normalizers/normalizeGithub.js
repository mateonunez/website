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
}) {
  return {
    avatar: avatarUrl,
    bio,
    company,
    email,
    followers: normalizeFollowers(followers.edges),
    location,
    username: login,
    url,
    sponsors: sponsors.edges.map((egde) => ({
      ...normalizeFollower(egde.node.sponsor),
      repositories: normalizeRepositories(egde.node.sponsor.repositories.edges),
    })),
    repositories: normalizeRepositories(repositories.edges),
    contributions: normalizeContributions(contributions),
  };
}

function normalizeFollower({ avatarUrl, login, url }) {
  return {
    avatar: avatarUrl,
    username: login,
    url,
  };
}

function normalizeFollowers(followers) {
  const normalizedFollowers = [];
  for (const { node: follower } of followers) {
    normalizedFollowers.push(normalizeFollower(follower));
  }
  return normalizedFollowers;
}

function normalizeRepositories(repositories) {
  const normalizedRepositories = [];
  for (const { node: repository } of repositories) {
    normalizedRepositories.push(normalizeRepository(repository));
  }
  return normalizedRepositories;
}

function normalizeRepository({ name, url, description, pushedAt, stargazerCount, forkCount, primaryLanguage }) {
  return {
    name,
    url,
    description,
    pushedAt,
    stars: stargazerCount,
    forks: forkCount,
    language: primaryLanguage?.name,
    languageColor: primaryLanguage?.color,
  };
}

function normalizeContributions(contributions) {
  const lastWeek = normalizeWeekContributions(contributions.contributionCalendar.weeks[0]);
  const total = contributions.contributionCalendar.totalContributions;
  const activity = normalizeActivity(contributions.commitContributionsByRepository);

  const normalizedContributions = {
    lastWeek,
    activity,
    total,
  };

  return normalizedContributions;
}

function normalizeWeekContributions(week) {
  const { contributionDays } = week;
  const firstDay = contributionDays[0].date;
  const lastDay = contributionDays.at(-1).date;
  const lastWeek = {
    from: firstDay,
    to: lastDay,
    contributions: contributionDays.reduce((acc, day) => {
      // biome-ignore lint/style/noParameterAssign: reassigning parameters is fine here
      acc += day.contributionCount;
      return acc;
    }, 0),
  };

  return lastWeek;
}

function normalizeActivity(repositories) {
  let activity = [];
  for (const { contributions, repository } of repositories) {
    const {
      totalCount,
      nodes: [...occurredAt],
    } = contributions;

    activity.push({
      dates: occurredAt,
      total: totalCount,
      repository: repository.isPrivate ? null : normalizeRepository(repository),
      private: repository.isPrivate,
    });
  }
  activity = activity.sort((a, b) => {
    if (a.total > b.total) return -1;
    if (a.total < b.total) return 1;
    return 0;
  });

  return activity;
}

export {
  normalizeGitHubProfile,
  normalizeFollower,
  normalizeFollowers,
  normalizeRepository,
  normalizeRepositories,
  normalizeContributions,
};
