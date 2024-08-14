import { useState } from "react";
import {
  ErrorNotification,
  LoadingIndicator,
} from "../lib/components/feedback";
import { AppShell } from "../lib/components/layout";
import { Repository } from "../lib/github";
import {
  RepositoriesSearchResults,
  RepositoryDetails,
  WelcomeScreen,
} from "./components/screens";
import { SearchPanel } from "./components/widgets";
import { NoContentPlaceholder } from "./components/widgets/NoContentPlaceholder";
import useHasAppInitiallyFetched from "./hooks/useHasAppInitiallyFetched";
import "./index.css";
import { useDispatch, useReposLengthSelector, useSelector } from "./store";
import { searchRequested } from "./store/repos/slice";

export function App() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.repos);
  const hasRepos = !!useReposLengthSelector();
  const [selectedRepoId, setSelectedRepoId] = useState<Repository["id"]>();
  const hasFetched = useHasAppInitiallyFetched(isLoading);

  const mainContent = !hasFetched ? (
    <WelcomeScreen />
  ) : !hasRepos && !isLoading ? (
    <NoContentPlaceholder>Репозиториев не найдено</NoContentPlaceholder>
  ) : hasRepos ? (
    <RepositoriesSearchResults onRepoSelected={setSelectedRepoId} />
  ) : null;

  const sideContent = selectedRepoId ? (
    <RepositoryDetails repoId={selectedRepoId} />
  ) : (
    <NoContentPlaceholder>Выберите репозиторий</NoContentPlaceholder>
  );

  const handleSearchRequested = (query: string) => {
    setSelectedRepoId(undefined);
    dispatch(searchRequested(query));
  };

  return (
    <AppShell>
      <AppShell.Header>
        <SearchPanel onSearchRequested={handleSearchRequested} />
      </AppShell.Header>
      <AppShell.Wrapper>
        <AppShell.Main>
          {mainContent}
          <LoadingIndicator show={isLoading} />
          <ErrorNotification error={error} />
        </AppShell.Main>
        {hasFetched && hasRepos && (
          <AppShell.Aside>{sideContent}</AppShell.Aside>
        )}
      </AppShell.Wrapper>
      <AppShell.Footer />
    </AppShell>
  );
}
