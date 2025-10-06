import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { HiArrowRight } from "react-icons/hi";

export function CTASection() {
  return (
    <section className="from-primary-600 to-primary-700 bg-gradient-to-r">
      <div className="mx-auto max-w-screen-xl px-4 py-16 text-center lg:py-24">
        <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-white md:text-4xl">
          ¿Listo para comenzar tu viaje natural?
        </h2>
        <p className="text-primary-100 mb-8 text-lg font-light">
          Únete a miles de personas que ya están creando sus propios productos
          de belleza ecológicos
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/register">
            <Button
              size="lg"
              className="text-primary-600 bg-white hover:bg-gray-100"
            >
              Crear cuenta gratis
              <HiArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/experts">
            <Button
              size="lg"
              className="border-2 border-white bg-transparent text-white hover:bg-white/10"
            >
              Conocer expertos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
