import { Navigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { useSupabaseAuth } from "../../core/services/useSupabaseAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rutas requiriendo autenticación
 * Si el usuario no está autenticado, redirige al login
 * Si está inicializando, muestra un spinner de carga
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, initializing } = useSupabaseAuth();

  // Mostrar spinner mientras se verifica la sesión
  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Spinner size="xl" />
      </div>
    );
  }

  // Si no hay sesión, redirigir al login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Si hay sesión, mostrar el contenido protegido
  return <>{children}</>;
}
