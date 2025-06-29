import PokemonCard from "@/components/PokemonCard";
import ErrorMessage from "@/components/ErrorMessage";
import { usePokemonList } from "@/hooks/usePokemonList";

function Pokemons() {
  const { pokemons, loading, hasMore, error, loadMorePokemons } =
    usePokemonList();

  return (
    <div className="flex flex-col gap-5 p-5">
      <section className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>

      {loading && (
        <section className="mx-auto flex flex-col items-center justify-center">
          <h1 className="text-base-200 text-2xl font-bold">Cargando Pokémon</h1>
          <div className="loading loading-spinner text-primary m-auto h-100 w-100"></div>
        </section>
      )}

      {error && (
        <ErrorMessage
          title="Pokémons no encontrados"
          message="No hemos podido encontrar datos de los Pokemons. Debe de haber un error, pronto lo solucionaremos."
        />
      )}

      {hasMore && !loading && !error && (
        <section className="mt-5 flex justify-center">
          <button
            className="btn btn-primary text-base font-semibold normal-case"
            onClick={loadMorePokemons}
          >
            Cargar más Pokémon
          </button>
        </section>
      )}

      {!hasMore && (
        <section className="text-base-200 mt-5 text-center text-2xl font-bold">
          No hay más Pokémon para mostrar.
        </section>
      )}
    </div>
  );
}
export default Pokemons;
