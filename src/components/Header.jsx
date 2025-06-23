import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="flex justify-between items-center pt-2 pr-5 pb-2 pl-5 bg-red-500">
        <Link to="/">
            <picture>
                <source srcSet="/img/logo-Pokeball-256px.png" type="image/png" />
                <img src="/img/logo-Pokeball-256px.png" alt="Logo de Pokemon" className="w-20 h-20" />
            </picture>
        </Link>

        <nav>
            <ul className="gap-2 font-bold menu menu-horizontal font-lato font-size-lg">
                <li><Link to="/pokemons" className="hover:bg-base-100">Pokemons</Link></li>
                <li><Link to="/tipos">Tipos</Link></li>
                <li><Link to="/jquery">JQuery</Link></li>
            </ul>
        </nav>
    </header>
  )
}
