import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="shadow-footer bg-secondary font-roboto flex flex-col items-center font-bold">
      <nav className="font-lato m-2">
        <ul className="menu md:menu-horizontal sm:menu-vertical items-center gap-2 px-5">
          <li>
            <Link to="/terms">Terminos y Condiciones</Link>
          </li>
          <li>
            <a href="mailto:correonoexiste@example.com">Contacto</a>
          </li>
          <li>
            <Link to="/privacity">Politicas de Privacidad</Link>
          </li>
        </ul>
      </nav>
      <section className="font-roboto text-center text-base font-bold">
        <p className="font-lato opacity-70">
          Creado por Armando Vaquero Vargas
        </p>
        <p className="font-lato opacity-70">
          © Todos los derechos reservados. 2024-2025
        </p>
      </section>
    </footer>
  );
}
