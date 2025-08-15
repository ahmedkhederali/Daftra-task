import { useQuery } from '@tanstack/react-query';

import { pokemonUrl } from '../api/endpoints';

import type { TPokemon } from '../types';

export function usePokemonById(idOrName: string | number) {

  return useQuery({
    queryKey: ['pokemon', idOrName],
    queryFn: async () => {
      const res = await fetch(pokemonUrl(idOrName));
      if (!res.ok) {
        throw new Error('Failed to fetch Pokémon details');
      }
      return res.json() as Promise<TPokemon>;
    },
  });

}
 