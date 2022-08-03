export const normalizeGithubProfile = ({
  avatarUrl,
  bio,
  company,
  email,
  login,
  repositories
}) => ({
  avatar: avatarUrl,
  bio,
  company,
  email,
  username: login,
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
