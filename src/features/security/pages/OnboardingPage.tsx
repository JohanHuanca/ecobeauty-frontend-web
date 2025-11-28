import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export function OnboardingPage() {
  const navigate = useNavigate();

  const handleOpenForm = () => {
    // Placeholder: Open N8N form in new tab or modal
    // Replace with actual N8N form URL
    window.open("https://accesogpt.app.n8n.cloud/form/5a8aa26b-9f40-4815-b576-d6c15f5de9b3", "_blank");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Bienvenido a EcoBeauty
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Para personalizar tu experiencia, por favor completa nuestro
          formulario de métricas y selecciona tu rol.
        </p>
        <div className="space-y-4">
          <Button onClick={handleOpenForm} className="w-full">
            Completar Formulario
          </Button>
          <Button onClick={handleGoHome} color="light" className="w-full">
            Ir al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
