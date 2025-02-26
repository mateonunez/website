import { graphql } from '@octokit/graphql';
import type {
  GitHubUser,
  GitHubReadmeResponse,
  GitHubRepositoryResponse,
  GitHubActivitiesResponse,
} from '@/types/github';

const { GITHUB_TOKEN } = process.env;

export const getProfile = async (): Promise<GitHubUser> => {
  const { user } = await graphql<{ user: GitHubUser }>(
    `
      query ($username: String!, $sort: RepositoryOrderField!, $limit: Int) {
        user(login: $username) {
          avatarUrl(size: 333)
          bio
          company
          followers(last: 100) {
            edges {
              node {
                avatarUrl(size: 333)
                login
                url
              }
            }
          }
          email
          login
          location
          url
          sponsorshipsAsMaintainer(first: 100) {
            totalCount
            edges {
              node {
                sponsor {
                  avatarUrl(size: 333)
                  bio
                  login
                  url
                  repositories(first: 3, orderBy: { field: STARGAZERS, direction: DESC }) {
                    edges {
                      node {
                        name
                        url
                        description
                        pushedAt
                        stargazerCount
                        forkCount
                        primaryLanguage {
                          name
                          color
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          repositories(
            first: $limit
            isLocked: false
            isFork: false
            ownerAffiliations: OWNER
            privacy: PUBLIC
            orderBy: { field: $sort, direction: DESC }
          ) {
            edges {
              node {
                name
                url
                description
                pushedAt
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
          contributionsCollection {
            commitContributionsByRepository {
              repository {
                name
                url
                description
                pushedAt
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
                isPrivate
              }
              contributions(first: 100) {
                totalCount
                nodes {
                  occurredAt
                  commitCount
                }
              }
            }
          }
        }
      }
    `,
    {
      username: 'mateonunez',
      sort: 'STARGAZERS',
      limit: 50,
      headers: {
        accept: 'application/vnd.github.v3.raw+json',
        authorization: `Bearer ${GITHUB_TOKEN}`,
        encoding: 'utf-8',
      },
    },
  );
  return user;
};

export const getReadme = async (): Promise<GitHubReadmeResponse['repository']['readme']> => {
  const { repository } = await graphql<GitHubReadmeResponse>(
    `
      query ($username: String!, $repo: String!) {
        repository(owner: $username, name: $repo) {
          readme: object(expression: "main:README.md") {
            ... on Blob {
              text
            }
          }
        }
      }
    `,
    {
      username: 'mateonunez',
      repo: 'mateonunez',
      headers: {
        accept: 'application/vnd.github.v3.raw+json',
        authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    },
  );

  const { readme } = repository;

  return readme;
};

export const getRepository = async (repository: string): Promise<GitHubRepositoryResponse['repository']> => {
  const { repository: repositoryFetched } = await graphql<GitHubRepositoryResponse>(
    `
      query ($username: String!, $repo: String!) {
        repository(owner: $username, name: $repo) {
          name
          url
          description
          pushedAt
          stargazerCount
          forkCount
          isPrivate
          primaryLanguage {
            name
            color
          }
          readme: object(expression: "main:README.md") {
            ... on Blob {
              text
            }
          }
        }
      }
    `,
    {
      username: 'mateonunez',
      repo: repository,
      headers: {
        accept: 'application/vnd.github.v3.raw+json',
        authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    },
  );

  if (!repositoryFetched || repositoryFetched.isPrivate) {
    return null;
  }

  return repositoryFetched;
};

export const getLastActivities = async (): Promise<GitHubActivitiesResponse['viewer']> => {
  try {
    const { viewer } = await graphql<GitHubActivitiesResponse>(
      `
        query {
          viewer {
            login
            contributionsCollection {
              commitContributionsByRepository(maxRepositories: 10) {
                repository {
                  name
                  url
                  description
                  pushedAt
                  stargazerCount
                  forkCount
                  isPrivate
                  owner {
                    login
                  }
                  primaryLanguage {
                    name
                    color
                  }
                }
                contributions(first: 10) {
                  totalCount
                  nodes {
                    occurredAt
                    commitCount
                    repository {
                      name
                      url
                    }
                  }
                }
              }
            }
            pullRequests(
              first: 10
              orderBy: {field: CREATED_AT, direction: DESC}
              states: [OPEN, CLOSED, MERGED]
            ) {
              nodes {
                id
                title
                url
                createdAt
                closed
                merged
                state
                repository {
                  name
                  url
                  isPrivate
                  owner {
                    login
                  }
                }
              }
            }
            issues(
              first: 10
              orderBy: {field: CREATED_AT, direction: DESC}
              states: [OPEN, CLOSED]
            ) {
              nodes {
                id
                title
                url
                createdAt
                closed
                state
                repository {
                  name
                  url
                  isPrivate
                  owner {
                    login
                  }
                }
              }
            }
            starredRepositories(first: 10, orderBy: {field: STARRED_AT, direction: DESC}) {
              edges {
                starredAt
                node {
                  id
                  name
                  url
                  isPrivate
                  owner {
                    login
                  }
                  stargazers {
                    totalCount
                  }
                  description
                  createdAt
                }
              }
            }
          }
        }
      `,
      {
        headers: {
          accept: 'application/vnd.github.v3.raw+json',
          authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      },
    );
    return viewer;
  } catch (error) {
    console.error('Error fetching GitHub activities:', error);
    throw new Error('Failed to fetch GitHub activities');
  }
};
