import { Link } from 'react-router-dom'

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

function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.nombre}`}>
      <article className="card flex flex-col shadow-xl transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105 active:scale-95">
        <figure className="container">
          <img src={pokemon.imagen} alt={pokemon.nombre} className="object-contain w-32 h-32" />
        </figure>

        <section className="bg-base-300 card-body p-0 px-5 rounded-b-lg font-lato">
          <div className="flex items-center justify-between card-title">
            <h1 className="text-xl font-bold">{pokemon.nombre}</h1>
            <h2 className="text-xl italic font-bold text-yellow-500">Nº. {pokemon.id}</h2>
          </div>
          <div className="flex justify-center text-center gap-2 font-roboto">
            {pokemon.tipos.map((tipo) => (
              <p key={tipo} className={`max-w-20 py-1 rounded-lg ${coloresTipos[tipo.toLowerCase()]}`}>
                {tipo}
              </p>
            ))}
          </div>
          <div className="py-2 text-right">
            <p className="px-3 py-1 text-sm opacity-60">{pokemon.peso / 10} kg</p>
          </div>
        </section>
      </article>
    </Link>
  )
}

export default PokemonCard
