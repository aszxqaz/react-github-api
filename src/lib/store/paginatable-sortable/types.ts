import { Identifyable } from "../../types";

export type Pagination = {
  pageSize: number;
  viewCursor: number;
};

export type OrderingState = {
  isDesc: boolean;
  orderBy: string;
};

export type SortablePaginatableItemsState<T extends Identifyable> = {
  items: T[];
  pagination: Pagination;
  ordering?: OrderingState;
  itemCount: number;
  error?: { message: string };
  isLoading: boolean;
  cursor?: string;
  query: string;
};

/**
 * Функции доступа, используемые для получения значений полей элемента
 * списка элементов по ключу `orderBy` при сортировке списка (по умолчанию
 * сортировка происходит по ключу `orderBy` непосредственно элемента).
 */
export type PropertyAccessors<T> = Record<string, (o: T) => any>;

export type IItemsFetcherResponse<T extends Identifyable> =
  | {
      items: T[];
      cursor: string;
      count: number;
    }
  | {
      error: string;
    };

/**
 * Интерфейс объекта, осуществляющего подзагрузку элементов списка.
 */
export interface IItemsFetcher<T extends Identifyable> {
  fetch(
    query: string,
    count: number,
    cursor: string
  ): Promise<IItemsFetcherResponse<T>>;
}
