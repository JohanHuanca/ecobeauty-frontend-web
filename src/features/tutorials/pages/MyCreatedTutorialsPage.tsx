import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";
import { HiBookOpen, HiPlus, HiLightBulb } from "react-icons/hi";
import { TutorialCard } from "../components/TutorialCard";
import {
  getMyCreatedTutorials,
  type Tutorial,
} from "../services/tutorialsService";

export function MyCreatedTutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadMyTutorials();
  }, []);

  async function loadMyTutorials() {
    try {
      setIsLoading(true);
      const data = await getMyCreatedTutorials();
      setTutorials(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar tus tutoriales",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
              <HiBookOpen className="text-primary-600 h-10 w-10" />
              <span>Mis Tutoriales Creados</span>
            </h1>
            <p className="mt-2 text-gray-600">
              Gestiona y visualiza los tutoriales que has compartido con la
              comunidad
            </p>
          </div>
          <Button
            onClick={() => navigate("/tutorials/create")}
            className="bg-primary-600 hover:bg-primary-700 text-white"
          >
            <div className="flex items-center gap-2">
              <HiPlus className="h-5 w-5" />
              <span>Crear nuevo tutorial</span>
            </div>
          </Button>
        </div>

        {/* Error */}
        {error && (
          <div className="border-danger-200 bg-danger-50 mb-6 rounded-lg border p-4">
            <p className="text-danger-800">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {tutorials.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center shadow-md">
            <div className="mb-4 text-6xl">📚</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Aún no has creado tutoriales
            </h3>
            <p className="mb-6 text-gray-600">
              ¡Comienza a compartir tu conocimiento creando tu primer tutorial!
            </p>
            <Button
              className="bg-primary-600 hover:bg-primary-700 mt-6 text-white"
              onClick={() => navigate("/tutorials/create")}
            >
              <div className="flex items-center gap-2">
                <HiPlus className="h-4 w-4" />
                <span>Crear mi primer tutorial</span>
              </div>
            </Button>
          </div>
        ) : (
          <>
            {/* Estadísticas rápidas */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white p-4 shadow-md">
                <p className="text-sm text-gray-500">Total de tutoriales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tutorials.length}
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-md">
                <p className="text-sm text-gray-500">Total de likes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tutorials.reduce((sum, t) => sum + (t.likes_count || 0), 0)}
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-md">
                <p className="text-sm text-gray-500">Total de comentarios</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tutorials.reduce(
                    (sum, t) => sum + (t.comments_count || 0),
                    0,
                  )}
                </p>
              </div>
            </div>

            {/* Lista de tutoriales */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tutorials.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </>
        )}

        {/* Información adicional */}
        <div className="border-primary-200 bg-primary-50 mt-12 rounded-lg border p-6">
          <h3 className="text-primary-900 flex items-center gap-2 text-lg font-semibold">
            <HiLightBulb className="h-5 w-5" />
            <span>Consejos para tus tutoriales</span>
          </h3>
          <ul className="text-primary-800 mt-2 list-inside list-disc space-y-1">
            <li>
              Utiliza títulos claros y descriptivos que expliquen el contenido
            </li>
            <li>
              Agrega videos de YouTube para hacer tus tutoriales más visuales
            </li>
            <li>Responde a los comentarios para crear comunidad</li>
            <li>Comparte contenido de calidad que realmente ayude a otros</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
