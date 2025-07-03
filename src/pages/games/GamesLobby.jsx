import { Link } from "react-router-dom";

function GamesLobby() {
  return (
    <div className="py-5 text-center">
      <title>Juego - Lobby</title>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center py-5 md:px-5">
        <h1 className="text-base-200 font-lato mb-10 text-center text-3xl font-bold">
          ¡Selecciona un juego!
        </h1>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Game 1 */}
          <article className="bg-base-300 rounded-2xl p-5 shadow-md transition-all hover:shadow-xl">
            <h1 className="font-lato mb-2 text-xl font-semibold">
              🔍 ¿Quién es ese Pokémon?
            </h1>
            <p className="text-base-content/80 mb-4 text-sm">
              Adivina la silueta del Pokémon. ¡Pon a prueba tu memoria visual!
            </p>
            <Link to="/games/find-pokemon">
              <button className="btn btn-primary w-full">Jugar</button>
            </Link>
          </article>

          {/* Game 2 */}
          <article className="bg-base-300 rounded-2xl p-5 shadow-md transition-all hover:shadow-xl">
            <h1 className="font-lato mb-2 text-xl font-semibold">
              ⚔️ Tipos Efectivos
            </h1>
            <p className="text-base-content/80 mb-4 text-sm">
              Elige el tipo más efectivo contra el mostrado. ¡Puntúa hasta
              fallar!
            </p>
            <Link to="/games/type-pokemon">
              <button className="btn btn-secondary w-full">Jugar</button>
            </Link>
          </article>

          {/* Game 3 */}
          <article className="bg-base-300 rounded-2xl p-5 shadow-md transition-all hover:shadow-xl">
            <h1 className="font-lato mb-2 text-xl font-semibold">
              🧮 Calculadora de Tipos
            </h1>
            <p className="text-base-content/80 mb-4 text-sm">
              Selecciona uno o dos tipos para ver sus debilidades y
              resistencias.
            </p>
            <Link to="/games/type-calculator">
              <button className="btn btn-primary w-full">Usar</button>
            </Link>
          </article>
        </section>

        {/* Next Games */}
        <article className="bg-base-300 mt-5 max-w-100 rounded-2xl p-5 shadow-md transition-all hover:shadow-xl">
          <h1 className="font-lato mb-2 text-xl font-semibold">
            ➡️ Proximamente ...
          </h1>
          <p className="text-base-content/80 mb-4 text-sm">
            Proximamente se añadiran mas juegos. ¡No te los pierdas!
          </p>
          <button className="btn btn-disabled w-full" disabled>
            Jugar
          </button>
        </article>
      </div>
    </div>
  );
}
export default GamesLobby;
