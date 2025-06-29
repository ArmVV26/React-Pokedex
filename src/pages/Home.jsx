import { Link } from "react-router-dom";
import { colorTypes } from "@/utils/constants";
import { useHomeData } from "../hooks/useHome";
import { getPokemonImage } from "@/utils/pokemonHelpers";

function Home() {
  const {
    search,
    setSearch,
    allPokemons,
    suggestions,
    randomPokemon,
    randomPokemonTypes,
  } = useHomeData();

  return (
    <div className="py-5 text-center">
      {/* Search Card */}
      <section className="bg-base-300 mx-auto flex flex-col items-center justify-center p-5 md:max-w-190 md:rounded-2xl">
        <h1 className="text-base-200 text-3xl font-bold">
          ¡Bienvenido al mundo Pokémon!
        </h1>
        <p className="text-base-100 mb-6 text-sm">
          Busca por nombre para conocer más detalles sobre el pokemon que deseas
          buscar
        </p>
        <article className="flex items-center gap-2">
          <div className="text-base-300 relative">
            <input
              type="text"
              className={`input w-full ${search.length > 0 && suggestions.length === 0 ? "input-error" : "input-bordered"}`}
              placeholder="Busca un Pokémon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-autocomplete="list"
              aria-expanded={suggestions.length > 0}
              aria-controls="suggestions-list"
            />
            {suggestions.length > 0 && (
              <ul className="bg-base-100 absolute top-full right-0 left-0 z-10 mt-2 rounded-lg shadow-2xl">
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <Link to={`/pokemon/${p.name}`}>
                      <button
                        key={p.id}
                        className="hover:bg-base-200 flex w-full cursor-pointer items-center gap-2 px-3 py-2 hover:rounded-lg"
                      >
                        <img src={p.img} alt={p.name} className="h-10 w-10" />
                        <span className="font-mono text-xs font-bold text-yellow-500">
                          #{p.id}
                        </span>
                        <span className="text-base-300 capitalize">
                          {p.name}
                        </span>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/pokemons">
            <button className="btn rounded-full whitespace-nowrap sm:text-lg">
              Ver Todos
            </button>
          </Link>
        </article>
      </section>

      <section className="mx-auto my-2 grid max-w-190 gap-2 sm:grid-cols-2">
        {/* Pokemon Alet Card */}
        {randomPokemon && (
          <article className="bg-base-300 flex flex-col items-center p-5 sm:rounded-r-2xl md:rounded-2xl">
            <h1 className="text-base-200 mb-3 text-xl font-bold">
              Pokémon Aleatorio
            </h1>
            <img
              src={getPokemonImage(randomPokemon)}
              alt={`Imagen de ${randomPokemon.name}`}
              aria-label={`Imagen de ${randomPokemon.name}`}
              className="border-base-100 container max-h-32 max-w-32 rounded-full border-2"
            />
            <div className="flex items-center justify-center gap-2">
              <p className="font-bold text-yellow-500 capitalize">
                #{randomPokemon.id}
              </p>
              <p className="text-base-100 font-bold capitalize">
                {randomPokemon.name}
              </p>
            </div>
            <div className="mt-1 flex gap-2">
              {randomPokemonTypes.map((tipo, i) => (
                <span
                  key={tipo}
                  className={`rounded px-2 py-1 text-xs capitalize ${colorTypes[tipo.toLowerCase()]}`}
                >
                  {tipo}
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-3">
              <div>
                <p className="text-base-100 font-bold">
                  {randomPokemon.stats[0].base_stat}
                </p>
                <p className="text-base-200 text-sm font-bold">HP</p>
              </div>
              <div>
                <p className="text-base-100 font-bold">
                  {randomPokemon.stats[1].base_stat}
                </p>
                <p className="text-base-200 text-sm font-bold">AT</p>
              </div>
              <div>
                <p className="text-base-100 font-bold">
                  {randomPokemon.stats[2].base_stat}
                </p>
                <p className="text-base-200 text-sm font-bold">DF</p>
              </div>
            </div>
            <Link to={`/pokemon/${randomPokemon.name}`}>
              <button className="btn btn-neutral mt-3 rounded-full text-base">
                Ver Detalles
              </button>
            </Link>
          </article>
        )}

        {/* Games Card */}
        {randomPokemon && (
          <article className="bg-base-200 flex flex-col p-5 sm:rounded-l-2xl md:rounded-2xl">
            <h2 className="text-base-100 mb-5 text-xl font-bold">
              Juegos disponibles
            </h2>
            <nav>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link to="/games/find-pokemon">
                    <button className="btn btn-neutral w-full">
                      🔍 ¿Quién es ese Pokémon?
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/games/type-pokemon">
                    <button className="btn btn-neutral w-full">
                      ⚔️ Tipos Efectivos
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/games/calculator">
                    <button className="btn btn-neutral w-full">
                      🧮 Calculadora de Tipos
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/games/sound-pokemon">
                    <button className="btn btn-neutral w-full">
                      🔊 ¿Por su grito?
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/games">
                    <button className="btn btn-neutral">Ver Todos</button>
                  </Link>
                </li>
              </ul>
            </nav>
          </article>
        )}
      </section>

      {/* Links Card */}
      <section className="bg-base-300 mx-auto mt-2 max-w-190 p-6 text-center md:rounded-2xl">
        <h1 className="text-base-200 text-2xl font-bold">
          ¡Explora el mundo Pokémon!
        </h1>
        <p className="text-base-100 mb-6">
          Conoce todos los Pokémon, pon a prueba tus conocimientos o simplemente
          diviértete.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/pokemons">
            <button className="btn btn-primary">📚 Ver Pokémons</button>
          </Link>
          <Link to="/games">
            <button className="btn btn-accent">🎮 Ir a Juegos</button>
          </Link>
          <Link to="/acerca">
            <button className="btn btn-secondary">
              🧾 Acerca del Proyecto
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
export default Home;
