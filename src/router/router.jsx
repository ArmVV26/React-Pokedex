import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Home";
import Pokemons from "@/pages/pokemons/Pokemons";
import PokemonDetail from "@/pages/pokemons/PokemonDetail";
import GamesLobby from "../pages/games/GamesLobby";
import GuessPokemon from "@/pages/games/GuessPokemon";

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
    ],
  },
]);
