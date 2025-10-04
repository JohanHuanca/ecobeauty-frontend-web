import { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { TutorialCard } from "../components/TutorialCard";
import { getAllTutorials, type Tutorial } from "../services/tutorialsService";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export function TutorialsListPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useSupabaseAuth();

  useEffect(() => {
    loadTutorials();
  }, []);

  async function loadTutorials() {
    try {
      setIsLoading(true);
      const data = await getAllTutorials();
      setTutorials(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar tutoriales",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const isExpert = profile?.roles?.includes("expert");

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Tutoriales
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Aprende a crear tus propios productos ecológicos
          </p>
        </div>
        {isExpert && (
          <Link to="/tutorials/create">
            <Button>
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Crear tutorial
            </Button>
          </Link>
        )}
      </div>

      {tutorials.length === 0 ? (
        <div className="py-12 text-center">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            No hay tutoriales aún
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {isExpert
              ? "¡Sé el primero en compartir tu conocimiento!"
              : "Pronto habrá contenido disponible"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      )}
    </div>
  );
}
