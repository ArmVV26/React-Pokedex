import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center mt-5 font-bold shadow-footer bg-secondary">
      <nav className="m-2 font-lato">
        <ul className="items-center gap-2 px-5 menu md:menu-horizontal sm:menu-vertical">
          <li><a href="#">Terminos y Condiciones</a></li>
          <li><a href="#">Contacto</a></li>
          <li><a href="#">Politicas de Privacidad</a></li>
        </ul>
      </nav>
      <section className="text-base font-bold text-center font-roboto">
        <p className="opacity-70">Creado por Armando Vaquero Vargas</p>
        <p className="opacity-70">© Todos los derechos reservados. 2024-2025</p>
      </section>
    </footer>
  )
}
