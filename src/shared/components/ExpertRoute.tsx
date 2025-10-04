import { Navigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { useSupabaseAuth } from "../../core/services/useSupabaseAuth";

interface ExpertRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rutas que solo pueden ser accedidas por usuarios con rol "expert".
 * Si el usuario no está autenticado, redirige a /login.
 * Si el usuario está autenticado pero no es experto, redirige a /tutorials.
 */
export function ExpertRoute({ children }: ExpertRouteProps) {
  const { session, profile, initializing } = useSupabaseAuth();

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  const isExpert = profile?.roles?.includes("expert");

  if (!isExpert) {
    return <Navigate to="/tutorials" replace />;
  }

  return <>{children}</>;
}
