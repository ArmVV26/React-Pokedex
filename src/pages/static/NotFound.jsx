import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex items-center justify-center px-4 py-30">
      <title>Error 404</title>
      <article className="bg-base-300 max-w-lg rounded-2xl p-8 text-center shadow-lg">
        <h1 className="font-lato text-error text-5xl font-bold">404</h1>
        <p className="mb-4 text-xl font-semibold">Página no encontrada</p>
        <p className="mb-10 text-sm text-gray-300">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <Link to="/">
          <button className="btn btn-primary">Volver al inicio</button>
        </Link>
      </article>
    </section>
  );
}
