import invariant from "tiny-invariant";
import { GithubClient, Repository } from "../../../lib/github";
import {
  PropertyAccessors,
  SortablePaginatableItemsState,
  createSortablePaginatableItemsSlice,
} from "../../../lib/store/paginatable-sortable";
import { RepositoriesFetcher } from "./fetcher_impl";

const initialState: SortablePaginatableItemsState<Repository> = {
  query: "",
  isLoading: false,
  items: [],
  itemCount: 0,
  pagination: {
    viewCursor: 0,
    pageSize: 5,
  },
};

/**
 * Функции маппинга отображаемых в таблице полей внутри
 * объекта-репозитория на значения, используемые в сортировке.
 * Иные поля, отображаемые в таблице, но не поименованные в объекте,
 * не нуждаются в маппинге, так как являются собственными полями
 * объекта-репозитория и имеют примитивный тип.
 */
const repoPropAccessors: PropertyAccessors<Repository> = {
  primaryLanguage: (r) => r.primaryLanguage?.name,
  updatedAt: (r) => new Date(r.updatedAt),
};

const url = import.meta.env.VITE_GITHUB_API_URL;
const token = import.meta.env.VITE_GITHUB_TOKEN;
invariant(url, "GitHub API url not set");
invariant(token, "GitHub token not set");

const [repoSlice, getReposFetcherMiddleware] =
  createSortablePaginatableItemsSlice(
    initialState,
    "repos",
    new RepositoriesFetcher(new GithubClient(url, token)),
    repoPropAccessors
  );

export const {
  queryChanged,
  paginationChanged,
  setLoading,
  searchRequested,
  orderingChanged,
} = repoSlice.actions;

export const { fetchRemainderSelector, pageIndexSelector, viewSelector } =
  repoSlice.selectors;

export { getReposFetcherMiddleware, repoSlice };
