import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Spinner } from "flowbite-react";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { session, initializing } = useSupabaseAuth();

  useEffect(() => {
    if (initializing) return;
    if (session) {
      navigate("/home", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [session, initializing, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center gap-4 py-8">
          <Spinner size="xl" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Completando autenticación...
          </h2>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Por favor espera mientras procesamos tu inicio de sesión
          </p>
        </div>
      </Card>
    </div>
  );
}
