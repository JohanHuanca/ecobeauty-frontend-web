import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, Button, Spinner } from "flowbite-react";
import { HiHeart, HiOutlineHeart, HiChatAlt } from "react-icons/hi";
import { YouTubeEmbed } from "../../../shared/components/YouTubeEmbed";
import {
  getTutorialById,
  likeTutorial,
  unlikeTutorial,
  type Tutorial,
} from "../services/tutorialsService";
import { TutorialComments } from "../components/TutorialComments";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export function TutorialDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { session } = useSupabaseAuth();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiking, setIsLiking] = useState(false);

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

  const handleLikeToggle = async () => {
    if (!tutorial || !session) return;

    try {
      setIsLiking(true);

      if (tutorial.user_has_liked) {
        await unlikeTutorial(tutorial.id);
        setTutorial({
          ...tutorial,
          user_has_liked: false,
          likes_count: (tutorial.likes_count || 1) - 1,
        });
      } else {
        await likeTutorial(tutorial.id);
        setTutorial({
          ...tutorial,
          user_has_liked: true,
          likes_count: (tutorial.likes_count || 0) + 1,
        });
      }
    } catch (err) {
      console.error("Error al dar/quitar like:", err);
    } finally {
      setIsLiking(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
            <YouTubeEmbed url={tutorial.video_url} title={tutorial.title} />
          )}

          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {tutorial.description}
            </p>
          </div>

          {/* Botones de interacción */}
          <div className="mt-6 flex items-center gap-4 border-t pt-6 dark:border-gray-600">
            <Button
              color={tutorial.user_has_liked ? "failure" : "gray"}
              onClick={handleLikeToggle}
              disabled={!session || isLiking}
            >
              {tutorial.user_has_liked ? (
                <HiHeart className="mr-2 h-5 w-5" />
              ) : (
                <HiOutlineHeart className="mr-2 h-5 w-5" />
              )}
              {tutorial.likes_count || 0} Me gusta
            </Button>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <HiChatAlt className="h-5 w-5" />
              <span>{tutorial.comments_count || 0} comentarios</span>
            </div>
          </div>
        </div>

        {/* Sección de comentarios */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <TutorialComments tutorialId={tutorial.id} />
        </div>
      </div>
    </div>
  );
}
