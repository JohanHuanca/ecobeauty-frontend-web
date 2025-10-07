import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import { HiSparkles, HiUserGroup } from "react-icons/hi";
import { GiFlowerPot } from "react-icons/gi";
import { supabase } from "../../../core/services/supabase";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export function RoleSelectionPage() {
  const navigate = useNavigate();
  const { profile } = useSupabaseAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelection = async (roleType: "novice" | "expert") => {
    if (!profile) {
      setError("No se pudo obtener tu perfil. Intenta nuevamente.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Marcar que el usuario ya completó la selección de roles
      await supabase
        .from("profiles")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", profile.id);

      // Si elige principiante, solo redirigir (ya tiene ese rol)
      if (roleType === "novice") {
        navigate("/");
        return;
      }

      // Si elige experto, agregar el rol de experto
      if (roleType === "expert") {
        // Obtener el ID del rol 'expert'
        const { data: expertRole, error: roleError } = await supabase
          .from("roles")
          .select("id")
          .eq("name", "expert")
          .single();

        if (roleError) throw roleError;

        // Asignar el rol de experto al usuario
        const { error: assignError } = await supabase
          .from("user_roles")
          .insert({
            profile_id: profile.id,
            role_id: expertRole.id,
          });

        if (assignError) {
          // Si ya tiene el rol, ignorar el error
          if (assignError.code !== "23505") {
            throw assignError;
          }
        }

        // Redirigir a la página principal
        navigate("/");
      }
    } catch (err) {
      console.error("Error al seleccionar rol:", err);
      setError("Hubo un error al configurar tu cuenta. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="from-primary-50 flex min-h-screen items-center justify-center bg-gradient-to-b to-white px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <img
              src="/ecobeauty.png"
              alt="EcoBeauty"
              className="h-16 w-16 object-contain"
            />
          </div>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            ¡Bienvenido a EcoBeauty! 🌿
          </h1>
          <p className="text-lg text-gray-600">
            ¿Cómo te gustaría participar en nuestra comunidad?
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="border-danger-200 bg-danger-50 mb-6 rounded-lg border p-4 text-center">
            <p className="text-danger-800">{error}</p>
          </div>
        )}

        {/* Opciones de roles */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Opción: Principiante */}
          <div className="group hover:border-primary-500 relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-xl">
            <div className="bg-primary-100 absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 transform rounded-full opacity-50"></div>

            <div className="relative">
              <div className="mb-6 flex justify-center">
                <div className="bg-primary-100 flex h-20 w-20 items-center justify-center rounded-full">
                  <GiFlowerPot className="text-primary-600 h-10 w-10" />
                </div>
              </div>

              <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
                Principiante
              </h2>

              <p className="mb-6 text-center text-gray-600">
                Personas interesadas en la sostenibilidad y el bienestar natural
                que quieran hacer sus cosméticos
              </p>

              <ul className="mb-6 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">✓</span>
                  <span>Acceso a tutoriales gratuitos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">✓</span>
                  <span>Compra de cursos especializados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">✓</span>
                  <span>Participación en la comunidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">✓</span>
                  <span>Consulta con expertos</span>
                </li>
              </ul>

              <Button
                onClick={() => handleRoleSelection("novice")}
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 w-full text-white"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <HiUserGroup className="mr-2 h-5 w-5" />
                    Comenzar como Principiante
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Opción: Experto */}
          <div className="group hover:border-accent-500 relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-xl">
            <div className="bg-accent-100 absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 transform rounded-full opacity-50"></div>

            <div className="relative">
              <div className="mb-6 flex justify-center">
                <div className="bg-accent-100 flex h-20 w-20 items-center justify-center rounded-full">
                  <HiSparkles className="text-accent-600 h-10 w-10" />
                </div>
              </div>

              <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
                Experto
              </h2>

              <p className="mb-6 text-center text-gray-600">
                Amantes del bricolaje y la cosmética artesanal que quieran
                compartir sus conocimientos
              </p>

              <ul className="mb-6 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">✓</span>
                  <span>Todo lo de Principiante</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">✓</span>
                  <span>Crear y vender cursos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">✓</span>
                  <span>Publicar tutoriales gratuitos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">✓</span>
                  <span>Ofrecer servicios de consultoría</span>
                </li>
              </ul>

              <Button
                onClick={() => handleRoleSelection("expert")}
                disabled={loading}
                className="bg-accent-600 hover:bg-accent-700 disabled:bg-secondary-400 w-full text-white"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <HiSparkles className="mr-2 h-5 w-5" />
                    Comenzar como Experto
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer message */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Podrás cambiar tu rol más adelante desde tu perfil
        </p>
      </div>
    </div>
  );
}
