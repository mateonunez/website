const { graphql } = require('@octokit/graphql');

const { GITHUB_TOKEN } = process.env;

/**
 * Get user and repository using GraphQL
 */
export const getProfile = async () => {
  const { user } = await graphql(
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
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
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
        encoding: 'utf-8'
      }
    }
  );

  return user;
};

/**
 * Get readme repository content
 */
export const getReadme = async () => {
  const { repository } = await graphql(
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
        authorization: `Bearer ${GITHUB_TOKEN}`
      }
    }
  );

  const { readme } = repository;

  return readme;
};

/**
 * Get repository content
 * @param {string} repository
 * @returns {string}
 */
export const getRepository = async repository => {
  const { repository: repositoryFetched } = await graphql(
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
        authorization: `Bearer ${GITHUB_TOKEN}`
      }
    }
  );

  if (!repositoryFetched || repositoryFetched.isPrivate) {
    return { [repository]: null };
  }

  return { [repository]: repositoryFetched };
};
