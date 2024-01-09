// Pagination
export interface PokemonPage {
  results: { name: string }[];
  next: string | null;
  previous: string | null;
}

// Pokemon Data
export interface Pokemon {
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
  height: number;
  sprites: {
    other: {
      //because of hypen(-) we need the ""
      "official-artwork": {
        front_default: string;
      };
    };
  };
}
