import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <section className="flex items-center justify-center py-22 sm:px-5">
      <title>Privacidad</title>
      <article className="bg-base-300 text-base-content border-base-200 max-w-3xl px-3 py-5 shadow-lg sm:rounded-2xl sm:border-r-5 sm:border-b-5 sm:px-10">
        <h1 className="font-lato text-base-200 text-center text-2xl font-bold sm:text-3xl">
          🔐 Política de Privacidad
        </h1>

        <p className="mb-4 text-center text-lg">
          Tu privacidad es importante. Esta es nuestra política de datos:
        </p>

        <ul className="mb-6 flex list-none flex-col gap-3 text-base">
          <li>
            🔸 No recopilamos datos personales ni identificativos del usuario.
          </li>
          <li>🔸 No usamos cookies propias ni de terceros.</li>
          <li>🔸 No compartimos información con servicios externos.</li>
        </ul>

        <p className="mb-6 text-center">
          Si llegamos a implementar formularios o análisis en el futuro,
          actualizaremos esta política para reflejarlo claramente.
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
