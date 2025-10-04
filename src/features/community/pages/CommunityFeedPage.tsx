import { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi";
import { PostCard } from "../components/PostCard";
import { getAllPosts, type Post } from "../services/communityService";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export function CommunityFeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSupabaseAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      setIsLoading(true);
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar publicaciones",
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

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
              <HiUserGroup className="h-10 w-10 text-purple-600" />
              <span>Comunidad</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comparte experiencias y conecta con otros amantes de la cosmética
              natural
            </p>
          </div>
          {session && (
            <Link to="/community/create">
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
                Publicar
              </Button>
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
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
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              No hay publicaciones aún
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {session
                ? "¡Sé el primero en compartir algo con la comunidad!"
                : "Inicia sesión para ser el primero en publicar"}
            </p>
            {session && (
              <Link to="/community/create">
                <Button>Crear primera publicación</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
