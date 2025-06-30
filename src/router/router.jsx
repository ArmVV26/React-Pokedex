import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Home";
import Pokemons from "@/pages/pokemons/Pokemons";
import PokemonDetail from "@/pages/pokemons/PokemonDetail";
import GamesLobby from "@/pages/games/GamesLobby";
import GuessPokemon from "@/pages/games/GuessPokemon";
import EffectiveTypesGame from "@/pages/games/EffectiveTypes";
import TypeCalculator from "@/pages/games/TypeCalculator";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "pokemons", element: <Pokemons /> },
      { path: "pokemon/:name", element: <PokemonDetail /> },
      { path: "games", element: <GamesLobby /> },
      { path: "games/find-pokemon", element: <GuessPokemon /> },
      { path: "games/type-pokemon", element: <EffectiveTypesGame /> },
      { path: "games/type-calculator", element: <TypeCalculator /> },
    ],
  },
]);
