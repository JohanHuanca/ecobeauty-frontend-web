import {
  HiUserGroup,
  HiBookOpen,
  HiAcademicCap,
  HiSparkles,
} from "react-icons/hi";

export function FeaturesSection() {
  const features = [
    {
      icon: HiUserGroup,
      title: "Comunidad Activa",
      description:
        "Conecta con personas apasionadas por la cosmética natural. Comparte tus experiencias, recetas y descubrimientos.",
      color: "primary",
    },
    {
      icon: HiBookOpen,
      title: "Tutoriales Gratuitos",
      description:
        "Accede a cientos de tutoriales en video sobre cómo crear tus propios productos de belleza ecológicos paso a paso.",
      color: "accent",
    },
    {
      icon: HiAcademicCap,
      title: "Cursos Especializados",
      description:
        "Aprende de expertos certificados con cursos estructurados sobre cosmética natural, formulación y más.",
      color: "secondary",
    },
    {
      icon: HiSparkles,
      title: "Expertos Certificados",
      description:
        "Consulta con profesionales especializados en cosmética natural para resolver tus dudas y recibir asesoría personalizada.",
      color: "primary",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary-100 text-primary-600";
      case "accent":
        return "bg-accent-100 text-accent-600";
      case "secondary":
        return "bg-secondary-100 text-secondary-600";
      default:
        return "bg-primary-100 text-primary-600";
    }
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Todo lo que necesitas para empezar
          </h2>
          <p className="text-lg text-gray-500">
            Una plataforma completa para aprender y compartir sobre cosmética
            natural
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${getColorClasses(feature.color)}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
