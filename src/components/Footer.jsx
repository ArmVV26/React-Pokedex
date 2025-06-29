import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="shadow-footer bg-secondary flex flex-col items-center font-bold">
      <nav className="font-lato m-2">
        <ul className="menu md:menu-horizontal sm:menu-vertical items-center gap-2 px-5">
          <li>
            <a href="#">Terminos y Condiciones</a>
          </li>
          <li>
            <a href="#">Contacto</a>
          </li>
          <li>
            <a href="#">Politicas de Privacidad</a>
          </li>
        </ul>
      </nav>
      <section className="font-roboto text-center text-base font-bold">
        <p className="opacity-70">Creado por Armando Vaquero Vargas</p>
        <p className="opacity-70">
          © Todos los derechos reservados. 2024-2025
        </p>
      </section>
    </footer>
  );
}
