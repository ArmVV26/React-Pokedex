import { useEffect, useState } from "react";
import { pokeApi } from "@/utils/pokeApi";

export function useGuessPokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() =>
    Number(localStorage.getItem("guessBestScore") || 0),
  );
  const [loading, setLoading] = useState(true);

  const getRandomPokemon = async () => {
    setLoading(true);
    try {
      const id = Math.floor(Math.random() * 898) + 1;
      const { data } = await pokeApi.get(`pokemon/${id}`);
      setPokemon(data);
      setGuess("");
      setResult(null);
    } catch (error) {
      console.error("Error al cargar el Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomPokemon();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pokemon) return;

    const correct = pokemon.name.toLowerCase() === guess.trim().toLowerCase();

    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      setResult("correct");

      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("guessBestScore", String(newScore));
      }
    } else {
      setResult("wrong");
      setScore(0);
    }
  };

  return {
    pokemon,
    guess,
    setGuess,
    result,
    handleSubmit,
    getRandomPokemon,
    score,
    bestScore,
  };
}
