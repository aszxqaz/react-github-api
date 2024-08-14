import { useEffect, useRef, useState } from "react";

/**
 * Хук отслеживает процесс первоначальной загрузки данных из API
 * согласно переменной `loading` и всегда возвращает true
 * после того, как была осуществлена первоначальная загрузка данных.
 *
 * 1. loading=false hasAppInitiallyFetched=false
 *
 * 2. loading=true hasAppInitiallyFetched=false
 *
 * 3. loading=false hasAppInitiallyFetched=true
 */
export default function useHasAppInitiallyFetched(loading: boolean) {
  const [hasAppInitiallyFetched, setHasAppInitiallyFetched] = useState(false);
  const loadingFired = useRef(false);

  useEffect(() => {
    if (loading && !loadingFired.current) {
      loadingFired.current = true;
      return;
    }
    if (!loading && loadingFired.current && !hasAppInitiallyFetched) {
      setHasAppInitiallyFetched(true);
    }
  }, [loading]);

  return hasAppInitiallyFetched;
}
