import { Skeleton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer, {
  TableContainerProps,
} from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { ReactNode } from "react";
import { Identifyable, Order } from "../../types";

/**
 * Необходимая информация об отображемом
 * в таблице поля, содержащегося в элементе-объекте
 * из списка элементов: идентификатор, заголовок таблицы,
 * функция маппинга на отображаемое в ячейке значение.
 */
export type TableKey<T extends Identifyable> = {
  key: string;
  headerLabel: ReactNode;
  cellValue: (t: T) => ReactNode;
};

type GenericObjectTableProps<T extends Identifyable> = {
  keys: TableKey<T>[];
  data: T[];
  onItemSelected?: (id: T["id"]) => void;
  selectedItemId?: T["id"];
  order?: Order;
  orderBy?: string;
  onSortRequested?: (key: string) => void;
  loadingItemsCount?: number;
} & TableContainerProps;

/**
 * Обобщенный компонент таблицы, отображающей список элементов
 * и значения, вычисляемые согласно функциям доступа к полям
 * внутри каждого элемента.
 */
export default function GenericObjectTable<T extends Identifyable>({
  data,
  keys,
  onItemSelected,
  selectedItemId,
  order,
  orderBy,
  onSortRequested,
  loadingItemsCount,
  ...containerProps
}: GenericObjectTableProps<T>) {
  return (
    <TableContainer {...containerProps}>
      <Table sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell
                key={key.key}
                align="left"
                sortDirection={orderBy === key.key ? order : false}
              >
                <TableSortLabel
                  active={orderBy === key.key}
                  direction={orderBy === key.key ? order : "asc"}
                  onClick={() => onSortRequested?.(key.key)}
                >
                  {key.headerLabel}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              hover
              onClick={() => onItemSelected?.(item.id)}
              role="checkbox"
              key={item.id}
              selected={selectedItemId === item.id}
              sx={{ cursor: "pointer" }}
            >
              {keys.map((key) => (
                <TableCell key={`${item.id}.${key.key}`}>
                  {key.cellValue(item)}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {Array(loadingItemsCount)
            .fill(0)
            .map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={keys.length}>
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
