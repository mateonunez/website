export const normalizeGithubProfile = ({
  avatarUrl,
  bio,
  company,
  email,
  followers,
  login,
  location,
  url,
  sponsorshipsAsMaintainer: sponsors,
  repositories
}) => ({
  avatar: avatarUrl,
  bio,
  company,
  email,
  followers: normalizeFollowers(followers),
  location,
  username: login,
  url,
  sponsors: sponsors.edges.map(egde => ({
    ...normalizeFollower(egde.node.sponsor),
    repositories: normalizeRepositories(egde.node.sponsor.repositories)
  })),
  // repositories: sponsors.edges.map(egde => normalizeRepository(egde.node.repositories))
  repositories: repositories.edges.map(egde => normalizeRepository(egde.node))
});

export const normalizeFollowers = followers =>
  followers.edges.map(egde => normalizeFollower(egde.node));

export const normalizeFollower = ({ avatarUrl, login, url }) => ({
  avatar: avatarUrl,
  username: login,
  url
});

export const normalizeRepositories = repositories =>
  repositories.edges.map(egde => normalizeRepository(egde.node));

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
