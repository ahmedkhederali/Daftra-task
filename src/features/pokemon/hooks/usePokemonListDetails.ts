import { useQueries } from '@tanstack/react-query';
import type { TPokemon, TPokemonListItem } from '../types';
import { pokemonUrl } from '../api/endpoints';

export function usePokemonListDetails(items: TPokemonListItem[]) {
  const queries = useQueries({
    queries: items.map((item) => ({
      queryKey: ['pokemon', item.name],
      queryFn: async () => {
        const res = await fetch(pokemonUrl(item.name));
        if (!res.ok) throw new Error('Failed to fetch Pokémon details');
        return res.json() as Promise<TPokemon>;
      },
      staleTime: 10000,
    })),
  });

  return queries.map((q, i) => {
    const item = items[i];
    if (q.data) {
      return {
        id: q.data.id,
        name: q.data.name,
        sprite: q.data.sprites.front_default,
      };
    }
    return {
      id: undefined,
      name: item.name,
      sprite: undefined,
    };
  });
}
