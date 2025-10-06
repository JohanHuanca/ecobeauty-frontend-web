import { Avatar } from "flowbite-react";
import { HiStar } from "react-icons/hi";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "María González",
      role: "Entusiasta de cosmética natural",
      avatar: "",
      text: "EcoBeauty me ayudó a comenzar mi propio emprendimiento de cosmética natural. Los tutoriales son claros y fáciles de seguir.",
      rating: 5,
    },
    {
      name: "Carlos Ramírez",
      role: "Estudiante de cosmetología",
      avatar: "",
      text: "Los cursos son muy completos y profesionales. He aprendido técnicas que no encontré en ningún otro lugar.",
      rating: 5,
    },
    {
      name: "Ana Martínez",
      role: "Experta certificada",
      avatar: "",
      text: "Como experta, la plataforma me permite compartir mi conocimiento y conectar con personas realmente interesadas en aprender.",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-gray-500">
            Miles de personas ya están transformando su cuidado personal
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <HiStar key={i} className="text-accent-400 h-5 w-5" />
                ))}
              </div>
              <p className="mb-6 text-gray-700">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <Avatar
                  img={testimonial.avatar || undefined}
                  rounded
                  size="md"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
