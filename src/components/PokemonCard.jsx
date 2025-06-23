const coloresTipos = {
  acero: 'pokemon-acero',
  agua: 'pokemon-agua',
  bicho: 'pokemon-bicho',
  dragon: 'pokemon-dragon',
  eléctrico: 'pokemon-electrico',
  fantasma: 'pokemon-fantasma',
  fuego: 'pokemon-fuego',
  hada: 'pokemon-hada',
  hielo: 'pokemon-hielo',
  lucha: 'pokemon-lucha',
  normal: 'pokemon-normal',
  planta: 'pokemon-planta',
  psíquico: 'pokemon-psiquico',
  roca: 'pokemon-roca',
  siniestro: 'pokemon-siniestro',
  tierra: 'pokemon-tierra',
  veneno: 'pokemon-veneno',
  volador: 'pokemon-volador'
}

function PokemonCard({ pokemon }) {
  return (
    <article className="tarjeta efecto-tarjeta">
      <figure className="fondo-patron">
        <img src={pokemon.imagen} alt={pokemon.nombre} className="object-contain w-32 h-32" />
      </figure>
      <section className="text-white bg-custom-black">
        <div className="flex items-center justify-between px-4 nombre-id">
          <h1 className="text-xl font-bold">{pokemon.nombre}</h1>
          <h2 className="text-xl italic font-bold text-custom-yellow">Nº. {pokemon.id}</h2>
        </div>
        <div className="flex justify-center gap-2 py-2 tipos">
          {pokemon.tipos.map((tipo) => (
            <p key={tipo} className={`px-3 py-1 rounded-lg bg-${coloresTipos[tipo.toLowerCase()]}`}>
              {tipo}
            </p>
          ))}
        </div>
        <div className="py-2 text-right peso">
          <p className="px-3 py-1 text-sm opacity-60">{pokemon.peso} hg</p>
        </div>
      </section>
    </article>
  )
}

export default PokemonCard
