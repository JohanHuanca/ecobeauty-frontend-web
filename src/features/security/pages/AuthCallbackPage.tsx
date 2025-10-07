import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { supabase } from "../../../core/services/supabase";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUserRoles = async () => {
      try {
        // Obtener el usuario actual
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          // Si no hay usuario, redirigir al login
          navigate("/login");
          return;
        }

        // Obtener el perfil del usuario
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .single();

        if (!profile) {
          // Si no hay perfil aún, esperar un poco más y reintentar
          setTimeout(() => {
            checkUserRoles();
          }, 500);
          return;
        }

        // Verificar cuántos roles tiene el usuario
        const { data: userRoles } = await supabase
          .from("user_roles")
          .select("role_id")
          .eq("profile_id", profile.id);

        // Si tiene 1 rol o menos (primer login), redirigir a selección de roles
        // Si tiene 2 roles (ya pasó por selección), redirigir al home
        if (!userRoles || userRoles.length <= 1) {
          navigate("/role-selection");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error al verificar roles:", error);
        // En caso de error, redirigir a home por seguridad
        navigate("/");
      } finally {
        setChecking(false);
      }
    };

    // Esperar un momento para que Supabase procese el callback completamente
    const timer = setTimeout(() => {
      checkUserRoles();
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-4 text-gray-600">
          {checking ? "Completando inicio de sesión..." : "Redirigiendo..."}
        </p>
      </div>
    </div>
  );
}
