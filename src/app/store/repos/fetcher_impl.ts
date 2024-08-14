import { GithubClient, Repository } from "../../../lib/github";
import {
  IItemsFetcher,
  IItemsFetcherResponse,
} from "../../../lib/store/paginatable-sortable";

/**
 * Имплементация `IItemsFetcher`, использующая `GithubClient` для
 * фетчинга репозиториев.
 */
export class RepositoriesFetcher implements IItemsFetcher<Repository> {
  constructor(private readonly gitHubClient: GithubClient) {}

  async fetch(
    query: string,
    count: number,
    cursor: string
  ): Promise<IItemsFetcherResponse<Repository>> {
    const response = await this.gitHubClient.getRepositories(
      query,
      count,
      cursor
    );

    if ("error" in response) {
      return {
        error: response.error?.message ?? "Произошла неизвестная ошибка",
      };
    }

    return {
      count: response.repositoryCount,
      cursor: response.cursor,
      items: response.repositories,
    };
  }
}
