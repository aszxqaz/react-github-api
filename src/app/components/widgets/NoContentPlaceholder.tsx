import { StackProps, Typography } from "@mui/material";
import { Center } from "../../../lib/components/helpers";
import styles from "./NoContentPlaceholder.module.scss";

/**
 * Виджет, занимающий весь контейнер и отображающий фидбек на случай
 * отсутствия контента к показу.
 */
export function NoContentPlaceholder({ children, ...props }: StackProps) {
  return (
    <Center {...props}>
      <Typography className={styles.placeholder}>{children}</Typography>
    </Center>
  );
}
