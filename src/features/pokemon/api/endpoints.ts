export const POKE_BASE = 'https://pokeapi.co/api/v2';
export const listUrl = (limit: number, offset: number) =>
 `${POKE_BASE}/pokemon?limit=${limit}&offset=${offset}`;
export const pokemonUrl = (idOrName: string | number) =>
 `${POKE_BASE}/pokemon/${idOrName}`;