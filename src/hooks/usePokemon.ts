import useSWR from "swr";
import * as PokemonAPI from "@/network/pokemon-api";
import { AxiosError } from "axios";

export default function usePokemon(name: string) {
  //name is the key
  //name passed into PokemonAPI.getPokemon automatically. So we don't need the arrow function
  const { data, isLoading, mutate } = useSWR(
    name, //corresponds to the queryKey in React query
    async () => {
      try {
        return await PokemonAPI.getPokemon(name);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          //SWR will stop trying to re-fetch the data because this function doesn't return an error but a null value
          return null;
        } else {
          throw error;
        }
      }
    }
  );

  return {
    pokemon: data,
    pokemonLoading: isLoading,
    mutatePokemon: mutate,
  };
}
