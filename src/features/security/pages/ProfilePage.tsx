import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Label,
  TextInput,
  Alert,
  Avatar,
  Badge,
  Spinner,
} from "flowbite-react";
import { HiUser, HiLogout, HiCamera, HiStar } from "react-icons/hi";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";
import { supabase } from "../../../core/services/supabase";
import { authService } from "../../security/services/authService";
import { checkIfHasProfile } from "../../experts/services/expertsService";

export function ProfilePage() {
  const navigate = useNavigate();
  const { profile, session, initializing, isExpert, isNovice } =
    useSupabaseAuth();
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasExpertProfile, setHasExpertProfile] = useState<boolean | null>(
    null,
  );
  const [showBecomeExpertModal, setShowBecomeExpertModal] = useState(false);
  const [becomingExpert, setBecomingExpert] = useState(false);

  // Verificar si el usuario ya tiene un perfil de experto
  useEffect(() => {
    const checkUserExpertProfile = async () => {
      if (!profile) return;
      try {
        const hasProfile = await checkIfHasProfile(profile.id);
        setHasExpertProfile(hasProfile);
      } catch (error) {
        console.error("Error al verificar perfil de experto:", error);
      }
    };

    if (profile) {
      checkUserExpertProfile();
    }
  }, [profile]);

  // Si está inicializando, mostrar spinner
  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Spinner size="xl" />
      </div>
    );
  }

  // Si no hay sesión, redirigir al login
  if (!session || !profile) {
    navigate("/login");
    return null;
  }

  const handleEditToggle = () => {
    if (!editMode) {
      setFullName(profile.full_name || "");
      setError(null);
      setSuccess(null);
    }
    setEditMode(!editMode);
  };

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      setError("El nombre no puede estar vacío");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() })
      .eq("id", profile.id);

    setLoading(false);

    if (error) {
      setError(error.message || "Error al actualizar el perfil");
    } else {
      setSuccess("Perfil actualizado correctamente");
      setEditMode(false);
      // Recargar la página para obtener los datos actualizados
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      setError("Por favor selecciona una imagen válida");
      return;
    }

    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("La imagen no debe superar los 2MB");
      return;
    }

    setUploadingAvatar(true);
    setError(null);
    setSuccess(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Subir imagen
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) {
        setError("Error al subir la imagen");
        setUploadingAvatar(false);
        return;
      }

      // Obtener URL pública
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Actualizar perfil
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("id", profile.id);

      if (updateError) {
        setError("Error al actualizar el avatar");
      } else {
        setSuccess("Avatar actualizado correctamente");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch {
      setError("Error inesperado al subir la imagen");
    }

    setUploadingAvatar(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await authService.signOut();
    navigate("/login");
  };

  const handleBecomeExpert = async () => {
    if (!profile) return;

    setBecomingExpert(true);
    setError(null);

    try {
      // Obtener el ID del rol 'expert'
      const { data: expertRole, error: roleError } = await supabase
        .from("roles")
        .select("id")
        .eq("name", "expert")
        .single();

      if (roleError) throw roleError;

      // Asignar el rol de experto al usuario
      const { error: assignError } = await supabase.from("user_roles").insert({
        profile_id: profile.id,
        role_id: expertRole.id,
      });

      if (assignError) {
        // Verificar si el error es porque ya tiene el rol
        if (assignError.code === "23505") {
          setError("Ya tienes el rol de experto");
        } else {
          throw assignError;
        }
      } else {
        setSuccess("¡Felicidades! Ahora eres un experto. Redirigiendo...");
        setTimeout(() => {
          // Recargar para actualizar roles y luego redirigir
          window.location.href = "/my-expert-profile";
        }, 2000);
      }
    } catch (err) {
      console.error("Error al convertirse en experto:", err);
      setError("Error al actualizar tu rol. Intenta nuevamente.");
    } finally {
      setBecomingExpert(false);
      setShowBecomeExpertModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Card>
          <div className="flex flex-col items-center gap-4">
            {/* Avatar con opción de cambio */}
            <div className="relative">
              <Avatar
                img={
                  profile.avatar_url ||
                  session?.user?.user_metadata?.avatar_url ||
                  undefined
                }
                size="xl"
                rounded
                className="cursor-pointer"
                onClick={handleAvatarClick}
              />
              {uploadingAvatar && (
                <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-full bg-black">
                  <Spinner size="md" color="white" />
                </div>
              )}
              <button
                onClick={handleAvatarClick}
                disabled={uploadingAvatar}
                className="bg-primary-600 hover:bg-primary-700 absolute right-0 bottom-0 rounded-full p-2 text-white shadow-lg disabled:opacity-50"
              >
                <HiCamera className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            {/* Información del usuario */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {profile.full_name}
              </h2>
              <p className="text-sm text-gray-600">{profile.email}</p>
            </div>

            {/* Badges de roles */}
            <div className="flex gap-2">
              {isExpert && (
                <Badge className="bg-primary-100 text-primary-800" size="sm">
                  Experto
                </Badge>
              )}
              {isNovice && (
                <Badge
                  className="bg-secondary-100 text-secondary-800"
                  size="sm"
                >
                  Principiante
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
            {error && (
              <Alert
                className="bg-danger-50 border-danger-200 mb-4"
                onDismiss={() => setError(null)}
              >
                <span className="text-danger-800 font-medium">Error:</span>{" "}
                <span className="text-danger-700">{error}</span>
              </Alert>
            )}

            {success && (
              <Alert
                className="bg-primary-50 border-primary-200 mb-4"
                onDismiss={() => setSuccess(null)}
              >
                <span className="text-primary-800 font-medium">¡Éxito!</span>{" "}
                <span className="text-primary-700">{success}</span>
              </Alert>
            )}

            {editMode ? (
              <div className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="fullName">Nombre completo</Label>
                  </div>
                  <TextInput
                    id="fullName"
                    name="fullName"
                    type="text"
                    icon={HiUser}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 flex-1 text-white"
                  >
                    {loading ? "Guardando..." : "Guardar"}
                  </Button>
                  <Button
                    onClick={handleEditToggle}
                    disabled={loading}
                    className="bg-secondary-600 hover:bg-secondary-700 flex-1 text-white"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    Información de perfil
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-gray-500">Nombre:</span>
                      <p className="text-sm font-medium text-gray-900">
                        {profile.full_name}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Email:</span>
                      <p className="text-sm font-medium text-gray-900">
                        {profile.email}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleEditToggle}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  Editar perfil
                </Button>
              </div>
            )}
          </div>

          {/* Sección para convertirse en experto */}
          {!isExpert && hasExpertProfile === false && (
            <div className="mt-6 border-t pt-6">
              <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 rounded-full p-3">
                    <HiStar className="text-primary-600 h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      ¿Quieres compartir tu conocimiento?
                    </h3>
                    <p className="mb-4 text-sm text-gray-700">
                      Conviértete en experto y empieza a ofrecer tus servicios,
                      crear cursos y tutoriales para la comunidad de EcoBeauty.
                    </p>
                    <ul className="mb-4 space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="text-primary-500">✓</span>
                        Crea y vende cursos de cosmética natural
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary-500">✓</span>
                        Publica tutoriales gratuitos
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary-500">✓</span>
                        Ofrece consultorías personalizadas
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary-500">✓</span>
                        Aparece en el directorio de expertos
                      </li>
                    </ul>
                    <Button
                      className="bg-secondary-600 hover:bg-secondary-700"
                      onClick={() => setShowBecomeExpertModal(true)}
                      disabled={becomingExpert}
                    >
                      <HiStar className="mr-2 h-5 w-5" />
                      Convertirme en experto
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botón para ir al perfil de experto si ya lo es */}
          {isExpert && (
            <div className="mt-6 border-t pt-6">
              <Button
                className="bg-secondary-600 hover:bg-secondary-700 w-full"
                onClick={() => navigate("/my-expert-profile")}
              >
                <HiStar className="mr-2 h-5 w-5" />
                {hasExpertProfile
                  ? "Ver mi perfil de experto"
                  : "Crear mi perfil de experto"}
              </Button>
            </div>
          )}

          <div className="mt-6 border-t pt-6">
            <Button
              onClick={handleLogout}
              disabled={loading}
              className="bg-danger-600 hover:bg-danger-700 disabled:bg-secondary-400 w-full text-white"
            >
              <HiLogout className="mr-2 h-5 w-5" />
              Cerrar sesión
            </Button>
          </div>
        </Card>

        {/* Modal de confirmación para convertirse en experto */}
        {showBecomeExpertModal && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
            <Card className="w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-900">
                Convertirse en Experto
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Al convertirte en experto, obtendrás acceso a funcionalidades
                  adicionales de la plataforma:
                </p>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  <li>Crear y gestionar cursos de pago</li>
                  <li>Publicar tutoriales gratuitos</li>
                  <li>Crear tu perfil profesional</li>
                  <li>Ofrecer consultorías y servicios</li>
                  <li>Aparecer en el directorio de expertos</li>
                </ul>
                <div className="bg-accent-50 rounded-lg p-4">
                  <p className="text-accent-800 text-sm">
                    <strong>Nota:</strong> Después de convertirte en experto,
                    deberás completar tu perfil profesional para aparecer en el
                    directorio.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleBecomeExpert}
                  disabled={becomingExpert}
                  className="bg-secondary-600 hover:bg-secondary-700 disabled:bg-secondary-400 flex-1 text-white"
                >
                  {becomingExpert ? "Procesando..." : "Confirmar"}
                </Button>
                <Button
                  onClick={() => setShowBecomeExpertModal(false)}
                  disabled={becomingExpert}
                  className="bg-secondary-600 hover:bg-secondary-700 flex-1 text-white"
                >
                  Cancelar
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
