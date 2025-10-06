import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/profile");
  };

  const handleSwitchToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Bienvenido a EcoBeauty
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Inicia sesión para continuar
            </p>
          </div>

          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToRegister={handleSwitchToRegister}
          />
        </Card>
      </div>
    </div>
  );
}
