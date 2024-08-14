import { Container, Stack, TablePagination, Typography } from "@mui/material";
import GenericObjectTable, { TableKey } from "../../../lib/components/table";
import { Repository } from "../../../lib/github";
import { Order } from "../../../lib/types";
import { formatDateWithDotDelim } from "../../../lib/utils";
import { useDispatch, useSelector } from "../../store";
import {
  fetchRemainderSelector,
  orderingChanged,
  pageIndexSelector,
  paginationChanged,
  viewSelector,
} from "../../store/repos/slice";
import styles from "./RepositoriesSearchResults.module.scss";

type RepositoriesSearchResultsProps = {
  onRepoSelected: (id: Repository["id"]) => void;
};

/**
 * Экран, содержащий таблицу результатов поиска и предполагающий расположение
 * в главном слоте лэйаута.
 */
export function RepositoriesSearchResults({
  onRepoSelected,
}: RepositoriesSearchResultsProps) {
  const dispatch = useDispatch();
  const loadingItemsCount = useSelector(fetchRemainderSelector);
  const pageIndex = useSelector(pageIndexSelector);
  const view = useSelector(viewSelector);
  const ordering = useSelector((state) => state.repos.ordering);
  const pageSize = useSelector((state) => state.repos.pagination.pageSize);
  const repositoryCount = useSelector((state) => state.repos.itemCount);

  return (
    <Container className={styles.container}>
      <Stack className={styles.stack}>
        <Typography variant="h3" className={styles.heading}>
          Результаты поиска
        </Typography>
        <GenericObjectTable
          className={styles.table_container}
          keys={repositoryTableKeys}
          data={view}
          loadingItemsCount={loadingItemsCount}
          order={ordering?.isDesc ? Order.Desc : Order.Asc}
          orderBy={ordering?.orderBy}
          onSortRequested={(key) => dispatch(orderingChanged(key))}
          onItemSelected={onRepoSelected}
        />
        <TablePagination
          sx={{ marginTop: "auto" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={repositoryCount}
          rowsPerPage={pageSize}
          page={pageIndex}
          onPageChange={(_, pageIndex) =>
            dispatch(paginationChanged({ pageIndex }))
          }
          onRowsPerPageChange={(e) => {
            const pageSize = e.target.value as unknown as number;
            dispatch(paginationChanged({ pageSize }));
          }}
        />
      </Stack>
    </Container>
  );
}

/**
 * Наименования заголовков таблицы и средства доступа к соответствующим
 * полям внутри объекта-репозитория.
 */
const repositoryTableKeys: TableKey<Repository>[] = [
  {
    key: "name",
    headerLabel: "Название",
    cellValue: (r) => r.name,
  },
  {
    key: "primaryLanguage",
    headerLabel: "Язык",
    cellValue: (r) => r.primaryLanguage?.name ?? "Не указано",
  },
  {
    key: "forkCount",
    headerLabel: "Число форков",
    cellValue: (r) => r.forkCount,
  },
  {
    key: "stargazerCount",
    headerLabel: "Число звезд",
    cellValue: (r) => r.stargazerCount,
  },
  {
    key: "updatedAt",
    headerLabel: "Дата обновления",
    cellValue: (r) => formatDateWithDotDelim(new Date(r.updatedAt)),
  },
];
