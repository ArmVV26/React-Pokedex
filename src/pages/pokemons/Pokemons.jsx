import PokemonCard from "@/components/PokemonCard";
import { useEffect, useState, useCallback } from "react";
import { getPokemons } from "@/services/PokemonServices";
import { Link } from "react-router-dom";

const LIMIT = 20;

function Pokemons() {
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
  }, [loading, offset, hasMore]);

  // Carga inicial
  useEffect(() => {
    loadMorePokemons();
  }, []); // solo al montar

  // Scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (nearBottom && !loading && hasMore && !error) {
        loadMorePokemons();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMorePokemons, loading, hasMore, error]);

  return (
    <main className="flex flex-col gap-5 p-5">
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {loading && (
        <div className="mx-auto flex flex-col items-center justify-center">
          <h1 className="text-base-200 text-2xl font-bold">Cargando Pokémon</h1>
          <div className="loading loading-spinner text-primary m-auto h-100 w-100"></div>
        </div>
      )}

      {error && (
        <div className="flex h-160 items-center justify-center">
          <div className="bg-base-300 border-primary rounded-2xl border-r-5 border-b-5 p-15 shadow-xl">
            <div className="items-center text-center">
              <h1 className="text-error mb-2 text-3xl font-bold">
                Pokémons no encontrados
              </h1>
              <p className="text-base-content mb-4 text-lg">
                No hemos podido encontrar datos de los Pokemons.
                <br />
                Debe de haber un error, pronto lo solucionaremos.
              </p>
              <Link
                to="/"
                className="btn btn-primary mt-2 text-base font-semibold normal-case"
                style={{ minWidth: "150px" }}
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      )}

      {!hasMore && (
        <div className="text-base-200 mt-5 text-center text-2xl font-bold">
          No hay más Pokémon para mostrar.
        </div>
      )}
    </main>
  );
}
export default Pokemons;
