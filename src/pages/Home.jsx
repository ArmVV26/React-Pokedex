import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { pokeApi } from "@/utils/pokeApi";

const coloresTipos = {
  acero: "bg-pokemon-acero",
  agua: "bg-pokemon-agua",
  bicho: "bg-pokemon-bicho",
  dragón: "bg-pokemon-dragon",
  eléctrico: "bg-pokemon-electrico",
  fantasma: "bg-pokemon-fantasma",
  fuego: "bg-pokemon-fuego",
  hada: "bg-pokemon-hada",
  hielo: "bg-pokemon-hielo",
  lucha: "bg-pokemon-lucha",
  normal: "bg-pokemon-normal",
  planta: "bg-pokemon-planta",
  psíquico: "bg-pokemon-psiquico",
  roca: "bg-pokemon-roca",
  siniestro: "bg-pokemon-siniestro",
  tierra: "bg-pokemon-tierra",
  veneno: "bg-pokemon-veneno",
  volador: "bg-pokemon-volador",
};

function Home() {
  const [search, setSearch] = useState("");
  const [allPokemons, setAllPokemons] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [randomPokemonTypes, setRandomPokemonTypes] = useState([]);
  const navigate = useNavigate();

  // Cargar todos los pokémon al montar el componente
  useEffect(() => {
    pokeApi
      .get("pokemon", { params: { limit: 2000 } })
      .then(({ data }) => setAllPokemons(data.results))
      .catch(console.error);
  }, []);

  // Filtrar sugerencias cuando cambia el texto
  useEffect(() => {
    if (search.length === 0) {
      setSuggestions([]);
      return;
    }
    const filtered = allPokemons
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5)
      .map((p) => {
        // Extraer el id de la url
        const id = p.url.split("/").filter(Boolean).pop();
        // Imagen oficial de la PokéAPI
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return { ...p, id, img };
      });
    setSuggestions(filtered);
  }, [search, allPokemons]);

  // Obtener un pokemon aleatorio cada 10 segundos
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

  // Cambia el tipo del pokemon
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

  return (
    <main className="py-5 text-center">
      {/* Search Card */}
      <section className="bg-base-300 mx-auto flex flex-col items-center justify-center p-5 md:max-w-190 md:rounded-2xl">
        <h1 className="text-base-200 text-3xl font-bold">
          ¡Bienvenido al mundo Pokémon!
        </h1>
        <p className="text-base-100 mb-6 text-sm">
          Busca por nombre para conocer más detalles sobre el pokemon que deseas
          buscar
        </p>
        <div className="text-base-300 relative flex flex-row items-center gap-2">
          <input
            type="text"
            className={`input ${search.length > 0 && suggestions.length === 0 ? "input-error" : "input-bordered"}`}
            placeholder="Busca un Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <p
            className="btn rounded-full sm:text-lg"
            onClick={() => navigate("/pokemons")}
          >
            Ver Todos
          </p>
          {suggestions.length > 0 && (
            <ul className="bg-base-100 absolute top-full right-0 left-0 z-10 mt-2 rounded-lg shadow-2xl">
              {suggestions.map((p) => (
                <li
                  key={p.id}
                  className="hover:bg-base-200 flex cursor-pointer items-center gap-2 px-3 py-2 hover:rounded-lg"
                  onClick={() => navigate(`/pokemon/${p.name}`)}
                >
                  <img src={p.img} alt={p.name} className="h-10 w-10" />
                  <span className="font-mono text-xs font-bold text-yellow-500">
                    #{p.id}
                  </span>
                  <span className="text-base-300 capitalize">{p.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mx-auto my-2 grid max-w-190 gap-2 sm:grid-cols-2">
        {/* Pokemon Alet Card */}
        {randomPokemon && (
          <article className="bg-base-200 flex flex-col items-center p-5 sm:rounded-r-2xl md:rounded-2xl">
            <h1 className="text-base-100 mb-3 text-xl font-bold">
              Pokémon Aleatorio
            </h1>
            <img
              src={randomPokemon.sprites.front_default}
              alt={randomPokemon.name}
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
                  className={`rounded px-2 py-1 text-xs capitalize ${coloresTipos[tipo.toLowerCase()]}`}
                >
                  {tipo}
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-3">
              <div>
                <p className="text-base-100">
                  {randomPokemon.stats[0].base_stat}
                </p>
                <p className="text-base-300 text-sm font-bold">HP</p>
              </div>
              <div>
                <p className="text-base-100">
                  {randomPokemon.stats[1].base_stat}
                </p>
                <p className="text-base-300 text-sm font-bold">AT</p>
              </div>
              <div>
                <p className="text-base-100">
                  {randomPokemon.stats[2].base_stat}
                </p>
                <p className="text-base-300 text-sm font-bold">DF</p>
              </div>
            </div>
            <Link to={`/pokemon/${randomPokemon.name}`}>
              <p className="btn btn-neutral mt-3 rounded-full text-base">
                Ver Detalles
              </p>
            </Link>
          </article>
        )}

        {/* Games Card */}
        {randomPokemon && (
          <article className="bg-base-200 flex flex-col p-5 sm:rounded-l-2xl md:rounded-2xl">
            <h2 className="text-base-100 mb-5 text-xl font-bold">
              Juegos disponibles
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/games/find-pokemon"
                  className="btn btn-neutral w-full"
                >
                  🔍 ¿Quién es ese Pokémon?
                </Link>
              </li>
              <li>
                <Link
                  to="/games/type-pokemon"
                  className="btn btn-neutral w-full"
                >
                  ⚔️ Tipos Efectivos
                </Link>
              </li>
              <li>
                <Link to="/games/calculator" className="btn btn-neutral w-full">
                  🧮 Calculadora de Tipos
                </Link>
              </li>
              <li>
                <Link
                  to="/games/sound-pokemon"
                  className="btn btn-neutral w-full"
                >
                  🔊 ¿Por su grito?
                </Link>
              </li>
              <li>
                <Link to="/games" className="btn btn-neutral">
                  Ver Todos
                </Link>
              </li>
            </ul>
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
          <Link to="/pokemons" className="btn btn-primary">
            📚 Ver Pokémons
          </Link>
          <Link to="/games" className="btn btn-accent">
            🎮 Ir a Juegos
          </Link>
          <Link to="/acerca" className="btn btn-secondary">
            🧾 Acerca del Proyecto
          </Link>
        </div>
      </section>
    </main>
  );
}
export default Home;
