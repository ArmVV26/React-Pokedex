import { useState, useEffect } from "react";
import { pokeApi } from "@/utils/pokeApi";

export function useHomeData() {
  const [search, setSearch] = useState("");
  const [allPokemons, setAllPokemons] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [randomPokemonTypes, setRandomPokemonTypes] = useState([]);

  // Fetch all pokemons
  useEffect(() => {
    pokeApi
      .get("pokemon", { params: { limit: 2000 } })
      .then(({ data }) => setAllPokemons(data.results))
      .catch(console.error);
  }, []);

  // Filtrar sugerencias
  useEffect(() => {
    if (!search.length) return setSuggestions([]);
    const filtered = allPokemons
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5)
      .map((p) => {
        const id = p.url.split("/").filter(Boolean).pop();
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return { ...p, id, img };
      });
    setSuggestions(filtered);
  }, [search, allPokemons]);

  // Pokemon aleatorio
  useEffect(() => {
    if (!allPokemons.length) return;
    const fetchRandom = async () => {
      const randomPoke =
        allPokemons[Math.floor(Math.random() * allPokemons.length)];
      const { data } = await pokeApi.get(randomPoke.url);
      setRandomPokemon(data);
    };
    fetchRandom();
    const id = setInterval(fetchRandom, 25_000);
    return () => clearInterval(id);
  }, [allPokemons]);

  // Tipos
  useEffect(() => {
    if (!randomPokemon) return;
    const getTypes = async () => {
      const tipos = await Promise.all(
        randomPokemon.types.map(async ({ type }) => {
          const { data } = await pokeApi.get(type.url);
          const es = data.names.find((n) => n.language.name === "es");
          return es?.name ?? type.name;
        }),
      );
      setRandomPokemonTypes(tipos);
    };
    getTypes();
  }, [randomPokemon]);

  return {
    search,
    setSearch,
    allPokemons,
    suggestions,
    randomPokemon,
    randomPokemonTypes,
  };
}
