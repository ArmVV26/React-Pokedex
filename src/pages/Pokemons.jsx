import PokemonCard from '@/components/PokemonCard'
import { useEffect, useState } from 'react'
import { getPokemons } from '@/services/PokemonServices'

function Pokemons() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    getPokemons().then(setPokemons)
  }, [])

  return (
    <main className="grid gap-5 p-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </main>
  )
}
export default Pokemons
