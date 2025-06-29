// Function that return the sprite select of the pokemon
export function getPokemonImage(pokemon, spriteMode = "default") {
  if (!pokemon || !pokemon.sprites) return "";

  const animated =
    pokemon.sprites.versions?.["generation-v"]?.["black-white"]?.animated ?? {};

  switch (spriteMode) {
    case "shiny":
      return pokemon.sprites.front_shiny;
    case "gif":
      return animated.front_default || pokemon.sprites.front_default;
    case "shinyGif":
      return animated.front_shiny || pokemon.sprites.front_shiny;
    case "official-artwork":
      return pokemon.sprites.other[spriteMode].front_default;
    default:
      return pokemon.sprites.front_default;
  }
}
