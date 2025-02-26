import { graphql } from '@octokit/graphql';
import type {
  GitHubUser,
  GitHubReadmeResponse,
  GitHubRepositoryResponse,
  GitHubActivitiesResponse,
} from '@/types/github';

if (!process.env.GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN environment variable is not set');
}

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    accept: 'application/vnd.github.v3.raw+json',
  },
});

const repositoryFields = `
  fragment RepositoryFields on Repository {
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
`;

export const getProfile = async (): Promise<GitHubUser> => {
  try {
    const { user } = await graphqlWithAuth<{ user: GitHubUser }>(
      `
        ${repositoryFields}
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
                          ...RepositoryFields
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
                  ...RepositoryFields
                }
              }
            }
            contributionsCollection {
              commitContributionsByRepository {
                repository {
                  ...RepositoryFields
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
      },
    );
    return user;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    throw new Error('Failed to fetch GitHub profile');
  }
};

export const getReadme = async (): Promise<GitHubReadmeResponse['repository']['readme']> => {
  try {
    const { repository } = await graphqlWithAuth<GitHubReadmeResponse>(
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
      },
    );
    return repository.readme;
  } catch (error) {
    console.error('Error fetching GitHub README:', error);
    throw new Error('Failed to fetch GitHub README');
  }
};

export const getRepository = async (repository: string): Promise<GitHubRepositoryResponse['repository']> => {
  try {
    const { repository: repositoryFetched } = await graphqlWithAuth<GitHubRepositoryResponse>(
      `
        ${repositoryFields}
        query ($username: String!, $repo: String!) {
          repository(owner: $username, name: $repo) {
            ...RepositoryFields
            isPrivate
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
      },
    );

    if (!repositoryFetched || repositoryFetched.isPrivate) {
      return null;
    }

    return repositoryFetched;
  } catch (error) {
    console.error('Error fetching GitHub repository:', error);
    throw new Error('Failed to fetch GitHub repository');
  }
};

export const getLastActivities = async (): Promise<GitHubActivitiesResponse['viewer']> => {
  try {
    const { viewer } = await graphqlWithAuth<GitHubActivitiesResponse>(
      `
        ${repositoryFields}
        query {
          viewer {
            login
            contributionsCollection {
              commitContributionsByRepository(maxRepositories: 10) {
                repository {
                  ...RepositoryFields
                  isPrivate
                  owner {
                    login
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
    );
    return viewer;
  } catch (error) {
    console.error('Error fetching GitHub activities:', error);
    throw new Error('Failed to fetch GitHub activities');
  }
};
