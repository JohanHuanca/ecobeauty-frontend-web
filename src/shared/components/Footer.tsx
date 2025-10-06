import { Link } from "react-router-dom";
import { HiMail, HiLocationMarker, HiPhone, HiHeart } from "react-icons/hi";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-800 text-gray-300">
      <div className="mx-auto max-w-screen-xl px-4 py-12">
        {/* Grid principal */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Sobre nosotros */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img
                src="/ecobeauty.png"
                alt="EcoBeauty"
                className="h-8 w-8 object-contain"
              />
              <h3 className="text-xl font-bold text-white">EcoBeauty</h3>
            </div>
            <p className="mb-4 text-sm text-gray-400">
              Plataforma líder en cosmética natural y ecológica. Aprende,
              comparte y conecta con una comunidad apasionada por el cuidado
              natural de la piel.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-700 hover:bg-primary-600 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-white"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-700 hover:bg-primary-600 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-white"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-700 hover:bg-primary-600 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-white"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-700 hover:bg-primary-600 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-white"
              >
                <FaYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white uppercase">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/community"
                  className="hover:text-primary-400 transition-colors"
                >
                  Comunidad
                </Link>
              </li>
              <li>
                <Link
                  to="/tutorials"
                  className="hover:text-primary-400 transition-colors"
                >
                  Tutoriales
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-primary-400 transition-colors"
                >
                  Cursos
                </Link>
              </li>
              <li>
                <Link
                  to="/experts"
                  className="hover:text-primary-400 transition-colors"
                >
                  Expertos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white uppercase">
              Recursos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary-400 transition-colors"
                >
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-primary-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-primary-400 transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="hover:text-primary-400 transition-colors"
                >
                  Centro de Ayuda
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white uppercase">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <HiMail className="text-primary-400 mt-0.5 h-5 w-5 flex-shrink-0" />
                <a
                  href="mailto:info@ecobeauty.com"
                  className="hover:text-primary-400 transition-colors"
                >
                  info@ecobeauty.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <HiPhone className="text-primary-400 mt-0.5 h-5 w-5 flex-shrink-0" />
                <a
                  href="tel:+51999999999"
                  className="hover:text-primary-400 transition-colors"
                >
                  +51 999 999 999
                </a>
              </li>
              <li className="flex items-start gap-2">
                <HiLocationMarker className="text-primary-400 mt-0.5 h-5 w-5 flex-shrink-0" />
                <span>Lima, Perú</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="border-secondary-700 my-8 border-t"></div>

        {/* Línea inferior */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
          <p>© {currentYear} EcoBeauty. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Hecho con</span>
            <HiHeart className="text-danger-500 h-4 w-4" />
            <span>para la comunidad natural</span>
          </div>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="hover:text-primary-400 transition-colors"
            >
              Privacidad
            </Link>
            <Link
              to="/terms"
              className="hover:text-primary-400 transition-colors"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
