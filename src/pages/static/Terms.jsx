import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <section className="flex items-center justify-center py-22 sm:px-5">
      <title>Terminos</title>
      <article className="bg-base-300 text-base-content border-base-200 max-w-3xl px-3 py-5 shadow-lg sm:rounded-2xl sm:border-r-5 sm:border-b-5 sm:px-10">
        <h1 className="font-lato text-base-200 text-center text-2xl font-bold sm:text-3xl">
          📄 Términos y Condiciones
        </h1>

        <p className="mb-4 text-center text-lg">
          Al usar esta aplicación, aceptas los siguientes términos:
        </p>

        <ul className="mb-6 flex list-none flex-col gap-3 text-base">
          <li>
            ✅ Esta aplicación es solo para fines educativos y de
            entretenimiento.
          </li>
          <li>
            ✅ No almacenamos datos personales ni exigimos registro de usuario.
          </li>
          <li>
            ✅ Los nombres, imágenes y marcas relacionadas con Pokémon son
            propiedad de Nintendo, Game Freak y The Pokémon Company.
          </li>
          <li>
            ✅ No garantizamos exactitud total. La información proviene de
            fuentes externas como la PokéAPI.
          </li>
        </ul>

        <p className="mb-6 text-center">
          Al continuar utilizando el sitio, entiendes y aceptas estos términos.
        </p>

        <div className="flex justify-center">
          <Link to="/">
            <button className="btn btn-primary">Volver a inicio</button>
          </Link>
        </div>
      </article>
    </section>
  );
}
