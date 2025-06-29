import { useState, useEffect } from "react";
import { pokeApi } from "@/utils/pokeApi";

export function usePokemonDetail(name) {
  const [pokemon, setPokemon] = useState(null);
  const [spanishTypes, setSpanishTypes] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [spanishWeaknesses, setSpanishWeaknesses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;

    const fetchPokemon = async () => {
      setError(null);
      try {
        const { data } = await pokeApi.get(`pokemon/${name}`);
        setPokemon(data);

        // Tipos en español
        const types = await Promise.all(
          data.types.map(async ({ type }) => {
            const { data: tipoData } = await pokeApi.get(type.url);
            return (
              tipoData.names.find((n) => n.language.name === "es")?.name ||
              type.name
            );
          }),
        );
        setSpanishTypes(types);

        // Debilidades
        const allWeaknesses = await Promise.all(
          data.types.map(async ({ type }) => {
            const { data: tipoData } = await pokeApi.get(type.url);
            return tipoData.damage_relations.double_damage_from.map((t) => t);
          }),
        );

        const uniqueWeaknesses = [
          ...new Map(allWeaknesses.flat().map((t) => [t.name, t])).values(),
        ];
        setWeaknesses(uniqueWeaknesses);

        const debilidadesES = await Promise.all(
          uniqueWeaknesses.map(async (tipo) => {
            const { data: tipoData } = await pokeApi.get(tipo.url);
            return (
              tipoData.names.find((n) => n.language.name === "es")?.name ||
              tipo.name
            );
          }),
        );
        setSpanishWeaknesses(debilidadesES);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Pokémon no encontrado");
        } else {
          setError("Error al cargar el Pokémon");
        }
        setPokemon(null);
      }
    };

    fetchPokemon();
  }, [name]);

  return {
    pokemon,
    spanishTypes,
    weaknesses,
    spanishWeaknesses,
    error,
  };
}
