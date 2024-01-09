//! [] in the file name because we can put different values in there e.g /pikachu, /balbashur

import useSWR from "swr";

import Head from "next/head";
import Link from "next/link";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import Image from "next/image";
import * as PokemonAPI from "@/network/pokemon-api";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";

  //pokemonName is the key
  //pokemonName passed into PokemonAPI.getPokemon automatically. So we don't need the arrow function
  const { data: pokemon, isLoading: pokemonLoading } = useSWR(
    pokemonName,
    (pokemonName) => PokemonAPI.getPokemon(pokemonName)
  );

  return (
    <>
      <Head>
        {pokemon && (
          <title>{`${
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
          }- NextJS PokeDex`}</title>
        )}
      </Head>
      <div className="d-flex flex-column align-items-center">
        <p>
          <Link href="/" className="link-light">
            &larr; Pokedex
          </Link>
        </p>
        {pokemonLoading && <Spinner animation="grow" />}
        {pokemon && (
          <>
            <h1 className="text-center text-capitalize">{pokemon.name}</h1>
            <Image
              src={pokemon.sprites.other["official-artwork"]?.front_default}
              alt={"Pokemon: " + pokemon.name}
              width={400}
              height={400}
            />
            <div className="d-inline block mt-2">
              <div>
                <strong>Types:</strong>{" "}
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </div>
              <div>
                <strong>Height:</strong> {pokemon.height * 10} cm
              </div>{" "}
              <div>
                <strong>Weight:</strong> {pokemon.height / 10} kg
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
