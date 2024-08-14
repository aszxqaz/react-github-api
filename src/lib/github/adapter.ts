import { RepositoriesQueryQuery } from "./gql/graphql";
import { Language, Repository } from "./models";

/**
 * Функция-конвертер модели репозитория из типа,
 * возвращаемого GitHub API в тип, используемый на
 * фронтенде.
 */
export function repositoryFromQueryNode(
  node: QueryRepositoryNode
): Repository | undefined {
  if (node?.__typename == "Repository") {
    const languages = node.languages?.nodes?.reduce<Language[]>(
      (acc, cur) => (cur ? [...acc, { id: cur.id, name: cur.name }] : acc),
      []
    );
    const primaryLanguage = node.primaryLanguage
      ? { id: node.primaryLanguage.id, name: node.primaryLanguage.name }
      : undefined;

    return {
      id: node.id,
      license: node.licenseInfo?.name,
      name: node.name,
      description: node.description ?? undefined,
      stargazerCount: node.stargazerCount,
      forkCount: node.forkCount,
      languages,
      primaryLanguage,
      updatedAt: node.updatedAt,
    };
  }
}

type NonFalsy<T> = T extends null | undefined ? never : T;
type QueryRepositoryNode = NonFalsy<
  RepositoriesQueryQuery["search"]["nodes"]
>[number];
