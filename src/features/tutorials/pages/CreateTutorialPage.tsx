import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TutorialForm } from "../components/TutorialForm";
import {
  createTutorial,
  type CreateTutorialData,
} from "../services/tutorialsService";

export function CreateTutorialPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: CreateTutorialData) {
    try {
      setIsLoading(true);
      setError(null);
      const newTutorial = await createTutorial(data);
      navigate(`/tutorials/${newTutorial.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear el tutorial",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link
          to="/tutorials"
          className="text-primary-600 hover:text-primary-700 mb-6 inline-flex items-center"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a tutoriales
        </Link>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Crear nuevo tutorial
          </h1>
          <p className="mb-6 text-gray-600">
            Comparte tu conocimiento con la comunidad
          </p>

          {error && (
            <div className="border-danger-200 bg-danger-50 mb-6 rounded-lg border p-4">
              <p className="text-danger-800">{error}</p>
            </div>
          )}

          <TutorialForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
