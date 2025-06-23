import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import Home from '@/pages/Home'
import Pokemons from '@/pages/Pokemons'
import PokemonDetail from '@/pages/PokemonDetail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'pokemons', element: <Pokemons /> },
      { path: 'pokemon/:name', element: <PokemonDetail /> },
    ],
  },
])
