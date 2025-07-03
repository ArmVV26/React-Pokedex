import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <section className="flex items-center justify-center py-22 sm:px-5">
      <title>Acerca de</title>
      <article className="bg-base-300 text-base-content border-base-200 max-w-3xl px-3 py-5 shadow-lg sm:rounded-2xl sm:border-r-5 sm:border-b-5 sm:px-10">
        <h1 className="text-base-200 font-lato text-center text-2xl font-bold sm:text-3xl">
          📘 Acerca de esta página
        </h1>

        <p className="mb-4 text-center text-lg">
          Esta aplicación fue creada para fans de Pokémon que quieran:
        </p>

        <ul className="mb-6 flex list-none flex-col gap-2 sm:grid sm:grid-cols-3">
          <li className="bg-base-100 border-base-200 text-base-300 flex items-center justify-center rounded-2xl border-b-5 border-l-5 p-4 text-center font-semibold">
            Consultar cómo afectan los tipos entre sí.
          </li>
          <li className="bg-base-100 border-base-200 text-base-300 flex items-center justify-center rounded-2xl border-b-5 p-4 text-center font-semibold">
            Probar sus conocimientos con minijuegos.
          </li>
          <li className="bg-base-100 border-base-200 text-base-300 flex items-center justify-center rounded-2xl border-r-5 border-b-5 p-4 text-center font-semibold">
            Explorar información útil de forma visual e interactiva.
          </li>
        </ul>

        <div className="mb-6">
          <h2 className="text-base-200 font-lato text-center text-xl font-semibold">
            💡 ¿Cómo surgió este proyecto?
          </h2>
          <p className="text-center">
            Fue pensado como una forma de aprender tecnologías modernas mientras
            se crea algo útil y entretenido. Todo con mucho cariño por el
            universo Pokémon.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-base-200 font-lato mb-2 text-center text-xl font-semibold">
            🛠️ Tecnologías usadas
          </h2>
          <ul className="flex list-none flex-wrap justify-center gap-2 sm:grid sm:grid-cols-4">
            <li className="bg-base-100 border-base-200 text-base-300 flex items-center justify-center rounded-2xl border-b-5 border-l-5 p-4 text-center font-semibold">
              React + React Router
            </li>
            <li className="bg-base-100 border-base-200 text-base-300 flex items-center justify-center rounded-2xl border-b-5 p-4 text-center font-semibold">
              TailwindCSS
            </li>
            <li className="bg-base-100 border-base-200 text-base-300 flex items-center justify-center rounded-2xl border-b-5 p-4 text-center font-semibold">
              PokéAPI
            </li>
            <li className="bg-base-100 border-base-200 text-base-300 flex items-center justify-center rounded-2xl border-r-5 border-b-5 p-4 text-center font-semibold">
              JavaScript
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <Link to="/">
            <button className="btn btn-primary">Volver a inicio</button>
          </Link>
        </div>
      </article>
    </section>
  );
}
