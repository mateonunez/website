const { graphql } = require('@octokit/graphql');

const { GITHUB_TOKEN } = process.env;

/**
 * Get user and repository using GraphQL
 */
export const getUser = async () => {
  const { user } = await graphql(
    `
      query ($username: String!, $sort: RepositoryOrderField!, $limit: Int) {
        user(login: $username) {
          avatarUrl(size: 100)
          bio
          company
          email
          login
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
      limit: 10,
      headers: {
        accept: 'application/vnd.github.v3.raw+json',
        authorization: `Bearer ${GITHUB_TOKEN}`
      }
    }
  );

  return user;
};
