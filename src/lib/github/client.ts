import { GraphQLClient } from "graphql-request";
import { repositoryFromQueryNode } from "./adapter";
import { graphql } from "./gql";
import { Repository } from "./models";

/**
 * GraphQL GitHub API клиент, реализующий фетчинг репозиториев.
 */
export class GithubClient {
  private client!: GraphQLClient;
  constructor(url: string, token: string) {
    if (!GithubClient.#instance) {
      this.client = new GraphQLClient(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      GithubClient.#instance = this;
    }
    return GithubClient.#instance;
  }

  static #instance: GithubClient;

  async getRepositories(query: string, first: number, after?: string) {
    try {
      const response = await this.client.request(
        GithubClient.repositoriesQueryDocument,
        {
          query,
          first,
          after: after ?? "",
        }
      );
      if (!response.search.nodes) throw new Error("Repositories not found");
      const repositories = response.search.nodes
        .map(repositoryFromQueryNode)
        .filter((r) => r) as Repository[];
      return {
        repositories,
        cursor: response.search.pageInfo.endCursor ?? "",
        repositoryCount: response.search.repositoryCount,
      };
    } catch (error) {
      return {
        error: error as Error,
      };
    }
  }

  static repositoriesQueryDocument = graphql(/* GraphQL */ `
    query repositoriesQuery($query: String!, $first: Int!, $after: String!) {
      search(query: $query, first: $first, after: $after, type: REPOSITORY) {
        repositoryCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        nodes {
          ... on Repository {
            __typename
            id
            name
            description
            stargazerCount
            forkCount
            updatedAt
            licenseInfo {
              name
            }
            primaryLanguage {
              id
              name
            }
            languages(first: 100) {
              nodes {
                id
                name
              }
            }
          }
        }
      }
    }
  `);
}
