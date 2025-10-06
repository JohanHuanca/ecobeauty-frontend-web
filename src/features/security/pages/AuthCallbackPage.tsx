import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Esperar un momento para que Supabase procese el callback
    const timer = setTimeout(() => {
      navigate("/profile");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-4 text-gray-600">Completando inicio de sesión...</p>
      </div>
    </div>
  );
}
