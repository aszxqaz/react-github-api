import { Stack, StackProps } from "@mui/material";
import classnames from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Layout.module.scss";

/**
 * Контейнер лэйаута приложение. Включает `AppShell.Header`,
 * `AppShell.Footer`, `AppShell.Wrapper`, `AppShell.Main`,
 * `AppShell.Aside`.
 */
export function AppShell({ className, children, ...props }: StackProps) {
  return (
    <Stack className={classnames(styles.app_page, className)} {...props}>
      {children}
    </Stack>
  );
}

/**
 * Хедер лэйаута приложение, должен приходиться непосредственным
 * ребенком `AppShell`.
 */
function Header({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <header className={classnames(styles.header, className)} {...props}>
      {children}
    </header>
  );
}

/**
 * Контейнер для `AppShell.Main` и `AppShell.Aside`. Должен приходиться непосредственным
 * ребенком `AppShell`.
 */
function Wrapper({ className, children, ...props }: StackProps) {
  return (
    <Stack
      direction="row"
      className={classnames(styles.wrapper, className)}
      {...props}
    >
      {children}
    </Stack>
  );
}

/**
 * Главная область отображения в лэйауте приложения.
 * Компонент должен приходиться непосредственным ребенком
 * `AppShell.Wrapper`.
 */
function Main({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <main className={classnames(styles.main, className)} {...props}>
      {children}
    </main>
  );
}

/**
 * Второстепенная область отображения контента
 * в лэйауте приложения (сайдбар).
 * Компонент должен приходиться непосредственным ребенком
 * `AppShell.Wrapper`.
 */
function Aside({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <aside className={classnames(styles.aside, className)} {...props}>
      {children}
    </aside>
  );
}

/**
 * Футер в лэйауте приложения. Должен приходиться непосредственным
 * ребенком `AppShell`
 */
function Footer({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <footer className={classnames(styles.footer, className)} {...props}>
      {children}
    </footer>
  );
}

AppShell.Header = Header;
AppShell.Wrapper = Wrapper;
AppShell.Main = Main;
AppShell.Footer = Footer;
AppShell.Aside = Aside;
