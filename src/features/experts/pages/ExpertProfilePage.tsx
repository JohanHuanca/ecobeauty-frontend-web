import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Avatar, Badge, Button } from "flowbite-react";
import { HiSparkles } from "react-icons/hi";
import { getExpertById, ExpertProfile } from "../services/expertsService";

export function ExpertProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [expert, setExpert] = useState<ExpertProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadExpert(id);
    }
  }, [id]);

  const loadExpert = async (profileId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getExpertById(profileId);
      setExpert(data);
    } catch (err) {
      console.error("Error al cargar perfil de experto:", err);
      setError("Error al cargar el perfil del experto");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactWhatsApp = () => {
    if (expert?.phone_number) {
      // Limpiar número de WhatsApp (remover espacios y caracteres especiales)
      const cleanPhone = expert.phone_number.replace(/[^\d+]/g, "");
      const message = encodeURIComponent(
        `Hola ${expert.profile?.full_name || ""}, vi tu perfil en EcoBeauty y me gustaría contactarte para una consultoría.`,
      );
      window.open(
        `https://wa.me/${cleanPhone}?text=${message}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="py-12 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-green-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Cargando perfil...
          </p>
        </div>
      </div>
    );
  }

  if (error || !expert) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="rounded-lg bg-red-50 p-8 text-center dark:bg-gray-800">
          <p className="text-red-800 dark:text-red-400">
            {error || "No se encontró el perfil del experto"}
          </p>
          <Link
            to="/experts"
            className="mt-4 inline-block text-green-600 hover:underline dark:text-green-400"
          >
            ← Volver al directorio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/experts"
            className="text-green-600 hover:underline dark:text-green-400"
          >
            ← Volver al directorio
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar - Información de contacto */}
          <div className="lg:col-span-1">
            <Card>
              <div className="flex flex-col items-center pb-4">
                <Avatar
                  img={expert.profile?.avatar_url || undefined}
                  alt={expert.profile?.full_name || "Expert"}
                  size="xl"
                  rounded
                  className="mb-4"
                />
                <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {expert.profile?.full_name}
                </h2>
                <Badge color="purple" className="mb-4">
                  <div className="flex items-center gap-1">
                    <HiSparkles className="h-3 w-3" />
                    <span>Experto Certificado</span>
                  </div>
                </Badge>

                {/* Tarifa */}
                <div className="mb-6 w-full rounded-lg bg-blue-50 p-4 text-center dark:bg-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tarifa por hora
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${expert.hourly_rate}/hr
                  </p>
                </div>

                {/* Botón de WhatsApp */}
                <Button
                  color="success"
                  size="lg"
                  className="w-full"
                  onClick={handleContactWhatsApp}
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Contactar por WhatsApp
                </Button>

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {expert.phone_number}
                </p>
              </div>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2">
            <Card>
              {/* Especialidades */}
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Especialidades
                </h3>
                <div className="flex flex-wrap gap-2">
                  {expert.specialties?.map((specialty, index) => (
                    <Badge key={index} color="success" size="lg">
                      {specialty}
                    </Badge>
                  )) || (
                    <p className="text-gray-500">
                      No se especificaron especialidades
                    </p>
                  )}
                </div>
              </div>

              {/* Biografía */}
              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Sobre mí
                </h3>
                <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                  {expert.bio}
                </div>
              </div>

              {/* Fecha de registro */}
              <div className="mt-6 border-t pt-4 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Miembro desde{" "}
                  {new Date(expert.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
