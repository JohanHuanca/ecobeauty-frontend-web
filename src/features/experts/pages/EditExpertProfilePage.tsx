import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { HiLightBulb } from "react-icons/hi";
import {
  ExpertProfileForm,
  ExpertProfileFormData,
} from "../components/ExpertProfileForm";
import {
  checkIfHasProfile,
  getExpertById,
  createExpertProfile,
  updateExpertProfile,
} from "../services/expertsService";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export function EditExpertProfilePage() {
  const { session } = useSupabaseAuth();
  const user = session?.user;
  const navigate = useNavigate();

  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [initialData, setInitialData] = useState<
    Partial<ExpertProfileFormData>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      checkAndLoadProfile(user.id);
    }
  }, [user]);

  const checkAndLoadProfile = async (profileId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const exists = await checkIfHasProfile(profileId);
      setHasProfile(exists);

      if (exists) {
        // Cargar datos existentes
        const expertProfile = await getExpertById(profileId);
        if (expertProfile) {
          setInitialData({
            bio: expertProfile.bio || "",
            specialties: expertProfile.specialties || [],
            phone_number: expertProfile.phone_number || "",
            hourly_rate: expertProfile.hourly_rate || 0,
          });
        }
      }
    } catch (err) {
      console.error("Error al verificar perfil:", err);
      setError("Error al cargar el perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: ExpertProfileFormData) => {
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    try {
      if (hasProfile) {
        // Actualizar perfil existente
        await updateExpertProfile(user.id, data);
      } else {
        // Crear nuevo perfil
        await createExpertProfile({
          profile_id: user.id,
          ...data,
        });
      }

      // Redirigir al perfil público
      navigate(`/experts/${user.id}`);
    } catch (err) {
      console.error("Error al guardar perfil:", err);
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="py-12 text-center">
          <div className="border-primary-500 mx-auto h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
          <p className="mt-4 text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-danger-50 rounded-lg p-8 text-center">
          <p className="text-danger-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {hasProfile
              ? "Editar mi perfil de experto"
              : "Crear perfil de experto"}
          </h1>
          <p className="text-lg text-gray-600">
            {hasProfile
              ? "Actualiza tu información profesional para atraer más clientes"
              : "Completa tu perfil para aparecer en el directorio de expertos"}
          </p>
        </div>

        {/* Formulario */}
        <Card>
          <ExpertProfileForm
            initialData={initialData}
            onSubmit={handleSubmit}
            submitLabel={hasProfile ? "Actualizar perfil" : "Crear perfil"}
          />
        </Card>

        {/* Nota informativa */}
        <div className="bg-primary-50 mt-6 rounded-lg p-4">
          <h3 className="text-primary-900 mb-2 flex items-center gap-2 font-semibold">
            <HiLightBulb className="h-5 w-5" />
            <span>Consejos para un buen perfil</span>
          </h3>
          <ul className="text-primary-800 list-inside list-disc space-y-1 text-sm">
            <li>Escribe una biografía detallada que destaque tu experiencia</li>
            <li>
              Agrega al menos 3 especialidades para mejorar tu visibilidad
            </li>
            <li>
              Verifica que tu número de WhatsApp incluya el código de país
            </li>
            <li>Define una tarifa competitiva basada en tu experiencia</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
