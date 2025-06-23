import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="flex justify-between items-center pt-2 pr-5 pb-2 pl-5 bg-red-500">
        <Link to="/" className="hover:">
            <picture>
                <source srcSet="/img/logo-Pokeball-256px.png" type="image/png" />
                <img src="/img/logo-Pokeball-256px.png" alt="Logo de Pokemon" className="w-20 h-20" />
            </picture>
        </Link>

        <nav>
            <ul className="flex gap-2 font-bold font-lato">
                <li>
                    <Link to="/pokemons" className="btn btn-ghost btn-sm text-lg p-0 hover:bg-base-200">
                        Pokemons
                    </Link>
                </li>
                <li>
                    <Link to="/tipos" className="btn btn-ghost btn-sm text-lg p-0 hover:bg-base-200">
                        Tipos
                    </Link
                ></li>
                <li>
                    <Link to="/jquery" className="btn btn-ghost btn-sm text-lg p-0 hover:bg-base-200">
                        JQuery
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}
