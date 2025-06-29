import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaGamepad, FaQuestion } from "react-icons/fa";
import { SiNintendogamecube, SiNintendo3Ds, SiNintendo } from "react-icons/si";

const coloresTipos = {
  acero: "bg-pokemon-acero",
  agua: "bg-pokemon-agua",
  bicho: "bg-pokemon-bicho",
  dragon: "bg-pokemon-dragon",
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

const juegosInfo = {
  red: { nombre: "Rojo", color: "bg-red-700", icon: <FaGamepad /> },
  blue: { nombre: "Azul", color: "bg-blue-700", icon: <FaGamepad /> },
  yellow: { nombre: "Amarillo", color: "bg-yellow-500", icon: <FaGamepad /> },
  gold: { nombre: "Oro", color: "bg-yellow-500", icon: <FaGamepad /> },
  silver: { nombre: "Plata", color: "bg-gray-400", icon: <FaGamepad /> },
  crystal: { nombre: "Cristal", color: "bg-blue-500", icon: <FaGamepad /> },
  ruby: { nombre: "Rubí", color: "bg-red-400", icon: <SiNintendo /> },
  sapphire: { nombre: "Zafiro", color: "bg-blue-500", icon: <SiNintendo /> },
  emerald: { nombre: "Esmeralda", color: "bg-green-600", icon: <SiNintendo /> },
  firered: { nombre: "Fuego Rojo", color: "bg-red-700", icon: <SiNintendo /> },
  leafgreen: {
    nombre: "Hoja Verde",
    color: "bg-green-600",
    icon: <SiNintendo />,
  },
  diamond: {
    nombre: "Diamante",
    color: "bg-blue-600",
    icon: <SiNintendo3Ds />,
  },
  pearl: { nombre: "Perla", color: "bg-blue-500", icon: <SiNintendo3Ds /> },
  platinum: {
    nombre: "Platino",
    color: "bg-gray-600",
    icon: <SiNintendo3Ds />,
  },
  heartgold: {
    nombre: "Heart Gold",
    color: "bg-yellow-500",
    icon: <SiNintendo3Ds />,
  },
  soulsilver: {
    nombre: "Soul Silver",
    color: "bg-gray-600",
    icon: <SiNintendo3Ds />,
  },
  black: { nombre: "Negro", color: "bg-black", icon: <SiNintendo3Ds /> },
  white: {
    nombre: "Blanco",
    color: "bg-white",
    text: "text-black",
    icon: <SiNintendo3Ds />,
  },
  "black-2": { nombre: "Negro 2", color: "bg-black", icon: <SiNintendo3Ds /> },
  "white-2": {
    nombre: "Blanco 2",
    color: "bg-white",
    text: "text-black",
    icon: <SiNintendo3Ds />,
  },
};

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [useShiny, setUseShiny] = useState(false);
  const [useGif, setUseGif] = useState(false);
  const [spanishTypes, setSpanishTypes] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [spanishWeaknesses, setSpanishWeaknesses] = useState([]);

  // Obtener pokemon
  useEffect(() => {
    const fetchPokemon = async () => {
      setError(null);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Pokémon no encontrado");
          } else {
            setError("Error al cargar el Pokémon");
          }
          setPokemon(null);
          return;
        }
        const data = await res.json();
        setPokemon(data);
        // Obtener tipos en español
        const tipos = await Promise.all(
          data.types.map(async (tipo) => {
            const resTipo = await fetch(tipo.type.url);
            const dataTipo = await resTipo.json();

            // Buscar "es" en lugar de asumir posición [5]
            const spanishNameObj = dataTipo.names.find(
              (n) => n.language.name === "es",
            );
            return spanishNameObj?.name || tipo.type.name; // fallback al inglés
          }),
        );

        setSpanishTypes(tipos);
      } catch (e) {
        setError("Error de red o inesperado");
        setPokemon(null);
      }
    };

    fetchPokemon();
  }, [name]);

  // Obtener debilidades de los tipos
  useEffect(() => {
    if (!pokemon) return;

    const fetchWeaknesses = async () => {
      const allWeaknesses = await Promise.all(
        pokemon.types.map(async (tipo) => {
          const res = await fetch(tipo.type.url);
          const data = await res.json();
          return data.damage_relations.double_damage_from.map((t) => t);
        }),
      );
      // Unir y eliminar duplicados por nombre
      const uniqueWeaknesses = [
        ...new Map(allWeaknesses.flat().map((t) => [t.name, t])).values(),
      ];
      setWeaknesses(uniqueWeaknesses);

      // Obtener nombres en español
      const spanishNames = await Promise.all(
        uniqueWeaknesses.map(async (tipo) => {
          const res = await fetch(tipo.url);
          const data = await res.json();
          const spanishNameObj = data.names.find(
            (n) => n.language.name === "es",
          );
          return spanishNameObj?.name || tipo.name;
        }),
      );
      setSpanishWeaknesses(spanishNames);
    };

    fetchWeaknesses();
  }, [pokemon]);

  if (error) {
    return (
      <div className="flex h-160 items-center justify-center">
        <div className="bg-base-300 border-primary rounded-2xl border-r-5 border-b-5 p-15 shadow-xl">
          <div className="items-center text-center">
            <h1 className="text-error mb-2 text-3xl font-bold">
              Pokémon no encontrado
            </h1>
            <p className="text-base-content mb-4 text-lg">
              No hemos podido encontrar ese Pokémon.
              <br />
              Busca de nuevo o prueba con otro nombre.
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
    );
  }

  if (!pokemon) {
    return (
      <div className="mx-auto flex flex-col items-center justify-center">
        <h1 className="text-base-200 text-2xl font-bold">Cargando Pokémon</h1>
        <div className="loading loading-spinner text-primary m-auto h-100 w-100"></div>
      </div>
    );
  }

  // Método para elegir la imagen correcta
  const getPokemonImage = () => {
    if (useGif) {
      return useShiny
        ? pokemon.sprites.versions["generation-v"]["black-white"].animated
            .front_shiny
        : pokemon.sprites.versions["generation-v"]["black-white"].animated
            .front_default;
    } else {
      return useShiny
        ? pokemon.sprites.front_shiny
        : pokemon.sprites.front_default;
    }
  };

  // Agrupar métodos de aprendizaje de movimientos
  const statsBase = {};
  pokemon.stats.forEach((s) => {
    statsBase[s.stat.name] = s.base_stat;
  });

  const chartData = Object.entries(statsBase).map(([stat, count]) => ({
    stat: stat.charAt(0).toUpperCase() + stat.slice(1),
    count,
  }));

  return (
    <div className="font-roboto grid gap-5 pt-5 pb-5 sm:mx-20 sm:grid-cols-1 md:mx-50 2xl:mx-90 2xl:grid-cols-2">
      {/* Firts Card */}
      <div className="card shadow-xl">
        <div className="container flex flex-col justify-center rounded-t-xl">
          <figure className="flex items-center justify-center p-4">
            <img
              src={getPokemonImage()}
              alt={pokemon.name}
              className="object-contain sm:h-32 sm:w-32 2xl:h-64 2xl:w-64"
            />
          </figure>

          <div className="mb-2 flex justify-center gap-2">
            <button
              className="btn btn-sm w-20"
              onClick={() => setUseShiny(!useShiny)}
            >
              {useShiny ? "Normal" : "Shiny"}
            </button>
            <button
              className="btn btn-sm w-20"
              onClick={() => setUseGif(!useGif)}
            >
              {useGif ? "Sprite" : "GIF"}
            </button>
          </div>
        </div>

        <div className="bg-base-300 card-body rounded-b-xl px-4 py-2">
          <div className="card-title font-lato flex items-center justify-between">
            <h1 className="text-xl font-bold capitalize">{pokemon.name}</h1>
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
                    coloresTipos[tipo.toLowerCase()]
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
        </div>
      </div>

      {/* Second Card */}
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body text-center">
          <h3 className="text-lg font-bold">Movimientos por método</h3>
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
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>

          <div className="flex flex-col items-center justify-center">
            <p className="mt-5 mb-2 text-lg">Debilidades</p>
            <div className="flex flex-wrap gap-2">
              {spanishWeaknesses.map((w, i) => (
                <p
                  key={i}
                  className={`w-20 max-w-25 rounded-lg px-2 py-1 text-sm text-white capitalize ${
                    coloresTipos[w.toLowerCase()]
                  }`}
                >
                  {w}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Third Card */}
      <div className="card bg-base-300 shadow-md lg:col-span-1 2xl:col-span-2">
        <div className="card-body">
          <h3 className="mb-2 text-lg font-bold">Apariciones en juegos</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.game_indices.map((g, i) => {
              const info = juegosInfo[g.version.name] || {
                nombre: g.version.name,
                color: "bg-gray-400",
                icon: <FaQuestion />,
              };
              return (
                <div
                  key={i}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1 text-sm capitalize ${info.color} ${info.text}`}
                >
                  {info.icon}
                  {info.nombre}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
