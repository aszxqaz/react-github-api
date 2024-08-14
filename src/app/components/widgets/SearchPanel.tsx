import classNames from "classnames";
import { useRef } from "react";
import { Button, TextInput } from "../../../lib/components/form";
import styles from "./SearchPanel.module.scss";

type SearchPanelProps = {
  onSearchRequested?: (query: string) => void;
};

/**
 * Виджет панели поиска со строкой поиска и кнопкой поиска.
 */
export function SearchPanel({ onSearchRequested }: SearchPanelProps) {
  const query = useRef("");

  return (
    <div className={classNames(styles.search_panel)}>
      <TextInput
        variant="outlined"
        placeholder="Введите поисковый запрос"
        onChange={(e) => {
          query.current = e.target.value;
        }}
      />
      <Button
        variant="contained"
        onClick={(_) => {
          onSearchRequested?.(query.current);
        }}
      >
        Поиск
      </Button>
    </div>
  );
}
