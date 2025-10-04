import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/login");
  };

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <Card>
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Únete a EcoBeauty
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Crea tu cuenta y comienza a aprender
            </p>
          </div>

          <RegisterForm
            onSuccess={handleSuccess}
            onSwitchToLogin={handleSwitchToLogin}
          />
        </Card>
      </div>
    </div>
  );
}
