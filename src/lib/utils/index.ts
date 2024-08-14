/**
 * Форматирует число в формат с пробелом-разделителем.
 *
 * 1234567 -> 1 234 567
 */
export function formatNumberWithSpaceDelim(n: number): string {
  return n
    .toString()
    .split("")
    .reverse()
    .reduce(
      (acc, cur, i) => (i % 3 == 0 ? [cur, " ", ...acc] : [cur, ...acc]),
      [] as string[]
    )
    .join("");
}

/**
 * Форматирует дату в формат с точкой-разделителем (RU locale).
 */
export function formatDateWithDotDelim(d: Date): string {
  const [day, month] = [d.getDate(), d.getMonth() + 1].map((d) =>
    d.toString().padStart(2, "00")
  );
  return `${day}.${month}.${d.getFullYear()}`;
}
