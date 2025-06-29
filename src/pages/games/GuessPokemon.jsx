import { Link } from "react-router-dom";
import { useGuessPokemon } from "@/hooks/useGuessPokemon";
import { getPokemonImage } from "@/utils/pokemonHelpers";

const GuessPokemon = () => {
  const {
    pokemon,
    guess,
    setGuess,
    result,
    handleSubmit,
    getRandomPokemon,
    score,
    bestScore,
    loading,
  } = useGuessPokemon();

  if (!pokemon) return <p className="text-center">Cargando...</p>;

  return (
    <section className="bg-base-300 mx-auto my-18 max-w-xl rounded-2xl px-4 py-8 text-center shadow-2xl">
      <h1 className="mb-6 text-3xl font-bold">¿Quién es ese Pokémon?</h1>

      <div className="relative container mx-auto mb-5 h-full w-full rounded-2xl">
        <img
          src={getPokemonImage(pokemon, "official-artwork")}
          alt="pokemon"
          className={`pointer-events-none mx-auto h-64 w-64 object-contain transition duration-500 ${
            result === "correct" ? "brightness-100" : "brightness-0"
          }`}
        />
      </div>

      <article className="mb-5 h-5">
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
      </article>

      <article className="flex items-center justify-center gap-2">
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
      </article>

      <article className="mt-5 flex justify-center gap-10">
        <div>
          <p className="text-3xl font-bold">{score}</p>
          <p className="text-base-200 font-bold">Puntuación actual</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{bestScore}</p>
          <p className="text-base-200 font-bold">Mejor puntuación</p>
        </div>
      </article>

      <footer className="mt-8">
        <Link to="/games">
          <button className="btn btn-neutral rounded-full">
            Volver al menú de juegos
          </button>
        </Link>
      </footer>
    </section>
  );
};

export default GuessPokemon;
