import { useQuery } from '@tanstack/react-query';
import { listUrl, pokemonUrl } from '../api/endpoints';
import type { TPokemon, TPokemonListResponse } from '../types';

export function usePokemonPage(limit: number, page: number) {
  return useQuery({
    queryKey: ['pokemon-page', limit, page],
    queryFn: async () => {
      const offset = (page - 1) * limit;
      const res = await fetch(listUrl(limit, offset));
      if (!res.ok) {
        throw new Error('Failed to fetch Pokémon page');
      }
      return res.json() as Promise<TPokemonListResponse>;
    },
    staleTime: 5000, 
  });
}

// Fetch details for a single Pokémon by id or name
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
 