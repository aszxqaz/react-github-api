import {
  Alert,
  Backdrop,
  CircularProgress,
  Snackbar as MuiSnackbar,
  SnackbarProps,
} from "@mui/material";
import { useEffect, useState } from "react";

/**
 * Индикатор загрузки.
 */
export function LoadingIndicator({ show }: { show?: boolean }) {
  return show ? (
    <Backdrop open={show}>
      <CircularProgress />
    </Backdrop>
  ) : null;
}

type ErrorNotificationProps = {
  error?: {
    message: string;
  };
} & SnackbarProps;

/**
 * Снэкбар для ошибки.
 */
export function ErrorNotification({ error, ...props }: ErrorNotificationProps) {
  const [open, setOpen] = useState(!!error);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    <MuiSnackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={5000}
      {...props}
    >
      <Alert severity="error" variant="filled">
        {error?.message}
      </Alert>
    </MuiSnackbar>
  );
}
