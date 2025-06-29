import { pokeApi } from "@/utils/pokeApi";

export async function getPokemons(limit = 20, offset = 0) {
  const { data } = await pokeApi.get(`pokemon?limit=${limit}&offset=${offset}`);

  const detalles = await Promise.all(
    data.results.map(async ({ url }) => {
      const { data: detalle } = await pokeApi.get(url);

      const tipos = await Promise.all(
        detalle.types.map(async (tipo) => {
          const { data: tipoData } = await pokeApi.get(tipo.type.url);
          return (
            tipoData.names.find((n) => n.language.name === "es")?.name ||
            tipo.type.name
          );
        }),
      );

      return {
        id: detalle.id,
        nombre: detalle.name.charAt(0).toUpperCase() + detalle.name.slice(1),
        tipos,
        imagen: detalle.sprites.front_default,
        peso: detalle.weight,
      };
    }),
  );

  return detalles;
}
