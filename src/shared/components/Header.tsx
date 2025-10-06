import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button } from "flowbite-react";
import {
  HiSparkles,
  HiBookOpen,
  HiAcademicCap,
  HiUser,
  HiLogout,
} from "react-icons/hi";
import { GiFlowerPot } from "react-icons/gi";
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
          active ? "text-primary-700" : "hover:text-primary-700 text-gray-700"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="border-primary-200 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src="/ecobeauty.png"
            alt="EcoBeauty Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
            EcoBeauty
          </span>
        </Link>

        {/* Botones de auth + toggle menu móvil */}
        <div className="flex items-center gap-2 md:order-2">
          {session ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex rounded-full text-sm focus:ring-4 focus:ring-gray-300"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Avatar
                  alt="Usuario"
                  img={
                    profile?.avatar_url ||
                    session?.user?.user_metadata?.avatar_url ||
                    undefined
                  }
                  rounded
                />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 divide-y divide-gray-100 rounded-lg bg-white shadow">
                  <div className="px-4 py-3">
                    <span className="block text-sm font-medium text-gray-900">
                      {profile?.full_name || "Usuario"}
                    </span>
                    <span className="flex items-center gap-1 truncate text-sm text-gray-500">
                      {isExpert ? (
                        <>
                          <HiSparkles className="h-4 w-4" />
                          <span>Experto</span>
                        </>
                      ) : (
                        <>
                          <GiFlowerPot className="h-4 w-4" />
                          <span>Principiante</span>
                        </>
                      )}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <HiUser className="h-4 w-4" />
                        <span>Mi perfil</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/my-courses"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <HiBookOpen className="h-4 w-4" />
                        <span>Mis cursos</span>
                      </Link>
                    </li>
                    {isExpert && (
                      <>
                        <li>
                          <Link
                            to="/my-created-courses"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <HiAcademicCap className="h-4 w-4" />
                            <span>Mis cursos creados</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/my-created-tutorials"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <HiBookOpen className="h-4 w-4" />
                            <span>Mis tutoriales creados</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/my-expert-profile"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <HiSparkles className="h-4 w-4" />
                            <span>Mi perfil de experto</span>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <HiLogout className="h-4 w-4" />
                      <span>
                        {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button
                  size="sm"
                  className="bg-secondary-600 hover:bg-secondary-700 text-white"
                >
                  Iniciar sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="sm"
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  Registrarse
                </Button>
              </Link>
            </>
          )}

          {/* Toggle menu móvil */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden"
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
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0">
            <li>
              <NavLink to="/community">Comunidad</NavLink>
            </li>
            <li>
              <NavLink to="/tutorials">Tutoriales</NavLink>
            </li>
            <li>
              <NavLink to="/courses">Cursos</NavLink>
            </li>
            <li>
              <NavLink to="/experts">Expertos</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
