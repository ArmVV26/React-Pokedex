import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { colorTypes, gamesInfo } from "@/utils/constants";
import { FaGamepad, FaQuestion } from "react-icons/fa";
import { SiNintendo3Ds, SiNintendo } from "react-icons/si";

import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import { getPokemonImage } from "@/utils/pokemonHelpers";
import ErrorMessage from "@/components/ErrorMessage";

const iconMap = {
  FaGamepad: <FaGamepad />,
  SiNintendo: <SiNintendo />,
  SiNintendo3Ds: <SiNintendo3Ds />,
};

function PokemonDetail() {
  const { name } = useParams();
  const { pokemon, spanishTypes, weaknesses, spanishWeaknesses, error } =
    usePokemonDetail(name);

  const [useShiny, setUseShiny] = useState(false);
  const [useGif, setUseGif] = useState(false);

  const spriteMode = useShiny
    ? useGif
      ? "shinyGif"
      : "shiny"
    : useGif
      ? "gif"
      : "default";

  // Agrupar métodos de aprendizaje de movimientos
  const statsBase = {};
  if (pokemon) {
    pokemon.stats.forEach((s) => {
      statsBase[s.stat.name] = s.base_stat;
    });
  }

  // Renderizar el grafico
  const chartData = Object.entries(statsBase).map(([stat, count]) => ({
    stat: stat.charAt(0).toUpperCase() + stat.slice(1),
    count,
  }));

  if (error) {
    return (
      <ErrorMessage
        title="Pokémon no encontrado"
        message="No hemos podido encontrar ese Pokémon. Busca de nuevo o prueba con otro nombre."
      />
    );
  }

  if (!pokemon) {
    return (
      <article className="mx-auto flex flex-col items-center justify-center">
        <h1 className="font-lato text-base-200 text-2xl font-bold">
          Cargando Pokémon
        </h1>
        <div className="loading loading-spinner text-primary m-auto h-100 w-100"></div>
      </article>
    );
  }

  return (
    <div className="font-roboto grid gap-5 pt-5 pb-5 sm:mx-20 sm:grid-cols-1 md:mx-50 2xl:mx-90 2xl:grid-cols-2">
      <title>Detalles Pokemon</title>
      {/* Firts Card */}
      <section className="card shadow-xl">
        <header className="container flex flex-col justify-center rounded-t-xl">
          <figure className="flex items-center justify-center p-4">
            <img
              src={getPokemonImage(pokemon, spriteMode)}
              alt={`Imagen de ${pokemon.name} en modo ${spriteMode}`}
              aria-label={`Sprite de ${pokemon.name} en modo ${spriteMode}`}
              className="object-contain sm:h-32 sm:w-32 2xl:h-64 2xl:w-64"
            />
          </figure>

          <div className="mb-2 flex justify-center gap-2">
            <button
              className="btn btn-sm w-20"
              onClick={() => setUseShiny((prev) => !prev)}
              aria-label="Alternar entre sprite normal y shiny"
            >
              {useShiny ? "Normal" : "Shiny"}
            </button>
            <button
              className="btn btn-sm w-20"
              onClick={() => setUseGif((prev) => !prev)}
              aria-label="Alternar entre sprite estático y animado"
            >
              {useGif ? "Sprite" : "GIF"}
            </button>
          </div>
        </header>

        <article className="bg-base-300 card-body rounded-b-xl px-4 py-2">
          <div className="card-title font-lato flex items-center justify-between">
            <h1 className="font-lato text-xl font-bold capitalize">
              {pokemon.name}
            </h1>
            <h2 className="text-xl font-bold text-yellow-500 italic">
              ID: {pokemon.id}
            </h2>
          </div>

          {spanishTypes.length > 0 && (
            <div className="font-roboto mt-2 flex justify-center gap-2 text-center">
              {spanishTypes.map((tipo, i) => (
                <p
                  key={i}
                  className={`text-base-100 max-w-20 rounded-lg px-2 py-1 text-sm ${
                    colorTypes[tipo.toLowerCase()]
                  }`}
                >
                  {tipo}
                </p>
              ))}
            </div>
          )}

          <p>
            <strong className="text-base-200 text-base">Altura:</strong>{" "}
            {pokemon.height / 10} m
          </p>
          <p>
            <strong className="text-base-200 text-base">Peso:</strong>{" "}
            {pokemon.weight / 10} kg
          </p>
          <p>
            <strong className="text-base-200 text-base">
              Experiencia base:
            </strong>{" "}
            {pokemon.base_experience} xp
          </p>
          <p>
            <strong className="text-base-200 text-base">Habilidades:</strong>{" "}
            {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </p>
          <div className="flex items-center justify-center">
            <audio controls className="mt-2 p-0">
              <source src={pokemon.cries?.latest} type="audio/ogg" />
              Tu navegador no soporta audio.
            </audio>
          </div>
        </article>
      </section>

      {/* Second Card */}
      <section className="card bg-base-300 shadow-xl">
        <article className="card-body text-center">
          <h3 className="font-lato text-lg font-bold">
            Movimientos por método
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={chartData}>
              <PolarGrid stroke="#FFFCFC" />
              <PolarAngleAxis dataKey="stat" stroke="#FFFCFC" />
              <PolarRadiusAxis stroke="#FFFCFC" />
              <Radar
                name="Estadísticas"
                dataKey="count"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.6}
              />
              <Tooltip
                formatter={(value) => `${value} puntos`}
                labelFormatter={(label) => `Estadística: ${label}`}
              />
            </RadarChart>
          </ResponsiveContainer>

          <footer className="flex flex-col items-center justify-center">
            <p className="font-lato mt-5 mb-2 text-lg">Debilidades</p>
            <div className="flex flex-wrap gap-2">
              {spanishWeaknesses.map((w, i) => (
                <p
                  key={i}
                  className={`w-20 max-w-25 rounded-lg px-2 py-1 text-sm text-white capitalize ${
                    colorTypes[w.toLowerCase()]
                  }`}
                >
                  {w}
                </p>
              ))}
            </div>
          </footer>
        </article>
      </section>

      {/* Third Card */}
      {pokemon.game_indices.length !== 0 && (
        <section className="card bg-base-300 shadow-md lg:col-span-1 2xl:col-span-2">
          <article className="card-body">
            <h1 className="font-lato mb-2 text-lg font-bold">
              Apariciones en juegos
            </h1>
            <div className="flex flex-wrap gap-2">
              {pokemon.game_indices.map((g, i) => {
                const info = gamesInfo[g.version.name] || {
                  nombre: g.version.name,
                  color: "bg-gray-400",
                  icon: <FaQuestion />,
                };
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-lg px-2 py-1 text-sm capitalize ${info.color} ${info.text}`}
                  >
                    {iconMap[info.icon] || <FaQuestion />}
                    {info.nombre}
                  </div>
                );
              })}
            </div>
          </article>
        </section>
      )}
    </div>
  );
}

export default PokemonDetail;
