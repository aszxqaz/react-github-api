import {
  Draft,
  PayloadAction,
  createListenerMiddleware,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { orderBy as orderByFn } from "natural-orderby";
import { Identifyable } from "../../types";
import {
  IItemsFetcher,
  IItemsFetcherResponse,
  OrderingState,
  PropertyAccessors,
  SortablePaginatableItemsState,
} from "./types";

/**
 * Обобщенная реализация списка элементов, позволяющая отображать
 * элементы согласно конфигурации пагинации и сортировки. Реализация подразумевает
 * использование middleware для динамической загрузки элементов, отсутствующих для
 * отображения текущей области видимости (view) списка элементов.
 */
export function createSortablePaginatableItemsSlice<T extends Identifyable>(
  initialState: SortablePaginatableItemsState<T>,
  name: string,
  fetcher: IItemsFetcher<T>,
  accessors?: PropertyAccessors<T>
) {
  const slice = createSlice({
    name,
    initialState,
    reducers: {
      searchRequested: (state, action: PayloadAction<string>) => {
        state.query = action.payload;
        state.pagination = initialState.pagination;
        state.ordering = initialState.ordering;
        state.cursor = "";
        state.items = [];
      },
      queryChanged: (state, action: PayloadAction<string>) => {
        state.query = action.payload;
      },
      orderingChanged: (state, action: PayloadAction<string>) => {
        state.ordering = getNextOrdering(action.payload, state.ordering);
      },
      paginationChanged: (
        { pagination },
        {
          payload: { pageIndex, pageSize },
        }: PayloadAction<{ pageIndex?: number; pageSize?: number }>
      ) => {
        pagination.pageSize = pageSize ?? pagination.pageSize;
        if (typeof pageIndex == "number") {
          pagination.viewCursor = pageIndex * pagination.pageSize;
        }
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
      },

      _itemsFetched: (
        state,
        action: PayloadAction<IItemsFetcherResponse<T>>
      ) => {
        if ("error" in action.payload) {
          state.error = {
            message: `Ошибка при загрузке репозиториев: ${action.payload.error}`,
          };
          return;
        }
        state.items = state.items.concat(action.payload.items as Draft<T>[]);
        state.cursor = action.payload.cursor;
        state.itemCount = action.payload.count;
      },
    },
    selectors: {
      fetchRemainderSelector: ({
        pagination: { viewCursor, pageSize },
        items,
      }) => Math.max(viewCursor + pageSize - items.length, 0),

      pageIndexSelector: ({ pagination: { viewCursor, pageSize } }) =>
        (viewCursor - (viewCursor % pageSize)) / pageSize,

      viewSelector: createSelector(
        [
          (state: SortablePaginatableItemsState<T>) => state.items,
          (state: SortablePaginatableItemsState<T>) => state.pagination,
          (state: SortablePaginatableItemsState<T>) => state.ordering,
        ],
        (items, { pageSize, viewCursor }, ordering) => {
          if (ordering?.orderBy) {
            const { isDesc, orderBy } = ordering;
            items = orderByFn(
              items,
              (item) =>
                accessors?.[orderBy]?.(item) ?? item[orderBy as keyof T],
              isDesc ? "desc" : "asc"
            );
          }
          return items.slice(viewCursor, viewCursor + pageSize);
        }
      ),
    },
  });

  async function fetchItemsIfNeeded(
    dispatch: any,
    state: any,
    fetcher: IItemsFetcher<T>
  ) {
    const offset = slice.selectors.fetchRemainderSelector(state);
    if (offset <= 0) {
      return;
    }
    dispatch(slice.actions.setLoading(true));
    const { cursor, query } = state[name];
    const response = await fetcher.fetch(query, offset, cursor ?? "");
    dispatch(slice.actions._itemsFetched(response));
    dispatch(slice.actions.setLoading(false));
  }

  function getListenerMiddleware() {
    const listenerMiddleware = createListenerMiddleware<any, any>();

    listenerMiddleware.startListening({
      actionCreator: slice.actions.paginationChanged,
      effect: (_, api) =>
        fetchItemsIfNeeded(api.dispatch, api.getState(), fetcher),
    });

    listenerMiddleware.startListening({
      actionCreator: slice.actions.searchRequested,
      effect: (_, api) =>
        fetchItemsIfNeeded(api.dispatch, api.getState(), fetcher),
    });

    return listenerMiddleware.middleware;
  }

  return [slice, getListenerMiddleware] as const;
}

function getNextOrdering(
  orderBy: string,
  ordering?: OrderingState
): OrderingState | undefined {
  if (!ordering || orderBy != ordering.orderBy)
    return {
      isDesc: true,
      orderBy,
    };
  if (ordering.isDesc)
    return {
      ...ordering,
      isDesc: false,
    };
}
