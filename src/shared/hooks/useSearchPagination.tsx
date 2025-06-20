import { useCallback, useState } from "react";

export type SearchPagination = {
  limit: number;
  offset: number;
  q: string;
};

export function useSearchPagination(initialLimit = 5) {
  const [params, setParams] = useState<SearchPagination>({
    limit: initialLimit,
    offset: 0,
    q: "",
  });

  /** go to another page */
  const setOffset = useCallback(
    (offset: number) => setParams(p => ({ ...p, offset })),
    []
  );

  /** update search term (and reset to first page) */
  const setQuery = useCallback(
    (q: string) =>
      setParams(p => ({
        ...p,
        q,
        offset: 0,
      })),
    []
  );

  return { params, setOffset, setQuery };
}
