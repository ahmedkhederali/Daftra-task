import { useInfiniteQuery } from '@tanstack/react-query';
import { listUrl } from '../api/endpoints';
import { DEFAULT_LIMIT } from '../../../lib/constant';
async function fetchChunk({ pageParam = 0 }) {
  const res = await fetch(listUrl(DEFAULT_LIMIT, pageParam));
  if (!res.ok) {
    throw new Error('Failed to fetch list');
  }
  return res.json() as Promise<{
    results: { name: string; url: string }[];
    next?: string;
    previous?: string;
    count?: number;
  }>;
}
export function usePokemonInfinite() {
  return useInfiniteQuery({
    queryKey: ['pokemon-infinite', DEFAULT_LIMIT],
    queryFn: fetchChunk,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages, lastOffset) => {
      return lastPage.next ? lastOffset + DEFAULT_LIMIT : undefined;
    },
  });
}