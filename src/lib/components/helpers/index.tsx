import { Stack, StackProps } from "@mui/material";
import classNames from "classnames";
import styles from "./Helpers.module.scss";

/**
 * Компонент, центрирующий содержимое.
 */
export function Center({ children, className, ...props }: StackProps) {
  return (
    <Stack
      alignContent="center"
      justifyContent="center"
      className={classNames(styles.center, className)}
      {...props}
    >
      {children}
    </Stack>
  );
}
