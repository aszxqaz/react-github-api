import { Typography } from "@mui/material";
import styles from "./WelcomeScreen.module.scss";

/**
 * Экран приветствия, отображающийся при первой загрузке приложения.
 */
export function WelcomeScreen() {
  return (
    <div className={styles.wrapper}>
      <Typography variant="h4" className={styles.heading}>
        Добро пожаловать
      </Typography>
    </div>
  );
}
