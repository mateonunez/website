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
          email
          login
          location
          url
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
        }
      }
    `,
    {
      username: 'mateonunez',
      sort: 'STARGAZERS',
      limit: 50,
      headers: {
        accept: 'application/vnd.github.v3.raw+json',
        authorization: `Bearer ${GITHUB_TOKEN}`
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
