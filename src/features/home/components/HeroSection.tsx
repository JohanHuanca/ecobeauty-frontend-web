import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { HiArrowRight, HiSparkles } from "react-icons/hi";

export function HeroSection() {
  return (
    <section className="from-primary-50 bg-gradient-to-b to-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 text-center lg:py-24">
        <div className="mb-8 flex justify-center">
          <span className="bg-primary-100 text-primary-800 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <HiSparkles className="h-4 w-4" />
            Bienvenido a la comunidad de cosmética natural
          </span>
        </div>

        <h1 className="mb-6 text-4xl leading-none font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Descubre el poder de la{" "}
          <span className="text-primary-600">cosmética natural</span>
        </h1>

        <p className="mb-8 text-lg font-normal text-gray-500 sm:px-16 lg:text-xl xl:px-48">
          Aprende a crear tus propios productos de belleza ecológicos, conecta
          con expertos y únete a una comunidad apasionada por el cuidado natural
          de la piel.
        </p>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:mb-16">
          <Link to="/register">
            <Button
              size="lg"
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              Comienza gratis
              <HiArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/tutorials">
            <Button
              size="lg"
              className="bg-secondary-100 hover:bg-secondary-200 text-secondary-900"
            >
              Explorar tutoriales
            </Button>
          </Link>
        </div>

        {/* Estadísticas */}
        <div className="mx-auto grid max-w-screen-md grid-cols-2 gap-8 text-gray-500 sm:grid-cols-4">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-2 text-3xl font-extrabold text-gray-900">
              1K+
            </div>
            <div className="text-sm">Usuarios activos</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-2 text-3xl font-extrabold text-gray-900">
              500+
            </div>
            <div className="text-sm">Tutoriales</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-2 text-3xl font-extrabold text-gray-900">
              200+
            </div>
            <div className="text-sm">Cursos</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-2 text-3xl font-extrabold text-gray-900">
              100+
            </div>
            <div className="text-sm">Expertos</div>
          </div>
        </div>
      </div>
    </section>
  );
}
