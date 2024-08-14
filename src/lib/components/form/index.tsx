import {
  ButtonProps,
  Button as MuiButton,
  TextField,
  TextFieldProps,
} from "@mui/material";
import classnames from "classnames";
import styles from "./Form.module.scss";

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <MuiButton className={classnames(styles.button, className)} {...props}>
      {children}
    </MuiButton>
  );
}

export function TextInput({ className, ...props }: TextFieldProps) {
  return (
    <TextField className={classnames(styles.input, className)} {...props} />
  );
}
