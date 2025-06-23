import PokemonCard from '@/components/PokemonCard'
import { useEffect, useState, useCallback } from 'react'
import { getPokemons } from '@/services/PokemonServices'

const LIMIT = 20

function Pokemons() {
  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)

  const loadMorePokemons = useCallback(async () => {
    if (loading) return
    setLoading(true)
    try {
      const newPokemons = await getPokemons(LIMIT, offset)
      setPokemons((prev) => [...prev, ...newPokemons])
      setOffset((prev) => prev + LIMIT)
    } catch (e) {
      console.error('Error al cargar más pokemons:', e)
    } finally {
      setLoading(false)
    }
  }, [loading, offset])

  useEffect(() => {
    const handleScroll = () => {
      if (pokemons.length === 0 && !loading) {
        console.log('Cargando pokemons iniciales')
        loadMorePokemons()
        return
      }

      if (
        pokemons.length > 0 &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
        !loading
      ) {
        console.log('Cargando más pokemons')
        loadMorePokemons()
      }
    }
    window.addEventListener('scroll', handleScroll)
    // Llama a handleScroll una vez al montar para la primera carga
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMorePokemons, loading, pokemons.length])

  return (
    <main className="grid gap-5 p-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
      {loading && <p>Cargando...</p>}
    </main>
  )
}
export default Pokemons
