import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button } from "flowbite-react";
import { useSupabaseAuth } from "../../core/services/useSupabaseAuth";
import { signOut } from "../../core/services/supabase";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, profile } = useSupabaseAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLoggingOut(false);
      setIsDropdownOpen(false);
    }
  };

  const isExpert = profile?.roles?.includes("expert");

  const NavLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        className={`block rounded px-3 py-2 md:p-0 ${
          active
            ? "text-blue-700 dark:text-blue-500"
            : "text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            🌿 EcoBeauty
          </span>
        </Link>

        {/* Botones de auth + toggle menu móvil */}
        <div className="flex items-center gap-2 md:order-2">
          {session ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex rounded-full text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Avatar
                  alt="Usuario"
                  img={profile?.avatar_url || undefined}
                  rounded
                />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700">
                  <div className="px-4 py-3">
                    <span className="block text-sm font-medium text-gray-900 dark:text-white">
                      {profile?.full_name || "Usuario"}
                    </span>
                    <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                      {isExpert ? "✨ Experto" : "🌱 Principiante"}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Mi perfil
                      </Link>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button color="gray" size="sm">
                  Iniciar sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Registrarse</Button>
              </Link>
            </>
          )}

          {/* Toggle menu móvil */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Links de navegación */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:order-1 md:block md:w-auto`}
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-800">
            <li>
              <NavLink to="/community">Comunidad</NavLink>
            </li>
            <li>
              <NavLink to="/tutorials">Tutoriales</NavLink>
            </li>
            {session && isExpert && (
              <li>
                <NavLink to="/tutorials/create">✨ Crear Tutorial</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
