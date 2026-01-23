import { graphql } from '@octokit/graphql';
import { cache } from 'react';
import personal from '@/lib/config/personal';
import type {
  GitHubActivitiesResponse,
  GitHubReadmeResponse,
  GitHubRepositoryResponse,
  GitHubUser,
} from '@/types/github';

class GitHubError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'GitHubError';
  }
}

interface GitHubConfig {
  token: string;
  username: string;
  maxRetries?: number;
  timeout?: number;
  cacheTTL?: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

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

class GitHubClient {
  private readonly _graphqlClient;
  private readonly _maxRetries: number;
  private readonly _timeout: number;
  private readonly _cacheTTL: number;
  private readonly _cache: Map<string, CacheEntry<unknown>> = new Map();

  constructor(config: GitHubConfig) {
    if (!config.token) {
      throw new Error('GitHub token is required');
    }

    this._graphqlClient = graphql.defaults({
      headers: {
        authorization: `Bearer ${config.token}`,
        accept: 'application/vnd.github.v3.raw+json',
      },
    });

    this._maxRetries = config.maxRetries ?? 3;
    this._timeout = config.timeout ?? 10000; // 10 seconds default for GraphQL
    this._cacheTTL = config.cacheTTL ?? 5 * 60 * 1000; // 5 minutes default
  }

  private getCacheKey(query: string, variables: Record<string, unknown>): string {
    return `${query}:${JSON.stringify(variables)}`;
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this._cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > this._cacheTTL;
    if (isExpired) {
      this._cache.delete(key);
      return null;
    }

    return entry.data;
  }

  private setCache<T>(key: string, data: T): void {
    this._cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  private async fetchWithRetry<T>(query: string, variables: Record<string, unknown>, retryCount = 0): Promise<T> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this._timeout);

      const response = await this._graphqlClient(query, {
        ...variables,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      if (retryCount < this._maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 2 ** retryCount * 1000));
        return this.fetchWithRetry(query, variables, retryCount + 1);
      }

      if (error instanceof Error) {
        throw new GitHubError(
          `GitHub API request failed: ${error.message}`,
          (error as any).status,
          (error as any).code,
        );
      }
      throw error;
    }
  }

  private async fetchWithCache<T>(query: string, variables: Record<string, unknown>, skipCache = false): Promise<T> {
    const cacheKey = this.getCacheKey(query, variables);

    if (!skipCache) {
      const cachedData = this.getFromCache<T>(cacheKey);
      if (cachedData !== null) {
        return cachedData;
      }
    }

    const data = await this.fetchWithRetry<T>(query, variables);

    if (!skipCache) {
      this.setCache(cacheKey, data);
    }

    return data;
  }

  async getProfile(): Promise<GitHubUser> {
    try {
      const { user } = await this.fetchWithCache<{ user: GitHubUser }>(
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
          username: personal.social.github,
          sort: 'STARGAZERS',
          limit: 50,
        },
      );
      return user;
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
      throw new GitHubError('Failed to fetch GitHub profile');
    }
  }

  async getReadme(): Promise<GitHubReadmeResponse['repository']['readme']> {
    try {
      const { repository } = await this.fetchWithCache<GitHubReadmeResponse>(
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
          username: personal.social.github,
          repo: personal.social.github,
        },
      );
      return repository.readme;
    } catch (error) {
      console.error('Error fetching GitHub README:', error);
      throw new GitHubError('Failed to fetch GitHub README');
    }
  }

  async getRepository(repository: string): Promise<GitHubRepositoryResponse['repository']> {
    try {
      const { repository: repositoryFetched } = await this.fetchWithCache<GitHubRepositoryResponse>(
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
          username: personal.social.github,
          repo: repository,
        },
      );

      if (!repositoryFetched || repositoryFetched.isPrivate) {
        return null;
      }

      return repositoryFetched;
    } catch (error) {
      console.error('Error fetching GitHub repository:', error);
      throw new GitHubError('Failed to fetch GitHub repository');
    }
  }

  async getLastActivities(): Promise<GitHubActivitiesResponse['viewer']> {
    try {
      const { viewer } = await this.fetchWithCache<GitHubActivitiesResponse>(
        `
          ${repositoryFields}
          query {
            viewer {
              login
              contributionsCollection {
                commitContributionsByRepository(maxRepositories: 33) {
                  repository {
                    ...RepositoryFields
                    isPrivate
                    owner {
                      login
                    }
                  }
                  contributions(first: 33) {
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
                first: 33
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
        {},
        true,
      );
      return viewer;
    } catch (error) {
      console.error('Error fetching GitHub activities:', error);
      throw new GitHubError('Failed to fetch GitHub activities');
    }
  }
}

const githubClient = new GitHubClient({
  token: process.env.GITHUB_TOKEN as string,
  username: personal.social.github,
});

// Server-side cache wrappers for request deduplication
export const getProfile = cache(() => githubClient.getProfile());
export const getReadme = cache(() => githubClient.getReadme());
export const getRepository = cache((repository: string) => githubClient.getRepository(repository));
export const getLastActivities = cache(() => githubClient.getLastActivities());
