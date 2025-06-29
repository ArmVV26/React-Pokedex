import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-between bg-red-500 pt-2 pr-5 pb-2 pl-5 sm:flex-row">
      <Link to="/" className="">
        <picture>
          <source srcSet="/img/logo-Pokeball-256px.png" type="image/png" />
          <img
            src="/img/logo-Pokeball-256px.png"
            alt="Logo de Pokemon"
            className="h-20 w-20"
          />
        </picture>
      </Link>

      <nav>
        <ul className="font-lato flex font-bold">
          <li>
            <Link to="/pokemons">
              <button className="btn btn-ghost btn-sm hover:bg-base-200 p-0 text-sm sm:text-lg">
                Pokemons
              </button>
            </Link>
          </li>
          <li>
            <Link to="/games">
              <button className="btn btn-ghost btn-sm hover:bg-base-200 p-0 text-sm sm:text-lg">
                Juegos
              </button>
            </Link>
          </li>
          <li>
            <Link to="/about-us">
              <button className="btn btn-ghost btn-sm hover:bg-base-200 p-0 text-sm sm:text-lg">
                Acerca de
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
