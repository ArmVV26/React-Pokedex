import { Link } from "react-router-dom";
import { colorTypes } from "@/utils/constants";

function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.nombre}`}>
      <section className="card flex cursor-pointer flex-col shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
        <figure className="container">
          <img
            src={pokemon.imagen}
            alt={pokemon.nombre}
            className="h-32 w-32 object-contain"
          />
        </figure>

        <article className="bg-base-300 card-body rounded-b-lg p-0 px-5">
          <header className="card-title flex items-center justify-between">
            <h1 className="font-lato text-xl font-bold">{pokemon.nombre}</h1>
            <h2 className="text-xl font-bold text-yellow-500 italic">
              Nº. {pokemon.id}
            </h2>
          </header>
          <main className="flex justify-center gap-2 text-center">
            {pokemon.tipos.map((tipo) => (
              <p
                key={tipo}
                className={`max-w-20 rounded-lg py-1 ${colorTypes[tipo.toLowerCase()]}`}
              >
                {tipo}
              </p>
            ))}
          </main>
          <footer className="py-2 text-right">
            <p className="px-3 py-1 text-sm opacity-60">
              {pokemon.peso / 10} kg
            </p>
          </footer>
        </article>
      </section>
    </Link>
  );
}

export default PokemonCard;
