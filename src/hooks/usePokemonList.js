// src/hooks/usePokemonList.js
import { useState, useEffect, useCallback } from "react";
import { getPokemons } from "@/services/PokemonServices";

const LIMIT = 20;

export function usePokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const loadMorePokemons = useCallback(async () => {
    if (loading || !hasMore || error) return;

    setLoading(true);
    setError(null);

    try {
      const newPokemons = await getPokemons(LIMIT, offset);

      if (newPokemons.length < LIMIT) {
        setHasMore(false);
      }

      setPokemons((prev) => [...prev, ...newPokemons]);
      setOffset((prev) => prev + LIMIT);
    } catch (err) {
      console.error("Error al cargar pokémons:", err);
      setError("No se pudieron cargar más Pokémon. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset, error]);

  useEffect(() => {
    loadMorePokemons();
  }, []);

  return {
    pokemons,
    loading,
    hasMore,
    error,
    loadMorePokemons,
  };
}
