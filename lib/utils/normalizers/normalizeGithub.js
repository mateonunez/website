export const normalizeGithubProfile = ({
  avatarUrl,
  bio,
  company,
  email,
  login,
  location,
  url,
  repositories
}) => ({
  avatar: avatarUrl,
  bio,
  company,
  email,
  location,
  username: login,
  url,
  repositories: repositories.edges.map(egde => normalizeRepository(egde.node))
});

export const normalizeRepository = ({
  name,
  url,
  description,
  pushedAt,
  stargazerCount,
  forkCount,
  primaryLanguage
}) => ({
  name,
  url,
  description,
  pushedAt,
  stars: stargazerCount,
  forks: forkCount,
  language: primaryLanguage?.name,
  languageColor: primaryLanguage?.color
});
