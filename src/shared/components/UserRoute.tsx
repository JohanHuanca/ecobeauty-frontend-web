import { Navigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { useSupabaseAuth } from "../../core/services/useSupabaseAuth";

interface UserRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rutas requiriendo autenticación y al menos un rol asignado.
 * Si el usuario no está autenticado, redirige a /login.
 * Si está autenticado pero no tiene roles, redirige a /onboarding.
 * Si tiene roles, muestra el contenido protegido.
 */
export function UserRoute({ children }: UserRouteProps) {
  const { session, profile, initializing } = useSupabaseAuth();

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  const hasRoles = profile?.roles && profile.roles.length > 0;

  if (!hasRoles) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}
