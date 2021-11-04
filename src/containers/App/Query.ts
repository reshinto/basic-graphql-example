export const githubUsernameQuery = {
  query: `
    {
      viewer {
        name
      }
    }
  `,
};

export const githubRepoQuery = {
  query: `
    {
      viewer {
        name
        repositories(first: 100) {
          nodes {
            name
            description
            id
            url
          }
        }
      }
    }
  `,
};

export const githubSearchQuery = (
  user: string,
  queryString = "",
  count = 10,
) => ({
  query: `
    {
      viewer {
        name
      }
      search(query: "${queryString} user:${user} sort:updated-desc", type: REPOSITORY, first: ${count}) {
        repositoryCount
        nodes {
          ... on Repository {
            name
            description
            id
            url
          }
        }
      }
    }
  `,
});

export const githubSearchQueryWithPagination = (
  user: string,
  queryString: string,
  count: number,
  paginationKeyword: string,
  paginationString: string,
) => ({
  query: `
    {
      viewer {
        name
      }
      search(query: "${queryString} user:${user} sort:updated-desc", type: REPOSITORY, ${paginationKeyword}: ${count}, ${paginationString}) {
        repositoryCount
        edges {
          node {
            ... on Repository {
              name
              description
              id
              url
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
});
