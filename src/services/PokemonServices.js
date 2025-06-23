export async function getPokemons(limit = 20, offset = 0) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const data = await res.json()

  const detalles = await Promise.all(
    data.results.map(async ({ url }) => {
      const resDetalle = await fetch(url)
      const dataDetalle = await resDetalle.json()

      const tipos = await Promise.all(
        dataDetalle.types.map(async (tipo) => {
          const resTipo = await fetch(tipo.type.url)
          const dataTipo = await resTipo.json()
          return dataTipo.names[5].name 
        })
      )

      return {
        id: dataDetalle.id,
        nombre: dataDetalle.name.charAt(0).toUpperCase() + dataDetalle.name.slice(1),
        tipos,
        imagen: dataDetalle.sprites.front_default,
        peso: dataDetalle.weight
      }
    })
  )

  return detalles
}
