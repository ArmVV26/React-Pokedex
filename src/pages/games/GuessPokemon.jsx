// src/pages/GuessPokemon.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pokeApi } from "@/utils/pokeApi";

const GuessPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    () => localStorage.getItem("guessBestScore") || 0,
  );
  const navigate = useNavigate();

  const getRandomPokemon = async () => {
    try {
      const id = Math.floor(Math.random() * 898) + 1; // Gen 1-8
      const { data } = await pokeApi.get(`pokemon/${id}`);
      setPokemon(data);
      setGuess("");
      setResult(null);
    } catch (error) {
      console.error("Error al cargar el Pokémon:", error);
    }
  };

  useEffect(() => {
    getRandomPokemon();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct = pokemon.name.toLowerCase() === guess.toLowerCase();

    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      setResult("correct");
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("guessBestScore", newScore);
      }
    } else {
      setResult("wrong");
      setScore(0);
    }
  };

  if (!pokemon) return <p>Cargando...</p>;

  return (
    <section className="bg-base-300 mx-auto my-18 max-w-xl rounded-2xl px-4 py-8 text-center shadow-2xl">
      <h1 className="mb-6 text-3xl font-bold">¿Quién es ese Pokémon?</h1>

      <div className="relative container mx-auto mb-5 h-full w-full rounded-2xl">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt="pokemon"
          className={`pointer-events-none mx-auto h-64 w-64 object-contain transition duration-500 ${
            result === "correct" ? "brightness-100" : "brightness-0"
          }`}
        />
      </div>

      <div className="mb-5 h-5">
        {result === "correct" && (
          <p className="font-semibold text-green-500">
            ¡Correcto! Es <span className="capitalize">{pokemon.name}</span>.
          </p>
        )}

        {result === "wrong" && (
          <p className="font-semibold text-red-500">
            ¡Fallaste! Era <span className="capitalize">{pokemon.name}</span>.
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-2">
        <form
          onSubmit={handleSubmit}
          className="flex w-120 flex-col items-center gap-4"
        >
          <input
            type="text"
            className="input input-bordered text-base-300"
            placeholder="Escribe el nombre..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={result === "correct"}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={result === "correct"}
            >
              Adivinar
            </button>
            {result === "correct" && (
              <button
                type="button"
                className="btn btn-accent"
                onClick={getRandomPokemon}
              >
                Siguiente
              </button>
            )}

            {result === "wrong" && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={getRandomPokemon}
              >
                Intentar otro
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="mt-5 flex justify-center gap-10">
        <div>
          <p className="text-3xl font-bold">{score}</p>
          <p className="text-base-200 font-bold">Puntuación actual</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{bestScore}</p>
          <p className="text-base-200 font-bold">Mejor puntuación</p>
        </div>
      </div>

      <div className="mt-8">
        <button
          className="btn btn-neutral rounded-full"
          onClick={() => navigate("/games")}
        >
          Volver al menú de juegos
        </button>
      </div>
    </section>
  );
};

export default GuessPokemon;
