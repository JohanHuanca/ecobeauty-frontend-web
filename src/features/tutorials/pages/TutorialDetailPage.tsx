import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, Button, Spinner } from "flowbite-react";
import { getTutorialById, type Tutorial } from "../services/tutorialsService";

export function TutorialDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadTutorial(parseInt(id, 10));
    }
  }, [id]);

  async function loadTutorial(tutorialId: number) {
    try {
      setIsLoading(true);
      const data = await getTutorialById(tutorialId);
      setTutorial(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar el tutorial",
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

  if (error || !tutorial) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-red-800 dark:text-red-200">
            {error || "Tutorial no encontrado"}
          </p>
        </div>
        <Link to="/tutorials">
          <Button color="gray">Volver a tutoriales</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link
        to="/tutorials"
        className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-500"
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

      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="mb-6 flex items-center gap-3">
          <Avatar
            img={tutorial.profiles?.avatar_url || undefined}
            rounded
            size="md"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {tutorial.profiles?.full_name || "Usuario"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(tutorial.created_at).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          {tutorial.title}
        </h1>

        {tutorial.video_url && (
          <div className="relative mb-6 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
            <iframe
              src={tutorial.video_url}
              title={tutorial.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
            {tutorial.description}
          </p>
        </div>
      </div>
    </div>
  );
}
