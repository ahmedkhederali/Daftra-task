export type TPokemonListItem = {
 name: string;
 url: string;
};
export type TPokemonListResponse = {
 results: TPokemonListItem[];
 next?: string;
 previous?: string;
};
export type TPokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
  height: number;
  weight: number;
  types: {
    slot: number;
    type: { name: string };
  }[];
  abilities: {
    ability: { name: string };
    is_hidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string };
  }[];
  base_experience: number;
};
export type TPokemonCardVM = {
 id: number;
 name: string;
 sprite: string | null;
 types: string[];
};