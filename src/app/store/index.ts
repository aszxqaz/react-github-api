import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useUntypedDispatch,
  useSelector as useUntypedSelector,
} from "react-redux";
import { Repository } from "../../lib/github";
import { getReposFetcherMiddleware, repoSlice } from "./repos/slice";

export const store = configureStore({
  reducer: { repos: repoSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(getReposFetcherMiddleware()),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = useUntypedDispatch.withTypes<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useUntypedSelector;

export const useRepoSelector = (repoId: Repository["id"]) =>
  useSelector((state) => state.repos.items.find((r) => r.id == repoId));

export const useReposLengthSelector = () =>
  useSelector((state) => state.repos.items.length);
