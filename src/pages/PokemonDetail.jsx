import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const coloresTipos = {
    acero: 'bg-pokemon-acero',
    agua: 'bg-pokemon-agua',
    bicho: 'bg-pokemon-bicho',
    dragon: 'bg-pokemon-dragon',
    eléctrico: 'bg-pokemon-electrico',
    fantasma: 'bg-pokemon-fantasma',
    fuego: 'bg-pokemon-fuego',
    hada: 'bg-pokemon-hada',
    hielo: 'bg-pokemon-hielo',
    lucha: 'bg-pokemon-lucha',
    normal: 'bg-pokemon-normal',
    planta: 'bg-pokemon-planta',
    psíquico: 'bg-pokemon-psiquico',
    roca: 'bg-pokemon-roca',
    siniestro: 'bg-pokemon-siniestro',
    tierra: 'bg-pokemon-tierra',
    veneno: 'bg-pokemon-veneno',
    volador: 'bg-pokemon-volador'
}

function PokemonDetail() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [useShiny, setUseShiny] = useState(false);
    const [useGif, setUseGif] = useState(false);
    const [spanishTypes, setSpanishTypes] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const data = await res.json();
          setPokemon(data);
      
          // Obtener tipos en español
          const tipos = await Promise.all(
            data.types.map(async (tipo) => {
              const resTipo = await fetch(tipo.type.url);
              const dataTipo = await resTipo.json();
      
              // Buscar "es" en lugar de asumir posición [5]
              const spanishNameObj = dataTipo.names.find(n => n.language.name === "es");
              return spanishNameObj?.name || tipo.type.name; // fallback al inglés
            })
          );
      
          setSpanishTypes(tipos);
        };
      
        fetchPokemon();
      }, [name]);

    if (!pokemon) return <div className="loading loading-spinner text-primary"></div>;

    // Método para elegir la imagen correcta
    const getPokemonImage = () => {
        if (useGif) {
        return useShiny
            ? pokemon.sprites.versions['generation-v']['black-white'].animated.front_shiny
            : pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;
        } else {
        return useShiny
            ? pokemon.sprites.front_shiny
            : pokemon.sprites.front_default;
        }
    };

    // Agrupar métodos de aprendizaje de movimientos
    const moveMethodCounts = {};
    pokemon.moves.forEach((m) => {
        m.version_group_details.forEach((v) => {
        const method = v.move_learn_method.name;
        moveMethodCounts[method] = (moveMethodCounts[method] || 0) + 1;
        });
    });

    const chartData = Object.entries(moveMethodCounts).map(([method, count]) => ({
        method,
        count,
    }));
    
    return (
        <div className="max-w-150 mx-auto p-4 flex flex-col justify-center gap-5 font-roboto">
            <div className="card shadow-xl">
                <div className="flex flex-col justify-center container rounded-t-xl">
                    <figure className="p-4 flex justify-center items-center">
                        <img
                            src={getPokemonImage()}
                            alt={pokemon.name}
                            className="object-contain w-32 h-32"
                        />
                    </figure>
                    
                    <div className="flex gap-2 mb-2 justify-center">
                        <button className="btn btn-sm w-20" onClick={() => setUseShiny(!useShiny)}>
                            {useShiny ? "Normal" : "Shiny"}
                        </button>
                        <button className="btn btn-sm w-20" onClick={() => setUseGif(!useGif)}>
                            {useGif ? "Sprite" : "GIF"}
                        </button>
                    </div>
                </div>

                <div className="px-4 py-2 bg-base-300 rounded-b-xl card-body">
                    <div className="flex items-center justify-between card-title font-lato">
                        <h1 className="text-xl font-bold capitalize">{pokemon.name}</h1>
                        <h2 className="text-xl italic font-bold text-yellow-500">ID: {pokemon.id}</h2>
                    </div>
                    
                    {spanishTypes.length > 0 && (
                        <div className="flex justify-center text-center gap-2 font-roboto mt-2">
                            {spanishTypes.map((tipo, i) => (
                            <p
                                key={i}
                                className={`max-w-20 py-1 px-2 text-sm text-white rounded-lg ${coloresTipos[tipo.toLowerCase()]}`}
                            >
                                {tipo}
                            </p>
                            ))}
                        </div>
                    )}
                    
                    <p><strong className="text-base text-base-200">Altura:</strong> {pokemon.height / 10} m</p>
                    <p><strong className="text-base text-base-200">Peso:</strong> {pokemon.weight / 10} kg</p>
                    <p><strong className="text-base text-base-200">Experiencia base:</strong> {pokemon.base_experience} xp</p>
                    <div className="flex justify-center items-center">
                        <audio controls className="mt-2">
                            <source src={pokemon.cries?.latest} type="audio/ogg" />
                            Tu navegador no soporta audio.
                        </audio>
                    </div>
                </div>
            </div>
    
            <div className="card bg-base-200 shadow-md">
                <div className="card-body">
                <h3 className="text-lg font-bold mb-2">Habilidades</h3>
                <ul className="list-disc list-inside">
                    {pokemon.abilities.map((a, i) => (
                    <li key={i}>
                        {a.ability.name} {a.is_hidden && <span className="badge badge-outline ml-2">Oculta</span>}
                    </li>
                    ))}
                </ul>
                </div>
            </div>
    
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h3 className="text-lg font-bold mb-2">Movimientos por método</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="method" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
    
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h3 className="text-lg font-bold mb-2">Apariciones en juegos</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.game_indices.map((g, i) => (
                  <div key={i} className="badge badge-primary capitalize">{g.version.name}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
    );
}    

export default PokemonDetail;