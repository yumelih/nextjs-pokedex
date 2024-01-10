//! [] in the file name because we can put different values in there e.g /pikachu, /balbashur

import Head from "next/head";
import Link from "next/link";
import { Button, Form, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import Image from "next/image";
import usePokemon from "@/hooks/usePokemon";
import { FormEvent } from "react";
import * as PokemonAPI from "@/network/pokemon-api";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";

  const { pokemon, pokemonLoading, mutatePokemon } = usePokemon(pokemonName);

  async function handleSubmitNickname(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nickname = formData.get("nickname")?.toString().trim();

    if (!pokemon || !nickname) return;

    const update = await PokemonAPI.setNickname(pokemon, nickname);
    mutatePokemon(update, { revalidate: false });
  }

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
        {pokemon === null && <p>Pokemon not found</p>}
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
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </div>
            </div>
            <Form className="mt-4" onSubmit={handleSubmitNickname}>
              <Form.Group controlId="pokemon-nickname-input" className="mb-3">
                <Form.Label>Give this pokemon a nickname</Form.Label>
                <Form.Control name="nickname" placeholder="E.g. Ferdinand" />
                <Button type="submit">Set Nickname</Button>
              </Form.Group>
            </Form>
          </>
        )}
      </div>
    </>
  );
}
